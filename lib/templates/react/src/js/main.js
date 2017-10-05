import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      ()=> this.tick(),
      1000
    );
  }
  
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  
  tick(){
    this.setState({
      date: new Date()
    });
  }
  
  render(){
    return (
      <div className="content">
        <img src="../image/sssg.png" />
        <div>
          {this.state.date.toLocaleDateString()}
          &nbsp;
          {this.state.date.toLocaleTimeString()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock/>, document.getElementById('root')
);

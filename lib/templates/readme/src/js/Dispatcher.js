/**
 * Page script dispatcher.
 *
 * In case you created new page script, add each of the following lines
 * to this file.
 *
 * + import <name> from "./pages/XXXX.part";
 *   ...
 *   const klass_list = [
 *     ...
 * +   <name>,
 *   ];
 */

"use strict";

import index from "./pages/index.part";
import dev from "./pages/dev.part";

class Dispatcher {
  constructor(){
    const main_content = document.getElementById("main");
    this.current_page = main_content.dataset.page;
  
    const klass_list = [
      index,
      dev,
    ];
    
    this.dispatchAll(klass_list);
  }
  
  dispatchAll(klass_list){
    klass_list.map((klass) => this.dispatch(klass));
  }
  
  dispatch(klass){
    if(this.current_page === klass.page) new klass();
  }
}

export default Dispatcher;

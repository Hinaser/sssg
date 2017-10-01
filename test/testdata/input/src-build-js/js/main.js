import {demo_func1, Demo_class1} from './sub1.part';

demo_func1("Hello").then(function(msg){
  console.log(msg);
});
console.log(new Demo_class1().getVal());
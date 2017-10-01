export function demo_func1(msg: string) :Promise {
  return new Promise(function(resolve, reject){
    resolve(msg);
  });
}

export class Demo_class1{
  constructor(){
    this.testVal1 = 1;
  }
  
  getVal(): number{
    return this.testVal1;
  }
}
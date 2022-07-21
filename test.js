class Person {
    constructor(name, age) {
      console.log(3);
      this.name = name;
      this.age = age;
    }
    say() {
      console.log("这是 Person中的 say 方法");
    }
    static info = 123;
  }
  class Chinese extends Person {
   
  }
  var c1 = new Chinese("张三", 22);
  console.log(c1);
  c1.say();
  console.log(c1.info);
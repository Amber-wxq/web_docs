let mySymbol = Symbol();

let obj = {
    name: 'smyhvae',
    age: 26
};

obj[mySymbol] = 'hello';

console.log(obj);

//遍历obj
for (let i in obj) {
    console.log(i);
}
for (let i = 0; i < 10; i++) {
    console.log('循环体中:' + i);
}

console.log('循环体外:' + i);
var name = '许嵩';
let obj1 = {
    name: '千古壹号',
    sayHello: () => {
        console.log(this.name);
    },
};

obj1.sayHello();
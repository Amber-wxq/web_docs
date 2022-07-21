# 解构
##    解构数组
    input=[1,2];
    [first,second]=input;
###    已声明变量
    [first,second]=[second,first];
    交换
###    函数参数
    function f([first,second]:[number,number]){
        log(first,second);
    }
    f(input)
###    ... 剩余变量
    [first,...rest]=[1,2,3,4]
    first //1
    rest //[2,3,4]
####    忽略尾随变量，数组中只取某一位置变量
    [first]=[1,2,3,4];
    first //1
    [,second,fourth]=[1,2,3,4];
    second //2
    fourth //4
## 对象解构
    let o = {
    a: "foo",
    b: 12,
    c: "bar"
        };
    let { a, b } = o;
### 用没用声明的赋值
    （{a,b}={a:"baz",b:100}）;
        我们需要用括号将它括起来，因为Javascript通常会将以 { 起始的语句解析为一个块。
### ...剩余变量
    let { a, ...passthrough } = o;
    let total = passthrough.b + passthrough.c.length;
# 类型
    接口 interface 定义函数传入参数类型  
    
    类型别名 type  给一个类型起一个新名字，可以作用于原始值，联合类型，元组以及其他任何需要手写的类型  
    
    用起来都行，都可以当做函数的形参类型定义 
    具体区别还要清楚，重点八股
## 函数类型字面量
定义函数类型的方法之一，可以指定函数的参数类型、返回值类型、以及泛型类型参数
函数类型字面量的语法和箭头函数语法相似
    （ParameterList）=> Type
-    ParameterList表示可选的函数形式参数列表；
-    Type表示函数返回值类型；
例：
    let f:()=>void
    f=function(){}
f的类型为函数类型，即变量f的值是一个函数，函数的类型是通过函数类型字面量进行定义

定义函数参数类型时，必须包括形式参数名，不能只声明参数的类型
    （x:number）=> number; 正确
    (number)=>number; 错误
形参名可以和实际函数的形参名不相同
    let f:(x:number)=>number;
    f=function(y:number):number{
        return y;
    }

## 枚举
使用枚举可以定义一些带名字的常量，和interface相比，枚举定义常量，interface/type 定义变量
使用枚举可以清晰表达意图或创建一组有区别的用例

数字枚举：
    enum Direction{
        up=1,
        down=2,
        left=3,
        right=4
    }
使用枚举很简单：通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举类型：
    Direction.up

字符串枚举
每个成员都要是字符串字面量
    enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

异构枚举
混合数字和字符串，不常用
    enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
    }

const枚举
为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const枚举
    const enum Enum {
    A = 1,
    B = A * 2
    }

## 高级类型
### 交叉类型
将多个类型合并为一个类型，包含所需的所有类型的特性 & ---并集

Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。 就是说这个类型的对象同时拥有了这三种类型的成员。
### 联合类型
表示一个值可以是几种类型之一 |
所以 number | string | boolean表示一个值可以是 number， string，或 boolean。 ---并集
如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员
如果一个值的类型是 A | B，我们能够 确定的是它包含了 A 和 B中共有的成员---交集

    interface Bird {
    fly();
    layEggs();
    }
    
    interface Fish {
        swim();
        layEggs();
    }
    
    function getSmallPet(): Fish | Bird {
        // ...
    }
    
    let pet = getSmallPet();
    pet.layEggs(); // okay
    pet.swim();    // errors




## 调用签名
函数在本质上是一个对象，但特殊的地方在于函数是个可调用的对象
因此，可以使用对象类型来表示函数类型
若在对象类型中定义了调用签名类型成员，则称该对象类型为函数类型
### 调用签名的语法
    {
        (ParameterList):Type
    }
    ParameterList表示函数形式 参数列表类型
    Type表示函数返回值类型
    
    相当于(简写为) （ParameterList）=> Type

例子：使用对象类型字面量和调用签名定义了一个函数类型 ，该函数类型接受两个number类型的参数，并返回number类型的值：
    let add:{(x:number,y:number):number}
    add=function(x:number,y:number):number{
        return x+y
    }
函数类型字面量 完全等同于仅包含一个类型成员 且 是调用签名类型成员的对象类型字面量
    { ( ParameterList ): Type }

    // 简写为：
    
    ( ParameterList ) => Type
函数类型字面量是仅包含单个调用签名的对象类型字面量的简写形式

例：
    const abs0: (x: number) => number = Math.abs;

    const abs1: { (x: number): number } = Math.abs;
    
    abs0(-1) === abs1(-1);  // 


## 泛型
用泛型创建可重用的组件，一个组件可以支持多种类型的数据
### 泛型函数
例：identity函数，但会任何传入它的值
    function identity(arg:any):any {
        return arg；
        }
    使用any类型会导致这个函数可以接收任何类型的arg参数，
    这样就丢失了一些信息：传入的类型与返回的类型应该是相同的，如果传入一个数字，我们只知道任何类型的值都有可能被返回
所以，需要一种方法使返回值的类型与传入参数的类型是相同的————类型变量

类型变量：特殊变量，只用于表示类型而不是值

    function identity<T>(arg:T):T{
        return arg;
    }
    <T>：定义一个类型变量 定义传入的类型
    （arg:T） 参数类型为T
    identity（）：T 返回值类型为T；
给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。 之后我们再次使用了 T当做返回值类型。

我们把这个版本的identity函数叫做泛型，因为它可以适用于多个类型。

定义了泛型函数后，可以两种调用方法：

    //传入类型参数 使用<>尖括号 传入类型
    identity<string>('myString');
    
    //类型推论，编译器根据传入的参数自动确定T的类型
    identity('myString');
    编译器可以查看myString的值，然后把T设置为它的类型。

### 使用泛型变量

创建泛型函数时，要求正确使用通用的类型，把定义的参数T 当做任意或所有类型--像是数组的方法就不能给T用了，因为T代表所有可惜

操作T类型的数组：
    identity<T>(arg:T[]):T[]{    }
    
泛型函数identity接收类型参数T和参数arg，参数元素类型是T的数组，返回的元素类型是T 的数组。
如果传入数字数组，将返回一个数字数组，因为此时T的类型是number ---可以将泛型变量T当做类型的一部分使用；
    
### 泛型类型
泛型函数的类型和普通函数的类型没什么不同，只是有个类型参数在**最前面**，像函数声明一样：
    function identity<T>(arg:T):T{
        return arg
    }
    let myIdentity：<T> (arg:T)=>T  =indenty;
    (arg:T)=>T 定义myIdentity为 T参T返的函数

对象字面量定义泛型函数：
    let myIdentity: {<T>(arg:T):T} = identity

     {<T>(arg:T):T}  调用签名

#### 泛型接口
    interface fnType{
        <T>(arg:T):T;
    }
    let myIdentity:fnType =indenty
例子：想把泛型参数当做整个接口的第一个参数，这样就能知道具体使用的是那个泛型类型
    interface fnType<T>{
        (arg:T):T;
    }
    let myIdentity:fnType<number> =indenty;
不再描述泛型函数，而是把非泛型函数签名作为泛型类型的一部分 
把参数放在调用签名里，
    interface fnType{
            <T>(arg:T):T;
        }
把参数放在接口上
    interface fnType<T>{
        (arg:T):T;
    }

#### 泛型类
看起来和泛型接口差不多，泛型类使用（<>）括起泛型类型，跟在类名后面
    class GenericNumber<T>{
        zeroValue:T;
        add:(x: T,y: T)=>T;
    }    
    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };
与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。

#### 泛型约束
想要操作某类型的一组值，并且知道这组值具有什么样的属性，比如想限制函数去处理任意带有.length属性的所有类型，只要传入的类型有这个属性，我们就允许，为此列出T的约束要求

我们定义一个接口来描述约束条件。 创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束：
    interface Lengthwise{
        length:number;
    }
    function loggingIdentify<T entends Lengthwise>(arg:T):T{
        log(arg.length);
        return arg;
    }
这个泛型函数被定义了约束，因此不再使用与任意类型
    loggingIdentify(3) //出错
要传入符合约束类型的值，必须包含约定的属性
    loggingIdentify({length:3,value::3});

##### 在泛型约束中使用类型参数
可以声明一个类型参数，且被另一个类型参数所约束，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束。

    function getProperty(obj:T,key:K){
        return obj[key];
    }
    let x = {a:1,b:2,c:3,d:4};
    getProperty(x,"a"); //ok
    getProperty(x,"m"); //error
##### 在泛型里使用类类型
在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。比如
    function create<T>(c: {new(): T; }): T {
    return new c();
    }

## 类型断言
手动指定一个值的类型
语法：
    值 as 类型 （tsx中只能使用这种）
    或者 <类型>值

## any和unknown和never
### any 
传入任何类型都可，彻底放弃了类型检查，在大多时候，可以使用unknown代替any。
不可预测，很难维持，top type
### unknown
top type 所有类型都可以分配给unknown，只能将unknown类型的变量赋值给any和unknown
1. 如果不缩小类型，无法对unknown类型执行任何操作

	function getDog(){
		return '22'
	}
	
	const dog:unknown=getDog();
	dog.hello(); //Object is of type 'unknown'
1. 使用类型断言缩小未知范围
要对未知类型执行某些操作，首先要使用类型断言来缩小范围

	const getDogName=()=>{
		let x:unknown;
		return x;
	};
	const dogName=getDogName();
	console.log((dogName as string).toLowerCase());

强制Ts编译器相信我们知道自己在做什么

重要缺点它只是一个假设。没有运行时效果，也不能防止我们在不小心情况下造成错误

    const number:unknown=15;
    (number as string).toLowerCase();

编译器不反对这样处理它

1. 使用类型收缩
ts编译器会分析我们的代码，并找出一个更窄的类型

    const dogName=getDogName();
    if(typeof dogName=="string"){
        console.log(dogName.toLowerCase());
    }

在上面的代码中，我们在运行时检查了 dogName 变量的类型。因此，我们可以确保只在 dogName 是变量时调用 toLowerCase函数。

除了使用 typeof，我们还可以使用 instanceof 来缩小变量的类型。

    type getAnimal=()=>unknown;

     const dog=getAnimal();
    if(dog instanceof Dog){
        console.log(dog.name.toLowerCase());
    }

1. 联合类型中的 unknown 类型

在联合类型中，unknown 类型会吸收任何类型。这就意味着如果任一组成类型是 unknown，联合类型也会相当于 unknown：
让我们来想想 unknown | string 这个例子。这个类型可以表示任何 unkown 类型或者 string 类型的值。

1. 交叉类型中的 unknown 类型

在交叉类型中，任何类型都可以吸收 unknown 类型。这意味着将任何类型与 unknown 相交不会改变结果类型：
IntersectionType3：unknown & string 类型表示所有可以被同时赋值给 unknown 和 string 类型的值。由于每种类型都可以赋值给 unknown 类型，所以在交叉类型中包含 unknown 不会改变结果。我们将只剩下 string 类型。




unknown 类型要安全得多，TypeScript 不允许我们对类型为 unknown 的值执行任意操作,因为它迫使我们执行额外的类型检查来对变量执行操作。




### never 

never 类型是 TypeScript 中的底层类型。它自然被分配的一些例子：

- 一个从来不会有返回值的函数（如：如果函数内含有 while(true) {}）；
- 一个总是会抛出错误的函数（如：function foo() { throw new Error('Not Implemented') }，foo 的返回类型是 never）；

never 表示一个从来不会优雅的返回的函数时，你可能马上就会想到与此类似的 void，然而实际上，void 表示没有任何类型，never 表示永远不存在的值的类型。

当一个函数返回空值时，它的返回值为 void 类型，但是，当一个函数永不返回时（或者总是抛出错误），它的返回值为 never 类型。void 类型可以被赋值（在 strictNullChecking 为 false 时），但是除了 never 本身以外，其他任何类型不能赋值给 never。



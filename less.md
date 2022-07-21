# Less
## 总结
变量：用@声明

## 变量
    @width:10px
    @height:@width+10px

    #header{
        width:@width;
        height:@height;
    }
编译为：
    #header{
        width:10px;
        height:20px;
    }
变量：用@声明
### 值变量
    @color:red;
### 选择器变量
    @mySelector:#wrap
    @Wrap:wrap;

    @{mySelector}{ //变量名 必须用大括号包裹
        color:#999;
        width:50%;
    }
    .@{Wrap}{
        color:#666;
    }
    #@{Wrap}{
        color:#666;
    }
生成的css
    #wrap{
        color:#999;
        width:50%;
    }
    .wrap{
        color:#666;
        }
    #wrap{
        color:#666;
    }

### 属性变量：
    @borderStyle:border-style;
    @Solid:solid;
    #warp{
        @{borderStyle}:@Solid;  //变量名必须使用大括号包裹
    }
    生成的CSS
    #wrap{
        border-style:solid;
    }
### url变量
项目结构改变时，修改其变量即可
    @image:"../img";
    body{
        background:url("@{image}/dog.png"); //变量名必须使用大括号包裹
    }
生成CSS
    body{
        background:url("../img/dog.png"); 
        }
### 声明变量
类似于混合
结构：@name:{属性：值}；
    @background:{background:red;};
    #main{
        @background();
    }
    @Rules:{
        width:100px;
        height:100px;
        border:1px solid red;
    }
    #con{
        @Rules();
    }
生成CSS
    #main{
        background:red;
        }
    #con{
        width:100px;
        height:100px;  
        border:1px solid red;
    }
### 用变量去定义变量
    @fnord:"I am fnord."
    @var:"fnord";
    #warp::after{
        content:@@var;  ////将@var替换为其值 content:@fnord;
    }
生成CSS：
    #warp::after{
        content:"I am fnord.";
        }
## 混合
将一组属性从一个规则集包含到另一个规则集的方式

    .bordered {
        bordered-top:dotted 1px black;
        bordered-bottom:solid 2px black;
        }
如果希望在其他规则集中使用这些属性：可以输入所需属性的类名称
    #menu a{
        color:#111;
        .bordered();
        }
    .post a{
        color:red;
        .bordered();
    }
.bordered 类所包含的属性就将同时出现在 #menu a 和 .post a 中了。

### 混合方法
#### 无参数方法
方法犹如声明的集合，使用时直接键入名称即可
    .card{
        background:#666;
        -webkit-box-shadow: 0 1px 1px rgba(255,255,255,0.2);
        box-shadow: 0 1px 1px rgba(255,255,255,0.2);
    }
    #wrap{
        .card; //等价于.card();
    }
生成CSS：
    #wrap{
        background:#666;
        -webkit-box-shadow: 0 1px 1px rgba(255,255,255,0.2);
        box-shadow: 0 1px 1px rgba(255,255,255,0.2);
    }
 .card 与 .card() 是等价的。
    .card(){
    //something...
    }
    #wrap{
    .card();
    }
#### 默认参数方法

Less 可以使用默认参数，如果 没有传参数，那么将使用默认参数。
@arguments 犹如 JS 中的 arguments 指代的是 全部参数。
传的参数中 必须带着单位。
    .border(@a:10px, @b:20px, @c:30px,@color:#000){
        border:solid 1px @color;
        box-shadow:@arguments; //指代全部参数
    }
    #main{
        .border(0px,5px,30px,red); //必须带单位
    }
    #wrap{
        .border(0px);
    }
    #content{
        .border();  //也可以不写括号
    }
生成CSS：

    #main{
        border:solid 1px red;
        box-shadow:0px,5px,30px,red;
    }

    #wrap{
    border:solid 1px #000;
    box-shadow: 0px 50px 30px #000;
    }

    #content{
    border:solid 1px #000;
    box-shadow: 10px 50px 30px #000;
    }
#### 方法的匹配模式
    /* Less */
    .triangle(top,@width:20px,@color:#000){
        border-color:transparent  transparent @color transparent ;
    }
    .triangle(right,@width:20px,@color:#000){
        border-color:transparent @color transparent  transparent ;
    }

    .triangle(bottom,@width:20px,@color:#000){
        border-color:@color transparent  transparent  transparent ;
    }
    .triangle(left,@width:20px,@color:#000){
        border-color:transparent  transparent  transparent @color;
    }
    .triangle(@_,@width:20px,@color:#000){
        border-style: solid;
        border-width: @width;
    }
    #main{
        .triangle(left, 50px, #999)
    }
/* 生成的 CSS */
    #main{
    border-color:transparent  transparent  transparent #999;
    border-style: solid;
    border-width: 50px;
    }

#### 方法的命名空间
        /* Less */
    #card(){
        background: #723232;
        .d(@w:300px){
            width: @w;
            
            #a(@h:300px){
                height: @h;//可以使用上一层传进来的方法
            }
        }
    }
    #wrap{
        #card > .d > #a(100px); // 父元素不能加 括号
    }
    #main{
        #card .d();
    }
    #con{
        //不得单独使用命名空间的方法
        //.d() 如果前面没有引入命名空间 #card ，将会报错
        
        #card; // 等价于 #card();
        .d(20px); //必须先引入 #card
    }
生成CSS：
    #wrap{
        height: 100px;
    }
    #main {
        width: 300px;
    }
    #con{
        width: 20px;
    }
在 CSS 中> 选择器，选择的是 儿子元素，就是 必须与父元素 有直接血源的元素。
在引入命令空间时，如使用 > 选择器，父元素不能加 括号。
不得单独使用命名空间的方法 必须先引入命名空间，才能使用 其中方法。
子方法 可以使用上一层传进来的方法

#### 方法的条件筛选
用when
        /* Less */
    #card{
        
        // and 运算符 ，相当于 与运算 &&，必须条件全部符合才会执行
        .border(@width,@color,@style) when (@width>100px) and(@color=#999){
            border:@style @color @width;
        }

        // not 运算符，相当于 非运算 !，条件为 不符合才会执行
        .background(@color) when not (@color>=#222){
            background:@color;
        }

        // , 逗号分隔符：相当于 或运算 ||，只要有一个符合条件就会执行
        .font(@size:20px) when (@size>50px) , (@size<100px){
            font-size: @size;
        }
    }
    #main{
        #card>.border(200px,#999,solid);
        #card .background(#111);
        #card > .font(40px);
    }
生成CSS：
    #main{
        border: solid #999 200px;
        background: #111;
        font-size: 20px;
    }

#### 数量不定的参数
用...
        /* Less */
    .boxShadow(...){
        box-shadow: @arguments;
    }
    .textShadow(@a,...){
        text-shadow: @arguments;
    }
    #main{
        .boxShadow(1px,4px,30px,red);
        .textShadow(1px,4px,30px,red);
    }

/* 生成后的 CSS */
    #main{
    box-shadow: 1px 4px 30px red;
    text-shadow: 1px 4px 30px red;
    }
#### 方法使用important！
    /* Less */
    .border{
        border: solid 1px red;
        margin: 50px;
    }
    #main{
        .border() !important;
    }
/* 生成后的 CSS */
    #main {
        border: solid 1px red !important;
        margin: 50px !important;
    }

#### 循环方法
使用递归去实现
/* Less */
    .generate-columns(4);

    .generate-columns(@n, @i: 1) when (@i =< @n) {
    .column-@{i} {
        width: (@i * 100% / @n);
    }
    .generate-columns(@n, (@i + 1));
    }
/* 生成后的 CSS */
    .column-1 {
    width: 25%;
    }
    .column-2 {
    width: 50%;
    }
    .column-3 {
    width: 75%;
    }
    .column-4 {
    width: 100%;
    }
#### 属性拼接方法
+_ 代表空格  +代表逗号
+：逗号
/* Less */
    .boxShadow() {
        box-shadow+: inset 0 0 10px #555;
    }
    .main {
    .boxShadow();
    box-shadow+: 0 0 20px black;
    }
/* 生成后的 CSS */
    .main {
    box-shadow: inset 0 0 10px #555, 0 0 20px black;
    }
+_ 空格
/* Less */
    .Animation() {
    transform+_: scale(2);
    }
    .main {
    .Animation();
    transform+_: rotate(15deg);
        }

/* 生成的 CSS */
    .main {
    transform: scale(2) rotate(15deg);
}




## 嵌套
使用嵌套代替层叠或与层叠结合使用的能力
    #header{
        color: black;
    }
    #header .navigation{
        font-size: 12px;
    }
    #header .logo{
        width:300px;
    }
用Less改写
    #header{
        color: black;
        .navigation{
            font-size: 12px;
        }
        .logo{
            width:300px;
        }
    }
用 Less 书写的代码更加简洁，并且模仿了 HTML 的组织结构

伪选择器（pseudo-selectors）与混合（mixins）一同使用
    
    .clearfix {
        display:block;
        zoom:1;
        &:after{                   //& 表示当前选择器的父级
            content: "";
            display: block;
            font-size: 0;
            height:0;
            clear: both;
            visibility: hidden;
        }
    }
### &的妙用
&代表上一层选择器的名字 此例为header

    #header{
        &:after {
            content: "Less is more";
            }
        .title {
            font-weight: bold;
        }
        &_content {
            margin:20px;
        }
    }
生成CSS
    #header::after {    
        content: "Less is more";
        }
    #header .title {
        font-weight: bold;
        }
    #header_content {
        margin:20px;
        }
### 媒体查询
以往媒体查询都要把元素分开写
    #wrap{
        width:100px;
    }
    @media screen and (max-width: 768px) {
        #wrap {
            width:100px;
            }
            }
less:
    #main{
        @media screen{
            @media (max-width: 768px) {
                width:100px;
                }
        }
        @media tv{
            width:2000px;
        }
    }
生成CSS:

    #media screen and (max-width: 768px) {
        #main {
            width:100px;
            }
            }
    @media tv{
        #main{
            width:2000px;
        }
    }



## 继承
extend 是Less的一个伪类 可以继承所匹配声明中的全部样式 要加： a:extend(b)
### entend使用
/* Less */
    .animation{
        transition: all .3s ease-out;
        .hide{
        transform:scale(0);
        }
    }
    #main{
        &:extend(.animation);
    }
    #con{
        &:extend(.animation .hide);
    }
生成CSS:
    .animation,#main{
        transition: all .3s ease-out;
        }
    .animation .hide #con{
        transform: scale(0);
        }

### all 全局搜索替换
    /* Less */
    #main{
    width: 200px;
    }
    #main {
    &:after {
        content:"Less is good!";
    }
    }
    #wrap:extend(#main all) {}
生成CSS：
    #main,#wrap{
        width: 200px;
        }
    #main:after,#wrap:after {
        content:"Less is good!";
    }
### 减少代码的重复性--extend 与 方法 最大的差别
extend 与 方法 最大的差别，就是 extend 是同个选择器共用同一个声明，而 方法 是使用自己的声明，这无疑 增加了代码的重复性。
#### 用方法
/* Less */
    .Method{
    width: 200px;
    &:after {
        content:"Less is good!";
    }
    }
    #main{
    .Method;
    }
    #wrap{
    .Method;
    }
CSS：
    #main{
        width: 200px;
        &:after {
        content:"Less is good!";
       
    }
    #wrap{
        width: 200px;
        &:after {
        content:"Less is good!";
    }
#### 用继承
    .Method{
        width: 200px;
        &:after {
            content:"Less is good!";
        }
    }
    #main :extend(.Method){    }  //选择器和扩展之间 是允许有空格的：pre:hover :extend(div pre).
    #wrap :extend(.Method) {}
CSS:
    .Method,#main,#wrap{
        width: 200px;
        &:after {
            content:"Less is good!";
        }
    }
如果一个规则集包含多个选择器，所有选择器都可以使用extend关键字


## @规则嵌套和冒泡
@ 规则（例如 @media 或 @supports）可以与选择器以相同的方式进行嵌套。@ 规则会被放在前面，同一规则集中的其它元素的相对顺序保持不变。这叫做冒泡（bubbling）。
    .component {
        width:300px;
        @media (min-width:768px) {
            width:600px;
            @media (min-resolution:192dpi) {
                background-image: url(../images/background.jpg);
            }
        }
        @media (min-width:1280px) {
            width:800px;
        }
    }
编译为：
    .component {
        width:300px;
    }
    @media (min-width:768px) {
        .component {
            width:600px;
        }
    }
    @media  (min-width:768px) and (min-resolution:192dpi) {
        .component {
                background-image: url(../images/background.jpg);
            }
        }
    @media (min-width:1280px) {
        .component {
            width:800px;
        }
    }
## 运算
算术运算符（+、-、*、/）可以对任何数字颜色变量进行运算。如果可能，运算符在加减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。如果单位换算无效或失去意义，则忽略单位。
无效单位换算：
        px->cm / ran->%

        @conversion-1:5cm+10mm; //6cm
        @conversion-2:2-3cm-5mm; //-1.5cm

        //忽略单位
        @incompatible-units:2+5px-3cm;
        //单位无效  只看数字 默认px  4px
        //变量参与计算
        @base: 5%;
        @filler: @base * 2; // 结果是 10%
        @other: @base + @filler; // 结果是 15%
乘除不做转换，可以对颜色进行算数运算
    @color: (#224488 / 2); // 结果是 #112244
    background-color: #112244 + #111; // 结果是 #223355
Less提供色彩函数
calc()特例
为了与 CSS 保持兼容，calc() 并不对数学表达式进行计算，但是在嵌套函数中会计算变量和数学公式的值。
    @var: 50vh/2;
    width: calc(50% + (@var - 20px));  // 结果是 calc(50% + (25vh - 20px))
## 转义
允许使用任意字符串作为属性或变量值。任何~“anything” 或~‘anything’都将按原样输出 除非interpolation
    @min768:~"(min-width:768px)";
    .element {
        @media @min768{
            font-size:1.2rem;
        }
编译为：
    @media (min-width:768px) {
        .element {
            font-size:1.2rem;
            }
            }
## 函数
内置转换颜色处理字符串算术运算等函数 
例：利用percentage转换0.5到50%,将颜色饱和度增加 5%，以及颜色亮度降低 25% 并且色相值增加 8 等用法：
    @base:#f04615;
    @width:0.5;

    .class {
        width:percentage(@width);
        color:saturate(@base,5%);
        background-color:spin(lighten(@base,25%),8);
        }
### 判断类型
isnumber
    判断给定的值是否是一个数字
    isnumber(#ff0)  // false
iscolor
    判断给定的值是否是一个颜色
isurl
    判断给定的值是否是一个url

### 颜色操作
saturate
    增加一定数值的颜色饱和度。
lighten
    增加一定数值的颜色亮度。
darken
    降低一定数值的颜色亮度。
fade
    给颜色设定一定数值的透明度
mix 
    根据比例混合两种颜色
### 数学函数
ceil
    向上取整
floor
    向下取整
percentage
    将浮点数转换为百分比字符串
round
    四舍五入
sqrt
    计算数的平方根
abs
    数字绝对值 保持单位
pow
    计算数的乘方



## 命名空间和访问符
处于组织结构或封装，希望对混合进行分组
假设将一些混合和变量置于#bundle之下，为了以后方便重用或分发：
    #bundle(){
        .button{
            display:block;
            border:1px solid black;
            background-color:grey;
            &:hover{
                background-color:white;
            }
        }
        .tab{...}
        .citation{...}
    }
现在要把.button类混合到#header a中，可以这样做；
    #header a {
        color:orange;
        #bundle.button();   //还可以写成#bundle >.button形式
        }
## 映射（Maps）
将混合和规则集作为一组值的映射使用
    #colors(){
        primary:blue;
        secondary:green;
    }
    .button{
        color:#colors[primary];
        border:1px solid #colors[secondary];
    }
## 作用域
首先在本地查找变量和混合，如果找不到，则从父级作用域继承
    @var:red;
    #page{
        @var:white;
        #header{
            color:@var; //white
            }
    }
混合和变量的定义不必在引用之前事先定义
    @var:red;
    #page{
     
        #header{
            color:@var; //white
            }
        @var:white;
    }
## 注释
/*  */  和 //都可以用

## 导入
导入一个.less文件 文件内的所有变量都可以全部使用了 如果导入的文件扩展名是.less，可以把扩展名省略掉

    @import "library";

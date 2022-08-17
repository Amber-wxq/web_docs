# Vue

## MVVM模式

model  View  view Model

![](http://img.smyhvae.com/20180420_2150.png)

- Model：负责数据存储

- View：负责页面展示

- View Model：负责业务逻辑处理（比如Ajax请求等），对数据进行加工后交给视图展示

## 什么是虚拟DOM

在js内存里构建类似于DOM的对象，去拼装数据，拼装完整后，把数据整体解析，一次性插入到html中。

## Vue框架特点

- 模板渲染 基于html的模板语法
- 响应式更新：数据改变忠厚，视图会自动刷新
- 渐进式框架
- 组件化
- 轻量级

## 利用 vue-cli 新建一个空的项目

Vue 提供一个官方命令行工具，可用于快速搭建大型单页应用。该工具为现代化的前端开发工作流提供了开箱即用的构建配置。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。

### 官方代码参考

```
  npm install -g @vue/cli

  vue create my-app

  cd my-app

  npm run serve
```

我们根据上方的参考代码，来看看“利用 vue-cli 新建一个空的项目”的步骤。

1. 安装vue-cli

   ```
   npm install -g @vue/cli
   ```

2. 初始化项目

   ```
   vue create my-app
   ```

   本地运行项目

   ```
   cd my-app
   npm run server
   ```

   

## vue 项目结构分析

![](http://img.smyhvae.com/20180501_2100.png)

- buid：打包配置的文件夹

- config：webpack对应的配置

- src：开发项目的源码
  - App.vue：入口组件。`.vue`文件都是组件。
  - main.js：项目入口文件。

- static：存放静态资源

- `.babelrc`：解析ES6的配置文件

- `.editorcofnig`：编辑器的配置

- `.postcssrc.js`：html添加前缀的配置

- `index.html`：单页面的入口。通过 webpack打包后，会把 src 源码进行编译，插入到这个 html 里面来。

- `package.json`：项目的基础配置，包含版本号、脚本命令、项目依赖库、开发依赖库、引擎等。

## 系统指令

### 插值

{{name}}

这个标签会被替换为数据对象data上的name属性

name属性发生改变，插值内容会自动更新

{{ }} 还支持单个的js表达式



#### 对比react

react使用jsx语法，html和js混用，js的部分用 {} 括起来使用



### v-cloak

保持和元素实例的关联，直到结束编译后自动消失。

能够**解决插值表达式闪烁的问题**（即：可以隐藏未编译的标签直到实例准备完毕）。

```
    <span v-cloak>{{name}}</span>
```

### v-text

v-text可以将一个变量的值渲染到指定的元素中。

**直接替换该元素**

```
<span v-text="name"></span>

new Vue({
    el: '#div1',
    data: {
      name: 'hello smyhvae'
    }
  });
```



### 插值表达式和 v-text 的区别

```html
  <!-- 插值表达式 -->
  <span>content:{{name}}</span>

  <!-- v-text -->
  <span v-text="name">/span>
```

**区别1**： v-text 没有闪烁的问题，因为它是放在属性里的。

**区别2** :插值表达式只会替换自己的这个占位符，并不会把整个元素的内容清空。v-text 会**覆盖**元素中原本的内容。

为了解释区别2，我们来用代码举例：

```html
  <!-- 插值表达式 -->
  <p>content:++++++{{name}}------</p>

  <!-- v-text -->
  <p v-text="name">------++++++</p>
```

结果

```
content:++++++smyhvae------
smyhvaee
```

### v-html


`v-text`是纯文本，而`v-html`会被解析成html元素。

注意：使用v-html渲染数据可能会非常危险，因为它很容易导致 XSS（跨站脚本） 攻击，使用的时候请谨慎，能够使用{{}}或者v-text实现的不要使用v-html。

```
  <p v-html="msg"></p>
  
   var vm = new Vue({
            el: '#app',
            data: {
                msg: '<h1>我是一个大大的h1标题</h1>'
            }
        })
```

### v-bind

用于绑定属性

简写 在属性前加`:`

比如说：

```html
    <img v-bind:src="imageSrc +'smyhvaeString'">

    <div v-bind:style="{ fontSize: size + 'px' }"></div>
```


上方代码中，给属性加了 v-bind 之后，属性值里的整体内容是**表达式**，属性值里的`imageSrc`和`size`是Vue实例里面的**变量**。

也就是说， v-bind的属性值里，可以写合法的 js 表达式。

例：

```html
<input type="text" value="name">

<!-- 加上 v-bind 之后，value里的值是 Vue 里的变量 -->
<input type="text" v-bind:value="name">

<!-- 超链接后面的path是 Vue 里面的变量 -->
<a v-bind="{href:'http://www.baidu.com/'+path}">超链接</a>

new Vue({
    el: '#div1',
    data: {
      name: 'smyhvae',
      path: `2.html`
    }
  });
```

结果

我们给`value`这个属性绑定了值，此时这个值是一个变量

![](http://img.smyhvae.com/20180313_1745.png)

### v-on

事件绑定

`v-on:click`：点击事件

```
 <button v-on:click="change">改变name的值</button>
```

**简写形式**

`@`

例如：

```html
    <button v-on:click="change">改变name的值</button>
```

可以简写成：

```html
    <button @click="change">改变name的值</button>
```

**事件修饰符**

`v-on` 提供了很多事件修饰符来辅助实现一些功能。事件修饰符有如下：

- `.stop`  阻止冒泡。本质是调用 event.stopPropagation()。
- `.prevent`  阻止默认事件（默认行为）。本质是调用 event.preventDefault()。
- `.capture`  添加事件监听器时，使用捕获的方式（也就是说，事件采用捕获的方式，而不是采用冒泡的方式）。
- `.self`  只有当事件在该元素本身（比如不是子元素）触发时，才会触发回调。
- `.once`  事件只触发一次。
- `.{keyCode | keyAlias}`   只当事件是从侦听器绑定的元素本身触发时，才触发回调。
- `.native` 监听组件根元素的原生事件。

一个事件允许同时使用多个事件修饰符

```html
  <!-- click事件 -->
        <button v-on:click="doThis"></button>

        <!-- 缩写 -->
        <button @click="doThis"></button>

        <!-- 内联语句 -->
        <button v-on:click="doThat('hello', $event)"></button>

        <!-- 阻止冒泡 -->
        <button @click.stop="doThis"></button>

        <!-- 阻止默认行为 -->
        <button @click.prevent="doThis"></button>

        <!-- 阻止默认行为，没有表达式 -->
        <form @submit.prevent></form>

        <!--  串联修饰符 -->
        <button @click.stop.prevent="doThis"></button>
```

**.stop的例子**

父子盒子都设置了点击事件

点击子盒子的时候，父盒子也会触发点击事件

现在只想子盒子触发，父盒子不触发

给子盒子加`.stop`，阻止冒泡

```html
  <div class="child" @click.stop="childClick">
```

**.self例子**

只有事件在该元素本身触发时，才会触发回调

同样的父子盒子，在父盒子身上设置`.self` 

子盒子的点击事件不会冒泡到父盒子上了

**疑问**：既然`.stop`和`.self`都可以阻止冒泡，那二者有什么区别呢？区别在于：前者能够阻止整个冒泡行为，而后者只能阻止自己身上的冒泡行为。

### v-model

双向数据绑定

**只能用于表单元素，或者自定义组件**

通过v-bind，给`<input>`标签绑定了`data`对象里的`name`属性。当`data`里的`name`的值发生改变时，`<input>`标签里的内容会自动更新。

通过v-model，在`<input>`标签里修改内容，要求`data`里的`name`的值自动更新

**区别**：

- v-bind：只能实现数据的**单向**绑定，从 M 自动绑定到 V。
- v-model：只有`v-model`才能实现**双向**数据绑定。注意，v-model 后面不需要跟冒号

### 属性绑定为元素设置class类样式

正常情况

```html
 <h1 class="my-red my-thin">我是千古壹号，qianguyihao</h1>
```

#### 数组

```html
 <h1 :class="['my-red', 'my-thin']">我是qianguyihao，千古壹号</h1>
```

数组里写的是字符串

#### 数组写三元表达式

```html
 <h1 :class="[flag?'my-active':'']">我是qianguyihao，千古壹号</h1>

<script>
        var vm = new Vue({
            el: '#app',
            data: {
                flag:true
            }
        });
    </script>
```

通过data中的flag值判断是否设置

#### 数组中 对象 替换 三元

```html
<h1 :class="[ {'my-active':flag} ]">我是qianguyihao，千古壹号</h1>
```

#### 直接写对象

```html
<h1 :class="{style1:true, style2:false}">我是qianguyihao，千古壹号</h1>
```

class样式名是放在对象中的，这个样式名不能有中划线

对象形式也可以放到data中

```html
<h1 :class="classObj">我是qianguyihao，千古壹号</h1>
    </div>

data: {
                classObj:{style1:true, style2:false}
            }
    
```

### v-for

根据数组的元素遍历指定模板内容生成内容

```html
<li v-for="item in list">{{item}}</li>

list:[1,2,3]
```

遍历方法

**普通数组**

```html
 arr1: [2, 5, 3, 1, 1]
 <li v-for="item in arr1">{{item}}</li>

<li v-for="(item,index) in arr1">值：{{item}} --- 索引：{{index}}</li>
```

括号里如果写两个参数，第一个参数代表值，第二个参数代表index

**对象数组**

```html
 <li v-for="(item, index) in dataList">姓名：{{item.name}} --- 年龄：{{item.age}} --- 索引：{{index}}</li>

dataList: [
                    { name: 'smyh', age: '26' },
                    { name: 'vae', age: '32' },
                    { name: 'xiaoming', age: '20' }
                ]
```

**对象**

```html
 obj1: {
        name: 'qianguyihao',
        age: '26',
        gender: '男'
      }

<li v-for="(value,key,index) in obj1"> 
值：{{value}} --- 键：{{key}} --- index：{{index}} 
</li>
```

**数字**

```html
<li v-for="myCount in 10">这是第 {{myCount}}次循环</li>
```

如果使用 v-for 遍历数字的话，前面的 myCount 值从 1 开始算起

**key值注意事项**

key属性必须加

每次for循环的时候，通过指定key来标识当前循环这一项的唯一身份

V-for 正在更新已经渲染过的元素列表时，默认用就地复用的策略

如果数据项的顺序被改变，Vue将**不是移动 DOM 元素来匹配数据项的顺序**， 而是**简单复用此处每个元素**，并且确保它在特定索引下显示已被渲染过的每个元素。

为了给 Vue 一个提示，**以便它能跟踪每个节点的身份，从而重用和重新排序现有元素**，你需要为每项提供一个唯一 key 属性。

key要通过v-bind来指定

```html
<p v-for="item in list" :key="item.id">
            <input type="checkbox">{{item.id}} --- {{item.name}}
        </p>
```

### v-if

设置元素的显示和隐藏

本质是添加、删除DOM元素

```html
<div v-if="isShow">我是盒子</div>
```



### v-show

设置元素显示和隐藏

本质是在元素上添加、移除 display：none

```html
    <div v-show="isShow">我是盒子</div>
```

### v-if和v-show的区别

`v-if`和`v-show`都能够实现对一个元素的隐藏和显示操作。

区别：

- v-if：每次都会重新添加/删除DOM元素

- v-show：每次不会重新进行DOM的添加/删除操作，只是在这个元素上添加/移除`style="display:none"`属性，表示节点的显示和隐藏。

优缺点：

- v-if：有较高的切换性能消耗。这个很好理解，毕竟每次都要进行dom的添加／删除操作。

- v-show：**有较高的初始渲染消耗**。也就是说，即使一开始`v-show="false"`，该节点也会被创建，只是隐藏起来了。而`v-if="false"`的节点，根本就不会被创建。

**总结**：

- 如果元素涉及到频繁的切换，最好不要使用 v-if, 而是推荐使用 v-show

- 如果元素可能永远也不会被显示出来被用户看到，则推荐使用 v-if

## 自定义过滤器

可以使用全局方法`Vue.filter()`自定义一个全局过滤器

能Vue对象实例都可以使用过滤器

接收两个参数：过滤器参数、过滤器函数



比如说，我要将`曾经，我也是一个单纯的少年，单纯的我，傻傻的问，谁是世界上最单纯的男人`这句 msg 中的“单纯”改为“邪恶”。可以这样做：

（1）在插值表达式中这样调用：

```html
        <p>{{ msg | msgFormat }</p>
```


上方代码的意思是说：

- **管道符前面**的`msg`：要把 `msg` 这段文本进行过滤，
- **管道符后面**的`msgFormat`：是通过`msgFormat`这个过滤器进行来操作。



（2) **定义过滤器**

```js
Vue.filter('msgFormat',function(myMsg){

	return myMsg.replace(/单纯/g，‘邪恶’)
})
```

- `Vue.filter(‘过滤器的名称’, 具体的过滤器函数)`中的第一个参数指的就是过滤器的名称（必须和**管道符后面**的名称**完全一致**），第二个参数是具体的过滤器函数

- 过滤器函数function中，第一个参数指的**管道符前面的**msg。

- `replace()`方法是用来做字符串的替换的。第一个参数如果只写成`单纯`，那么就会只修改 msg 中的第一个`单纯`字样。所以这里就用正则去匹配msg 中所有的`单纯`字样。



例子

```html
 <div id="app">
        <!-- 通过 过滤器 msgFormat 对 msg 进行过滤-->
        <p>{{ msg | msgFormat }}</p>
    </div>

    <script>
        // 定义一个 Vue 全局的过滤器，名字叫做  msgFormat
        Vue.filter('msgFormat', function (myMsg) {
            // 字符串的  replace 方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则
            //将 myMsg 中的所有`单纯`字样，修改为`邪恶`
            return myMsg.replace(/单纯/g, '邪恶')
        })

        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: {
                msg: '曾经，我也是一个单纯的少年，单纯的我，傻傻的问，谁是世界上最单纯的男人'
            },
            methods: {}
        });
    </script>
```



给过滤器**添加多个参数**

```html
 <p>{{ msg | msgFormat('xxx') }}</p>
```

```js
Vue.filter('msgFormat', function (myMsg, arg2) {
            // 字符串的  replace 方法：第一个参数，除了可写一个 字符串之外，还可以定义一个正则；第二个参数代表要替换为上面的xxx
            //将 myMsg 中的所有`单纯`字样，修改为 arg2
            return myMsg.replace(/单纯/g, arg2)
        })
```

三个参数

```html
<p>{{ msg | msgFormat('【牛x】', '【参数arg3】') }}</p>
```



```js
Vue.filter('msgFormat', function (myMsg, arg2, arg3) {
            // 字符串的  replace 方法：第一个参数，除了可写一个 字符串之外，还可以定义一个正则；第二个参数代表要替换为 xxx
            //将 myMsg 中的所有`单纯`字样，修改为`arg2 + arg3`
            return myMsg.replace(/单纯/g, arg2 + arg3)
        })
```



**同时使用多个过滤器**

```html
 <p>{{ msg | msgFormat('【牛x】', '【参数arg3】') | myFilter2}}</p>
```

```js
Vue.filter('msgFormat', function (myMsg, arg2, arg3) {
            
            return myMsg.replace(/单纯/g, arg2 + arg3)
        })

        //定义第二个全局过滤器
        Vue.filter('myFilter2', function (myMsg) {
            //在字符串 msg 的最后面加上【后缀】
            return myMsg + '【后缀】'
        })
```

### 私有过滤器

**私有过滤器**：在某一个 vue 对象内部定义的过滤器称之为私有过滤器。这种过滤器只有在当前vue对象的el指定的监管区域有用

```js
new Vue({
        el: '#app',
        data: {
            time: new Date()
        },
        //在某一个vue对象内部定义的过滤器称之为私有过滤器，
        //这种过滤器只有在当前vue对象el指定的监管的区域有用
        filters: {
            // input是自定义过滤器的默认参数，input的值永远都是取自于 | 左边的内容
            datefmt: function (input) {
                // 定义过滤器的内容：将input的值格式化成 yyyy-MM-dd 字符串输出
                var res = '';
                var year = input.getFullYear();
                var month = input.getMonth() + 1;
                var day = input.getDate();

                res = year + '-' + month + '-' + day;

                return res;
            }
        }
    });
```



## v-on 按键修饰符 监听键盘输入

```
  .enter
    .tab
    .delete (捕获 “删除” 和 “退格” 键)
    .esc
    .space
    .up
    .down
    .left
    .right
```

`keyup`指的是：键盘（任何键位）抬起时的监听事件。`.enter`指的是：按enter键的按键修饰符。我们把这两个结合起来看看。

**`@keyup.enter`举例**：按enter键后的监听事件

`@keyup.enter="addData"`表示：按住enter键后，执行addData()方法。

**全称**是`v-on:key.enter="addData"`。



例子 在输入框中按enter键后，也能添加item

```html
<input type="text" v-model="formData.name" @keyup.enter="addData">
```

所以要加上修饰符`.enter`，表示只针对enter键。



### 自定义按键修饰符

比如按键F2

`@keyup.f2="addData"` 没有效果

因为不是内置按键修饰符

可以用键值

`@keyup.113="addData"`

但是数值不好记

```js
Vue.config.keyCode.f2=113;
```



## 自定义全局指令

例子 文本框自动获取焦点

原生js

```js
document.getElementById('search').focus()
```



自定义全局指令

`Vue.directive()`

```js
Vue.directive('focus',{
  
  bind:function(el){
    
  },
  inserted:function(el){
    el.focus()
  },
  updated:function(el){
    
  }
})
```




























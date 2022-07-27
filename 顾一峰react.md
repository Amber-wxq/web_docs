# 顾一峰react

```
git clone git@github.com:ruanyf/react-demos.git
```

## ReactDOM.render()

用于将模板转为HTML语言，并插入指定的DOM节点

```
ReactDOM.render({
	<h1>hello</h1>,
	document.getElementById('example')
})
```

将h1标题，插入example节点

## JSX

JSX 的基本语法规则：遇到 HTML 标签（以 `<` 开头），就用 HTML 规则解析；遇到代码块（以 `{` 开头），就用 JavaScript 规则解析。

JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员

```
var arr=[
  <h1>hello</h1>,
  <h2>hello2</h2>,
]
ReactDOM.render({
	<div>{arr}<div>,
	document.getElementById('example')
})
```

`arr`变量是一个数组，结果 JSX 会把它的所有成员，添加到模板

结果：

 hello

hello2

## 组件

- 组件名字第一个字母必须大写
- 组件返回必须只有一个顶层标签



### 函数组件：

```
function Welcome(props){
	return <h1>hello</h1>
}
```

### class组件：

```
class Welcome extends React.Component{
	render(){
		return <h1>hello</h1>
	}
}
```

class定义的组件，都要有自己的render方法（函数）,也要有return

### 组件添加属性

组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 `<HelloMessage name="John">` ，就是 `HelloMessage` 组件加入一个 `name` 属性，值为 `John`。组件的属性可以在组件类的 `this.props` 对象上获取，比如 `name` 属性就可以通过 `this.props.name` 读取。上面代码的运行结果如下。

有一个地方需要注意，就是 `class` 属性需要写成 `className` ，`for` 属性需要写成 `htmlFor`

#### for属性

当与 <label>元素一起使用时，`for` 属性指定标签绑定到哪个表单元素。

```
 <input type="radio" id="html" name="fav_language" value="HTML">
  <label for="html">HTML</label><br>
  <input type="radio" id="css" name="fav_language" value="CSS">
  <label for="css">CSS</label><br>
```



当与 <output>元素一起使用时，`for` 属性指定计算结果与计算中使用的元素之间的关系。

```
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
  <input type="range" id="a" value="50">100
  +<input type="number" id="b" value="50">
  =<output name="x" for="a b"></output>
</form>
```

## this.props.children

`this.props` 对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children` 属性。它表示组件的所有子节点

```
class NoteList extends React.Component{
	render(){
		return（
			<ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
		）
	}
}

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```

结果：每个span都包上了li标签

1. hello
2. world

### 关于this.props.children值

没有子节点：undefined

一个子节点：object

多个子节点：array

React 提供一个工具方法 [`React.Children`](https://facebook.github.io/react/docs/top-level-api.html#react.children) 来处理 `this.props.children` 。我们可以用 `React.Children.map` 来遍历子节点，而不用担心 `this.props.children` 的数据类型是 `undefined` 还是 `object`。

### React.children方法

提供了用于处理不透明数据结构的实用方法

#### .map

```
React.Children.map(children, function[(thisArg)])
```

在children里的每个直接子节点上调用一个函数，并将this设置为thisArg。

如果children是一个数组，它将被遍历并为数组中的每一个子节点调用该函数，如果子节点为null或undefined，方法返回null或者undefined 而不会返回数组

如果children是一个Fragment对象，它将被视为单一子节点的情况处理，而不会被遍历

#### .forEach

```
React.Children.forEach(children, function[(thisArg)])
```

与 [`React.Children.map()`](https://zh-hans.reactjs.org/docs/react-api.html#reactchildrenmap) 类似，但它不会返回一个数组。

#### .count

```
React.Children.count(children)
```

返回children中的组件总数量，等同于通过map或forEach调用回调函数的次数

#### .only

```
React.Children.only(children)
```

验证children是否只有一个子节点（react元素），如果有则返回它，否则抛出错误

#### .toArray

```
React.Children.toArray(children)
```

将 `children` 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。当你想要在渲染函数中操作子节点的集合时，它会非常实用，特别是当你想要在向下传递 `this.props.children` 之前对内容重新排序或获取子集时。

## PropTypes

类型检查（用typescript一样）

组件可以接受任何值，有时需要验证别人使用组件时，提供的参数是否符合要求

组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求

```
class MyTitle extends React.Component({
	propTypes:{
		title:React.PropTypes.string.isRequired,
	},
	render(){
		return <h1>{this.props.title}</h1>
	}
})
```

Mytitle组件有一个title属性。PropTypes告诉React，这个title是必须的，且必须为字符串

```
var data=123;
<MyTitle title={data} />
```

报错

```
Warning: Failed propType: Invalid prop `title` of type `number` supplied to `MyTitle`, expected `string`.
```

注意：

​	PropTypes移入了另一个包，用prop-types库代替

新用例：

```
import PropTypes from 'prop-types'
//函数式
function Hello({name}){
	return (
		<div>hello,{name}</div>
	)
}
//class
class Hello extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

//添加propTypes
Hello.propTypes={
	name:PropTypes.string
}

export default Hello;

```

指定默认值：

```
Hello.defaultProps = {
  name: 'Stranger'
};
```

限制children只有一个元素

```
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // 这必须只有一个元素，否则控制台会打印警告。
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

可用的设置：

```
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的必需数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `oneOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

## 获取真实的DOM节点-ref

组件不是真实DOM而是存在于内存的数据结构，虚拟DOM，只有当它插入文档以后，才会变成真实的DOM。

根据React的设计，所有的DOM变动，先在虚拟DOM上，然后将实际发生变动的地方，反应在真实DOM上，这种算法叫DOM diff



从组件获取真实DOM节点，要用到ref属性

```
class MyComponent extends React.Component{
	handleClick(){
		this.refs.myTextInput.focus();
	}
	
	render(){
		return (
			<div>
				<input type='text' ref="myTextInput" />
				<input type="button" value="Focus the text input" onClick={this.handleClick}>
			</div>
		)
	}
}
```

由于 `this.refs.[refName]` 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。上面代码中，通过为组件指定 `Click` 事件的回调函数，确保了只有等到真实 DOM 发生 `Click` 事件之后，才会读取 `this.refs.[refName]` 属性。

React 组件支持很多事件，除了 `Click` 事件以外，还有 `KeyDown` 、`Copy`、`Scroll` 等，完整的事件清单请查看[官方文档](https://facebook.github.io/react/docs/events.html#supported-events)。

## 表单

获取表单值，定义onChange/onSubmit事件的回调函数，通过event.target.value 读取用户输入值

`textarea` 元素、`select`元素、`radio`元素都属于这种情况

```
<input type="text" value={value} onChange={this.handleChange} />
handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  
  //submit
  
 class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

## 生命周期

组件生命周期的三个状态：

- Mounting :已插入真实DOM
- Updating:正在被重新渲染
- Unmounting:已移出真实DOM

每个状态都由两个处理函数，will 进入状态之前调用，did 进入状态之后调用，共五种

- componentWillMount()
- componentDidMount()
- componentWillUpdate(object nextProps,object nextState)
- componentDidUpdate(object prevProps,object prevState)
- componentWillUnmount()

还提供两种特殊状态的处理函数

- componentWillReceiveProps(object nextProps):已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps,object nextState):组件判断是否重新渲染时调用

#### 组件style属性设置方式

```javascript
style={{opacity: this.state.opacity}}
```

因为react组件样式是一个对象，第一层表示是js语法，第二次表示是样式对象

## AJAX

组件数据来源一般是服务器，可以在componentDidMount方法中设置AJAX请求，请求成功，用setState方法重新渲染

```

var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.body
);
```

上面代码使用 jQuery 完成 Ajax 请求，这是为了便于说明。React 本身没有任何依赖，完全可以不用jQuery，而使用其他库

# react-router

```
git@github.com:reactjs/react-router-tutorial.git
```

react官方 router实例库

## 基本用法

安装：

```
npm install -S react-router
```

使用时，路由器Router就是React的一个组件

```
import { Router } from 'react-router';
render(<Router/>, document.getElementById('app'));
```

官方例子：

```
import {Router} from 'react-router';

React.render((
	<Router>
        <Route path='/' component={App}>
            <Route path='about' component={About} />
            <Route path='users' component={Users}>
                  <Route path='/user/:userId' component={User} />
            </Route>
            <Route path='*' component={NoMatch} />
      </Route>
	</Router>
),document.body)
```

Router组件本身只是一个容器，真正的路由通过Route组件定义

```
import {Router,Route,hashHistory} from 'react-router';

render((

	<Router history={hashHistory}>
			<Route path="/" component={App} />
	</Router>
	),document.getElementById("app"))
```

用户访问根路由`/`（比如`http://www.example.com/`），组件`APP`就会加载到`document.getElementById('app')`。

Router的 history属性，值hashHistory表示，路由的切换有URL的hash变化决定，URL的#部分发生变化

用户访问`http://www.example.com/`，实际会看到的是`http://www.example.com/#/`。

用户访问`/repos`（比如`http://localhost:8080/#/repos`）时，加载`Repos`组件；访问`/about`（`http://localhost:8080/#/about`）时，加载`About`组件。

## 嵌套路由

```
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>
```

用户访问`/repos`时，会先加载`App`组件，然后在它的内部再加载`Repos`组件。

嵌套式，App组件对应的写法变为：

```
return <div>
					{this.props.children}
			</div>
```

`App`组件的`this.props.children`属性就是子组件。

子路由也可以不卸载Router组件里面，单独传入Router组件的routes属性

```
let routes= <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
  
  <Router routes={routes} history={browserHistory} /> 
```

## path 属性

属性指定路由的匹配规则，path属性可以省略，这样不管路径是否匹配，总会加载指定组件

```
<Route path='inbox' component={Index}>
	<Route path='messages/:id' component={Message} />
</Route>
```

这样写 当用户访问`/inbox/messages/:id`时，会加载下面的组件。

```html
<Inbox>
  	<Message />
</Inbox>
```

如果省略外层path

```
<Route  component={Index}>
	<Route path='messages/:id' component={Message} />
</Route>
```

用户访问`/inbox/messages/:id`时,组件加载还是原来的样子

```
<Inbox>
<Message />
  </ Inbox>

```

## 通配符

```
```


















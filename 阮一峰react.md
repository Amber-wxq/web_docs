# 阮一峰react

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



# Hooks

## 两套API

class类，和基于函数的钩子（HOOKS)API

官方推荐使用钩子，更简洁，代码量少，用起来轻，而类比较重

钩子是函数，更符合React函数式的本质

**React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。**

所有的钩子都是为函数引入外部功能

## 类和函数的差异

代表不同的编程方法论

**类**是数据和逻辑的封装：

​	组件的状态和操作方法是封装在一起的，选择类写法，就应该把相关的数据和操作，写在同一个class里

类的缺点：

- 大型组件很难拆分和重构，也很难测试。
- 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
- 组件类引入了复杂的编程模式，比如 render props 和高阶组件。

**函数**只应该做一件事：

​	返回一个值，如果有多个操作，每个操作都应该写成一个单独的函数，而且数据的状态应该与操作方法分离

​	根据这种理念，React的函数组件只做一件事：返回组件的HTML代码，没有其他功能

这个函数只做一件事，就是根据输入的参数，返回组件的 HTML 代码。这种只进行单纯的数据计算（换算）的函数，在函数式编程里面称为 **"纯函数"**（pure function）。

## 副效应是什么

如果纯函数只能进行数据计算，那些不涉及计算的操作（比如生成日志、储存数据、改变应用状态等等）应该写在哪里呢？

函数式编程将那些跟数据计算无关的操作，都称为 "副效应" **（side effect）** 。如果函数内部直接包含产生副效应的操作，就不再是纯函数了，我们称之为不纯的函数。

纯函数内部只有通过间接的手段（即通过其他函数调用），才能包含副效应。

## 钩子（hook）的作用-为函数组件引入副效应

**钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应。** 函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都必须通过钩子引入。

由于副效应非常多，所以钩子有许多种。React 为许多常见的操作（副效应），都提供了专用的钩子。

- useState():保存状态
- useContext():保存上下文
- useRef():保存引用

上面这些钩子，都是引入某种特定的副效应，而 **`useEffect()`是通用的副效应钩子** 。找不到对应的钩子时，就可以用它。其实，从名字也可以看出来，它跟副效应（side effect）直接相关。

以前，放在`componentDidMount`里面的代码，现在可以放在`useEffect()`。



## useEffect()作用

`useEffect()`本身是一个函数，由 React 框架提供，在函数组件内部调用即可。

举例来说，我们希望组件加载以后，网页标题（`document.title`）会随之改变。那么，改变网页标题这个操作，就是组件的副效应，必须通过`useEffect()`来实现。

```jsx
import React,{useEffect} from 'react'
function Welcom(props){
  useEffect(()=>{
    document.title='加载完成'；
  })
  return <h1>Hello,{props.name}<h1/>
}
```

上面例子中，`useEffect()`的参数是一个函数，它就是所要完成的副效应（改变网页标题）。组件加载以后，React 就会执行这个函数。

`useEffect()`的作用就是指定一个副效应函数，组件每渲染一次，该函数就自动执行一次。组件首次在网页 DOM 加载后，副效应函数也会执行。

## useEffect() 的第二个参数

有时候，我们不希望`useEffect()`每次渲染都执行，这时可以使用它的第二个参数，使用一个数组指定副效应函数的依赖项，只有依赖项发生变化，才会重新渲染。

```
function Welcome(props){
	useEffect(()=>{
		document.title=`Hello,${props.name}`;
	},[props.name])
}
```

指定了第一个参数的依赖项（props.name）只有该变量发生变化时，副效应函数才会执行

如果第二参数是一个空数组，表明没有任何依赖项，所以只会在组件加载进入DOM后执行一次。

组件重新渲染，就不会再执行。

例子：

```jsx
const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true); 
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId])

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return <div>
    <p>You're viewing: {person.name}</p>
    <p>Height: {person.height}</p>
    <p>Mass: {person.mass}</p>
  </div>
}
```

### tip fetch用法

```jsx
fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
```



## useEffect() 的用途

- 获取数据 （data fetching）
- 事件监听或订阅（setting up a subscription）
- 改变DOM
- 输出日志

### 例子：从远程服务器获取数据

```jsx
import React,{useState,useEffect} from 'react';
import axios from 'axios'

function App(){
  	const [data,setData]=useState({hits:[]});
  	useEffect(()=>{
      const fetchData=async()={
        const result=await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
        );
      	setData(result.data);
      }
     fetchData();
    },[]);
	return(
  <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  )
}

export default App;
```

上面例子中，`useState()`用来生成一个状态变量（`data`），保存获取的数据；`useEffect()`的副效应函数内部有一个 async 函数，用来从服务器异步获取数据。拿到数据以后，再用`setData()`触发组件的重新渲染。

由于获取数据只需要执行一次，所以上例的`useEffect()`的第二个参数为一个空数组。



## useEffect() 的返回值

副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应。

`useEffect()`允许返回一个函数，在组件卸载时，执行该函数，清理副效应。如果不需要清理副效应，`useEffect()`就不用返回任何值。

```jsx
useEffect(()=>{
  const subscription=props.source.subscribe();
  return ()=>{
    subscription.unsubscribe();
  }
},[props.source]);
```

上面例子中，`useEffect()`在组件加载时订阅了一个事件，并且返回一个清理函数，在组件卸载时取消订阅。



实际使用中，由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，**每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应**。在组件重新渲染后，清除之前的effect

## useEffect() 的注意点

如果有多个副效应，应该调用多个`useEffect()`，而不应该合并写在一起。

副效应函数里面有两个定时器，它们之间并没有关系，其实是两个不相关的副效应，不应该写在一起。正确的写法是将它们分开写成两个`useEffect()`。

```
function App() {
  const [varA, setVarA] = useState(0);
  const [varB, setVarB] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setVarA(varA + 1), 1000);
    return () => clearTimeout(timeout);
  }, [varA]);

  useEffect(() => {
    const timeout = setTimeout(() => setVarB(varB + 2), 2000);

    return () => clearTimeout(timeout);
  }, [varB]);

  return <span>{varA}, {varB}</span>;
}
```



## 默认提供的最常用钩子

- useState()
- useContext()
- useReducer()
- useEffect()

### useState()

`useState()`这个函数接受状态的初始值，作为参数，上例的初始值为按钮的文字。该函数返回一个数组，数组的第一个成员是一个变量（上例是`buttonText`），指向状态的当前值。第二个成员是一个函数，用来更新状态，约定是`set`前缀加上状态的变量名（上例是`setButtonText`）。

### useContext()共享状态

在组件之间共享状态

现在有两个组件 Navbar和Messages，希望他们之间共享状态

```jsx
<div className="App">
  <Navbar />
  <Messages />
</div>
```

第一步 使用react Context API 在组件外部建立一个Context

```
const AppContext =React.createContext({});
```

组件封装代码如下

```jsx
<AppContext.Provider value={{username:'superawesome'}}>
      <div className="App">
      <Navbar />
      <Messages />
    </div>
</ AppContext.Provider >
```

上面代码中，`AppContext.Provider`提供了一个 Context 对象，这个对象可以被子组件共享

Navbar组价代码

```jsx
const Navbar=()=>{
	const {username}=useContext(AppContext);
	return(
		<div className="navbar">
			<p>AwesomeSite</p>
			<p>{username}</p>
		</div>
	)
}
```

上面代码中，`useContext()`钩子函数用来引入 Context 对象，从中获取`username`属性。

Message 组件的代码也类似。

```jsx
const Messages = () => {
  const { username } = useContext(AppContext)

  return (
    <div className="messages">
      <h1>Messages</h1>
      <p>1 message for {username}</p>
      <p className="message">useContext is awesome!</p>
    </div>
  )
}
```

### useReducer()action钩子

React 本身不提供状态管理功能，通常需要使用外部库。这方面最常用的库是 Redux。

Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，Reducer 函数的形式是`(state, action) => newState`。

`useReducers()`钩子用来引入 Reducer 功能。

```jsx
const [state,dispatch] =useReducer(reducer,initialState);
```

面是`useReducer()`的基本用法，它接受 Reducer 函数和状态的初始值作为参数，返回一个数组。数组的第一个成员是状态的当前值，第二个成员是发送 action 的`dispatch`函数。

例子：计数器

```jsx
const myReducer=(state,action)=>{
	switch(action.type){
      case('countUp'):
      	return {
          ...state,
          count:state.count+1
        }
    default:
      return state；
	
}
}
```

组件代码如下。

```jsx
function App() {
  const [state, dispatch] = useReducer(myReducer, { count:   0 });
  return  (
    <div className="App">
      <button onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
}
```

由于 Hooks 可以提供共享状态和 Reducer 函数，所以它在这些方面可以取代 Redux。但是，它没法提供中间件（middleware）和时间旅行（time travel），如果你需要这两个功能，还是要用 Redux

整体代码：

```jsx
import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const myReducer = (state, action) => {
  switch(action.type) {
    case('countUp'):
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(myReducer, { count: 0 })

  return (
    <div className="App">
      <button onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

## 创建自己的Hooks

```jsx

const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true); 
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId])

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return <div>
    <p>You're viewing: {person.name}</p>
    <p>Height: {person.height}</p>
    <p>Mass: {person.mass}</p>
  </div>
}
```

上面的Hooks代码可以封装起来，变成一个自定义的Hook，便于共享

```jsx
const usePerson=(personId){
	const [loading,setLoading]=useState(true);
  const [person,setPerson]=useState({});
  useEffect(()=>{
    	setLoading(true);
    fetch(`https://swapi.co/api/people/${personId}/`)
    .then(response=>response.json())
    .then(data=>{
      setPerson(data);
      setLoading(false);
    });
    
  },[personId]);
  return [loading,person]
}
```

上面代码中，`usePerson()`就是一个自定义的 Hook。

Person 组件就改用这个新的钩子，引入封装的逻辑

```jsx

const Person = ({ personId }) => {
  const [loading, person] = usePerson(personId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};
```





## useMemo和useCallback的区别

useMemo 返回的是函数的执行结果，是一个值
useCallback 返回的是函数的缓存，是一个函数
useCallback(fn, deps) 相当于 useMemo(() => fn, deps)





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

06写法

```js
 
//index.js
<Route path="/repos" component={Repos} />
 <Route path="/repos/:userName/:repoName" component={Repo} />
   
//modules/repos
      return <div>
            <h2>Repos</h2>
            <ul>
                <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
                <li><Link to="/repos/facebook/react">React</Link></li>
            </ul>
        </div>
//module/repo
 return <div>
            <h2>{this.props.params.repoName}</h2>
        </div>

```

结果：repos的导航链接被repo的内容替换

07写法

```js
//index.js
 <Route path="/repos" component={Repos} >
   <Route path="/repos/:userName/:repoName" component={Repo} />
 </Route>

//modules/repos
render(){
        return <div>
            <h2>Repos</h2>
            <ul>
                <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
                <li><Link to="/repos/facebook/react">React</Link></li>
            </ul>
            {this.props.children}
        </div>
    }
```

结果repos链接还在，在`repos {this.props.children}`的位置出现repo  

- `{this.props.children}` 和嵌套路由缺一不可





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

path属性可以使用通配符

```
<Route path:"/hello/:name">
//匹配 /hello/michael
//匹配 /hello/ryan

<Route path:"/hello(/:name)">
//匹配 /hello
//匹配 /hello/michael
//匹配 /hello/ryan

<Route path="/files/*.*">
//匹配 /files/hello.jpg
//匹配 /files/hello.html

<Route path="/files/*">
//匹配 /files/
//匹配 /files/a
//匹配 /files/a/b

<Route path="/**/*.jpg">
//匹配 /files/hello.jpg
//匹配 /files/path/tp/file.jpg

```

通配符的规则如下：

1. :paramName

   :paramName匹配URL的一部分，直到遇到下一个/ ? #为止。这个路径参数可以通过this.props.params.paramName取出

2. （）

   （）表示URL的这个部分是可选的

3. *

   *匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式

4. **

   **匹配任意字符，直到下一个/ ? #为止，匹配方式是贪婪模式

path属性也可以使用相对路径（不以/开头） 匹配时会相对于父组件的路径。嵌套路由如果想摆脱这个规则，可以使用绝对路径

路由匹配规则是从上到下执行，一旦发现匹配，就不再匹配其余的规则了

```
<Route path="/comments" ... />
<Route path="/comments" .../>
```

以上，路径`/comments`同时匹配两个规则，第二个规则不会生效

设置路径参数时，需要特别小心这一点。

```
<Router>
  <Route path="/:userName/:id" component={UserPage}/>
  <Route path="/about/me" component={About}/>
</Router>
```

上面代码中，用户访问`/about/me`时，不会触发第二个路由规则，因为它会匹配`/:userName/:id`这个规则。因此，带参数的路径一般要写在路由规则的底部。

此外，URL的查询字符串`/foo?bar=baz`，可以用`this.props.location.query.bar`获取。

## indexRoute组件

```
<Router>
  <Route path="/" component={App}>
    <Route path="accounts" component={Accounts}/>
    <Route path="statements" component={Statements}/>
  </Route>
</Router>
```

上面代码中，访问根路径`/`，不会加载任何子组件。也就是说，`App`组件的`this.props.children`，这时是`undefined`。

因此，通常会采用`{this.props.children || <Home/>}`这样的写法。这时，`Home`明明是`Accounts`和`Statements`的同级组件，却没有写在`Route`中。

`IndexRoute`就是解决这个问题，显式指定`Home`是根路由的子组件，即指定默认情况下加载的子组件。你可以把`IndexRoute`想象成某个路径的`index.html`。

```
<Router>
	<Route path="/" component={APP}>
      <IndexRoute component={Home} />
      <Route path="accounts" component={Account} />
      <Route path="statement" component={Statements}>
	</ Route>

</ Router>
```

现在用户访问 /的时候，加载的组件就结构如下

```
<App>
	<Home />
</App>
```

这种组件结构就很清晰了：`App`只包含下级组件的共有元素，本身的展示内容则由`Home`组件定义。这样有利于代码分离，也有利于使用React Router提供的各种API。

注意，`IndexRoute`组件没有路径参数`path`。

## Redirect 组件

用于路由跳转，即用户访问一个路由，会自动跳转到另一个路由

```
<Route path="inbox" component={Inbox}>
	<Redirect from="messages/:id" to="/message/:id"  / >
</Route>
```

现在访/inbox/messages/5,会跳转到/messages/5

必须使用绝对路径

## IndexRedirect组件

用于访问根路由时，将用户重定向到某个子组件

```
<Route path="/" component={APP}>
<IndexRedirect to="/welcome" />
<Route path="welcome" component={Welcome} />
<Route path="about" component={About} />
</Route>
```

上面的代码，用户访问根路径，将自动重定向到子组件welcome

## Link

用于取代<a>元素，生成链接，点击后跳转到另一个路由，<a>元素的react版本，可以接收Router的状态

```
render(){
	return <div>
		<ul role="nav">
			<li><Link to="/about">About</Link></li>
			<li><Link to="/Repos">Repos</Link></li>
		</ul>
	</div>
}
```

传参：

```
<Link to={`/user/${user.id`}>Mateus</Link>
```



设置路由样式 Link组件的activeStyle属性

```
<li><Link to="/about" activeStyle={{color:red}}>About</Link></li>
<li><Link to="/Repos" activeStyle={{color:red}}>Repos</Link></li>
```

链接会红色显示

指定路由的Class ，activeClassName属性

```
<li><Link to="/about" activeClassName="active" >About</Link></li>
<li><Link to="/Repos" activeClassName="active" >Repos</Link></li>
```

当前页面的链接的class会包含active

也可以包装Link， 将activeClassName自动附在每个链接上

```
// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
})

// modules/App.js
import NavLink from './NavLink'

// ...

<li><NavLink to="/about">About</NavLink></li>
<li><NavLink to="/repos">Repos</NavLink></li>
```



### Router组件之外，导航到路由页面

在Router组件之外，导航到路由页面，可以使用浏览器的History API

```
import {browserHistory} from 'react-router';
browserHistory.push('/some/path')
```

## IndexLink

如果链接到根路由/，不要使用Link组件，要使用IndexLink组件

因为，对于根路由来说，activeStyle和activeClassName会失效，或者说会总是生效，因为/会匹配任何子路由。

而IndexLink 组件会使用路径的精准匹配

```
<IndexLink to="/" activeClassName="active" >
	Home
</IndexLink>
```

上面代码中，根路由只会在精确匹配时，才具有`activeClassName`。

另一种方法是使用`Link`组件的`onlyActiveOnIndex`属性，也能达到同样效果。

```
<Link to="/" activeClassName="active" onlyActiveOnIndex={true}>
Home
</Link>
```

实际上，`IndexLink`就是对`Link`组件的`onlyActiveOnIndex`属性的包装

## history属性

`Router`组件的`history`属性，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供 React Router 匹配。

`history`属性，一共可以设置三种值。

- browserHistory
- hashHistory
- createMemoryHistory

如果设为hashHistory，将通过URL的hash部分（#）切换，URL形式类似于

`example.com/#/some/path`。

还会自动生成#后面的

`http://localhost:8080/#/?_k=x1n1ku`

```

import { hashHistory } from 'react-router'

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('app')
)
```

我们使用hashHistory——它使用url的哈希部分来管理路由历史。它有额外的垃圾来掩盖浏览器在使用真实url时固有的一些行为。我们稍后将更改为使用真正的url，并去掉无用的内容，但就目前而言，这工作得很好，因为它不需要任何服务器端配置。

这是有意为之的，它是 [createHashHistory](https://github.com/rackt/react-router/blob/master/docs/guides/basics/Histories.md#createhashhistory) 部分的内容（也是当你没有指定时，默认的 history 方法）。你可以在[这里](https://github.com/rackt/react-router/blob/master/docs/guides/basics/Histories.md#what-is-that-_kckuvup-junk-in-the-url)了解更多关于它的特性，详细的文档在[这里](https://rackt.github.io/history/stable/HashHistoryCaveats.html)。

Browser history 是使用 React Router 的应用推荐的 history。它使用浏览器中的 [History](https://developer.mozilla.org/en-US/docs/Web/API/History) API 用于处理 URL，创建一个像`example.com/some/path`这样真实的 URL 。

如果设为browserHistory，浏览器的路由就不再通过`Hash`完成了，而显示正常的路径`example.com/some/path`，背后调用的是浏览器的History API。

```
import { browserHistory } from 'react-router'

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
)
```

但是，这种情况需要对[服务器改造](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server)。否则用户直接向服务器请求某个子路由，会显示网页找不到的404错误。

如果开发服务器使用的是`webpack-dev-server`，加上`--history-api-fallback`参数就可以了。

```
webpack-dev-server --inline --content-base . --history-api-fallback
```

createMemoryHistory主要用于服务器渲染。它创建一个内存中的`history`对象，不与浏览器URL互动。

```
const history = createMemoryHistory(location)

```

## 表单处理

Link组件用于正常的用户点击跳转，但是表单跳转，点击按钮等操作要怎么和React Router对接

表单：

```
<form onSubmit={this.handleSubmit}>
  <input type="text" placeholder="userName"/>
  <input type="text" placeholder="repo"/>
  <button type="submit">Go</button>
</form>
```

方法一：browserHistory.push

```
import {browserHistory} from "react-router"

handleSubmit(event){
	event.preventDefault()
	const userName=event.target.element[0].value
	const repo=event.target.element[1].value
	const path=`/repos/${userName}/${repo}`
	browserHistory.push(path)
}

```

方法二：content对象

> ```javascript
> export default React.createClass({
> 
>   // ask for `router` from context
>   contextTypes: {
>     router: React.PropTypes.object
>   },
> 
>   handleSubmit(event) {
>     // ...
>     this.context.router.push(path)
>   },
> })
> ```

## 路由的钩子

每个路由都有Enter和Leave钩子，进入或离开路由时触发

```markup
<Route path="about" component={About} />
＜Route path="inbox" component={Inbox}>
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>
```

上面的代码中，如果用户离开`/messages/:id`，进入`/about`时，会依次触发以下的钩子。

- `/messages/:id`的`onLeave`
- `/inbox`的`onLeave`
- `/about`的`onEnter`

下面是一个例子，使用`onEnter`钩子替代`<Redirect>`组件。

```
<Route path="inbox" component={Inbox}>
  <Route
    path="messages/:id"
    onEnter={
      ({params}, replace) => replace(`/messages/${params.id}`)
    } 
  />
</Route>
```

`onEnter`钩子还可以用来做认证。

```
const requireAuth=(nextState,replace)=>{
	if(!auth.isAdmin()){
		replace({pathname:"/"})
	}
}

export const AdminRoutes=()=>{
	return(
		<Route path="/admin" component={Admin} onEnter={requireAuth} />
		)
}
```

下面是一个高级应用，当用户离开一个路径的时候，跳出一个提示框，要求用户确认是否离开。

```
const Home=withRoute(
	React.createClass({
		componentDidMount(){
			this.props.router.setRouteLeaveHook(
				this.props.route,
				this.routeWillLeave
			)
		},
		routeWillLeave(nextLocation){
	if (!this.state.isSave)
		return '确认离开？'
}
	})
)
```

上面代码中，`setRouteLeaveHook`方法为`Leave`钩子指定`routerWillLeave`函数。该方法如果返回`false`，将阻止路由的切换，否则就返回一个字符串，提示用户决定是否要切换。








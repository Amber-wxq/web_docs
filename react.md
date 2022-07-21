# React
声明式的JavaScript库；
## 组件：简短、独立的代码片段的组合
## 简单压缩js代码：
	npm init -y
	npm install terser		
	打包like_button.js
		npx terser -c -m -o like_button.min.js – like_button.js
## React+TS 项目创建方式
    1.npm 安装react
        npm i -d create-react-app
    2.初始携带ts的react项目
        npx create-react-app my-App --template typescript
## Create React App 创建一个React工程:
	npx create-react-app my-app
	cd my-app
	npm start
## jsx
### 变量声明：
		const element =<h1>hello world</h1>
### JSX 使用变量
			const name=’josh’
			const element =<h1>hello ,{name}</h1>	
	    大括号包裹任意有效js表达式 user.firstName 或formatName(user)都是有效的
	    例子：（调用 JavaScript 函数 formatName(user) 的结果，并将结果嵌入到 <li> 元素中。）
	        function formatName(user){
	            return user.firstName+' '+user.lastName;
	        }
	        const user={
	            firstName:'Harper',
	            lastName:'Perez'
	        }
	        const element=(
	            <h1>
	            hello,{formatName(user)}!
	            </h1>
	        );
	
	    将变量、内容包裹在小括号里，避免遇到自动插入分号的陷阱
	    JSX创建DOM的时候，所有节点要有唯一根元素进行包裹
	    JSX表达式会被转换为普通的js函数调用，并对其取值后得到js对象
	    所以可以JSX表达式使用在if 或for循环中 把JSX赋值给变量，JSX当做参数传入，以及函数中返回JSX
	        function getGreeting(user) { 
	            if(user){
	                return <h1>hello,{formatName(user)}</h1>
	            }
	            return <h1>hello,Stranger</h1>
	    即 JSX表达式整体 当做变量返回 
### JSX指定属性(""/{})
        使用引号 将属性值指定为字符串字面量
            const element =<a href='https://www.reactjs.org' >Link</a>
        使用大括号，属性值插入一个js表达式
            const element =<img src={user.avatarUrl}></img>;
        同一属性不能使用两种符号，要么引号（字面量） 要么大括号（js表达式）
### 关于命名 
        JSX更接近js而不是html，所以React DOM 使用小驼峰命名
### JSX指定子元素
        一个标签里没有内容，可以用/>闭合内容
            const element =<img src={user.avatarUrl} />
        JSX标签可以包括很多子元素(用小括号包裹)
            const element =(
                <div>
                    <h1>Hello!</h1>
                    <h2>Good to see you here.</h2>
                </div>
            )
### JSX防止注入攻击
        const title = response.potentiallyMaliciousInput;
        // 直接使用是安全的：
        const element = <h1>{title}</h1>;
        渲染输入内容前，默认转义，所有内容在渲染前被转换成了字符串 有效防止XSS 跨站脚本攻击
### JSX表示对象(element)
        Babel会把JSX转译成一个名为React.createElement()函数调用
            const element = (
                <h1 className="greeting">
                    Hello, world!
                </h1>
            );
            等效于
            const element=React.createElement(
                'h1',
                    //className用于指定css的class，适用于常规DOM节点和SVG元素
                {className:'greeting'},
                'hello world'
            );
                note:
                    //createElement() 
                        React.createElement(
                            type,
                            [props],
                            [...children]
                        )
                        创建并返回指定类型的React元素，
                        type:可以是标签名（div,span之类），也可是React组件（class组件或函数组件），或者是React fragment类型
                                        class组件或函数组件: 
                                                函数组件：
                                                    function Welcome(props) {
                                                        return <h1>hello {props.name}</h1>;
                                                    }
                                                    接收唯一带数据的props对象，并返回React参数 
                                                class组件：
                                                    用ES6的class定义组件
                                                    class Welcome extends React.Component {
                                                        render() {
                                                            return <h1>hello,{this.props.name}</h1>;
                                                        }
                                                    }
                                                    传参调用可以是 let a=new Welcome(props) 
                                                    extends 继承React.Component 
                                                    Welcome is a child of React.Component,可以调用render函数
                                        React fragment类型：
                                                React.Fragment组件可以在不额外创建DOM元素的情况下，让render（）方法返回多个元素
                                                    render() {
                                                        return (
                                                            <React.Fragment>
                                                                some text,
                                                                <h2>heading</h2>
                                                            </React.Fragment>
                                                        )
                                                    }
## React组件：
        有无状态，本质区别是有无state属性 ，class 创建的组件有自己的生命周期函数，function没有
        自定义组件，名称必须以大写字母开头
### 第一种：(无状态组件)function构造函数创建，内部没有state私有数据，只有props接收外界传过来的数据
        function item(props){
            return(
                <li className="item">{props.itemValue}</li>
            )
        }
        传值：
            <Item itemValue="todo3"/>
#### state 
        可以用useState,设定state   
        const [count,setCount] =useState(initialCount);  
        function Counter({initialCount}) {
            const [count, setCount] = useState(initialCount);
            return (
                <div>
                Count: {count}
                <button onClick={() => setCount(initialCount)}>Reset</button>
                <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
                <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
                </div>
            );
            }
        和class组件中的setState不同
            useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。
            setState(prevState => {
                // 也可以使用 Object.assign
                return {...prevState, ...updatedValues};
                });
### 第二种：(有状态组件)class创建子组件 内部除了有this.props这个只读属性，还有用于存放自己私有数据的this.state属性，可读可写       
        使用class创建类，通过extends关键字，继承React.Component之后，这个类，就是一个组件的模板了；
        引用的话，可以把类名以标签的形式，导入JSX中使用。
        在class实现的组件内部，必须定义一个render函数。在render函数中，必须return一个东西，如果没有什么需要被return的，则需要return null。
            例子：
                class Hello extends React.Component{
                    constructor(props) {
                        super(props);
                        this.state={
                            //固定写法 类似Vue的data(){return}
                            msg:"hello",
                            info: "Hello, world!"
                        };
                        }
                    render() {
                        return (
                            <div>Hello
                            <h3>这是使用class类制作的组件</h3>
                            </div>
                        )
                    }
                    
                }
        传值：
            <Hello name="wxq" />
            子组件调用 this.props.name 
    
        note:
            class 创建对象
                class Person{
                    constructor(name,age){
                        this.name = name;
                        this.age = age;
                    }
                    //实例方法，通过new出来的对象调用
                    say(){
                        console.log("ok")
                    }
                    static info=123;
                    //静态方法 方法前加上static关键字，表示该方法不会被实例继承，而是通过类来调用 
                    //调用：Person.sayHello();
                    static sayHello(){
                        console.log("静态方法“）
                    }
                }
            class实现JS中的继承
                class wxq extends Person{
                    constructor(name,age,color,language){
                        //当使用了extends关键字实现继承，子类的constructor构造函数中，必须显示调用super()方法，这个super表示父类中constructor的引用
                        //子类中要么不用constructor，要用了，constructor中必须加上super();
                        super(name,age);
                        this.color = color;
                        this.language = language;
                    }
                }
                不用constructor
                    class wxq extends Person{}
                    可以直接继承Person的constructor
### 渲染组件
    当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。
    四步：
        我们调用 ReactDOM.render() 函数，并传入 <Welcome name="Sara" /> 作为参数。
        React 调用 Welcome 组件，并将 {name: 'Sara'} 作为 props 传入。
        Welcome 组件将 <h1>Hello, Sara</h1> 元素作为返回值。
        React DOM 将 DOM 高效地更新为 <h1>Hello, Sara</h1>。
## 元素渲染
    <div id="root"></div>
    根节点，该节点所有内容由React DOM管理
    将一个React元素渲染到根DOM节点中，只需要把它们一起传入ReactDOM.render();
        例：
            const element = <h1>Hello</h1>;
            ReactDOM.render(element,document.getElementById("root"));
            //把element挂载到root根节点上
### 更新已渲染的元素
    React元素是不可变对象，一旦创建，无法更改它的子元素或属性，代表特定时刻的UI
    更新的唯一方式，创建一个全新元素，将其传入ReactDOM.render(）；
### React只更新它需要更新的部分

## Render Props
    在React组件间使用一个值为函数的prop共享代码的简单技术
    具有render prop组件接收一个返回react元素的函数，并在组件内部通过调用此函数来实现自己的渲染逻辑
        <DataProvider render={data =>(<h1>hello {data.target}</h1>)} />
    将一个组件封装的状态或行为共享给其他需要相同状态的组件
    render prop是一个用于告知组件需要渲染什么内容的函数prop
     1.本质是一个prop，用来父子组件之间传递数据用
     2.其次这个prop传递的值是一个函数
     3.它取名render props 因为它通常用来render某个元素或组件
###     例
        <DataProvider render={data=>（<h1> Hello {data.target}</h1> ）}>
        给子组件 <DataProvider> 传递了一个叫render的prop 这个prop是个函数，返回了一个h1元素
        function DataProvider(props){
            [data,setData]=useState({target:'world'})
            return props.render(data）
        }
        最终我们的DataProvider组件渲染的结果就是<h1>Hello World</h1>
### 例2
        <Mouse render={
            mouse=>(<Cat mouse={mouse} />) 
            }
             />
             行为：告知mouse位置
        例子：
            //猫猫组件
            function Cat(props){
                const mouse=props.mouse;
                return (
                    <img src="/cat.jpg" style={{position:'absolute',left:mouse.x,top:mouse.y }} />
                )
            }
            function Mouse(){
                [x,setX]=useState(0);
                [y,setY]=useState(0);
                const handleMouseMove=(e)=>{
                    setX(e.clientX);
                    setY(e.clientY);
                }   
                return (
                    <div style={{height:'100vh'}} onMouseMove={handleMouseMove}>
                    {props.render({x,y})}
                    <div />
                )
            }
            function MouseTracker(){
                return(
                    <div>
                    <h1>移动鼠标</h1>
                    <Mouse render={mouse=>(
                        <Cat mouse={mouse} />
                    )} />
                    </div>
                )
            }

## 高阶组件（HOC）
    组件复用组件逻辑的技巧
    高阶组件是，参数是组件，返回值是新组件，的函数
        const EnhancedComponent=hightOrderComponent(WrappedComponent);
    组件将props转换为UI，而高阶组件是将组件转化为另一个组件。
    HOC在react的第三方库中很常见，例如Redux的connect和Relay的createFragmentContainer
### 作用
    复用逻辑：
        加工组件，批量对原有组件进行加工，包装处理。根据业务需求定制化专属HOC
    强化Props：
        高阶组件返回的组件可以劫持上层传过来的props，然后混入新的props 增强组件功能
    赋能组件：
        给被HOC包裹的组件，提供扩展功能，比如额外的生命周期，额外的事件
    控制渲染：
        劫持渲染，在wrapComponent包装组件中，可以对原来的组件，进行条件渲染，节流渲染，懒加载等功能
### 使用
    用我们声明的高阶组件 包裹就行
### 编写
#### 强化props
#####    混入props：
    function functionHoc(WrapComponent){
        return function Index(props){
            const [state,setState]=useState({name:'wxq'})
            return <WrapComponent {...props} {...state}}>
        }
    }         

    function WrapComponent(props){
        const {name} =props;
        return <div>
                hello ,world,my name is {name}
                </div>
    }      

    子组件要定义一个接收父组件的参数 
    //高阶组件 state 传给了WrapComponent state中有name
    //子组件 要定义参数接收state中的name
#####    抽离state 控制更新：
        function functionHoc(WrapComponent){
            return function Index(){
                const [name, setName] =useState('wxq');
                const changeName=(name)=>{
                    setName(name);
                }
                return <WrapComponent {...props} **{...name} changeName={changeName}** } />
                // functionHoc高阶组件给子组件 添加的新属性和方法  
            }
        }

        function Index(props){
            //子组件函数要定义 props参数 接收
            const [ value ,setValue ] = useState(null)
            const { name ,changeName } = props
            //子组件接收高阶组件给的方法和属性
            return <div>
                <div>   hello,world , my name is { name }</div>
                改变name <input onChange={ (e)=> setValue(e.target.value)  }  />
                <button onClick={ ()=>  changeName(value) }  >确定</button>
            </div>
                }

            export default functionHoc(Index)
#### 控制渲染
##### 动态渲染
    不能在内部操控组件渲染状态，但是可以在外层控制当前组件是否渲染 应用于权限隔离 懒加载 延时加载
        function renderHoc(WrapComponent){
            return function Index(props){
                const [visible,setVisible]=useState(true);
                const setVisibility=()=>{
                    setVisible({visible:!visible})
                }
                return <div className="box">
                <button onClick={() =>setVisibility()} >挂载组件 </button>
                {visible?<WrapComponent {...props} setVisibility={setVisibility} />:<div className="icon"><SyncOutlined spin  className="theicon"  /></div>}
                </div>
            }
        }    
        function Index(props){
            const {setVisibility}=props;
             return <div className="box" >
                <p>hello,my name is alien</p>
                <img  src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=294206908,2427609994&fm=26&gp=0.jpg'   /> 
                <button onClick={() => setVisible()}  > 卸载当前组件 </button>
            </div>
            }
        }
        export default renderHoc(Index);





### 应用
    假设有个CommentList组件，订阅外部数据源，用来渲染评论列表；
    又有个订阅单个博客帖子的组件BlogPost，遵循类似模式：
    在DataSource上调用不同的方法，渲染不同的结果，但大部分的实现一样：
        在挂载时，向DataSource添加一个更改侦听器
        在侦听器内部，当数据源发生变化，调用setState
        在卸载时，删除侦听器
    这种逻辑许多组件共享。
    对于订阅了DataSource的组件，比如CommentList和BlogPost，可以编写一个创建组件函数，该函数将接受一个子组件作为他的其中一个参数，该子组件将订阅数据作为prop。让我们调用函数withSubscription:
        例：
            const CommentListWithSubscription=withSubscription(CommentList,
            (DataSource)=>DataSource.getComments());

            const BlogPostWithSubscription=withSubscription(BlogPost,
            (DataSource,props)=>DataSource.getBlogPost(props.id));
        第一个参数是被包装组件，第二个参数通过DataSource和当前的props返回我们需要的数据；

        当渲染CommentListWithSubscription和BlogPostWithSubscription时，CommentList和BlogPost将传递一个data prop，其中包含DataSource检索到的最新数据
          
            function withSubscription(WrappedComponent,selectData){
                return ()={
                    const [data,setData] = useState(selectData(DataSource,props));
                useEffect(()=>{
                    DataSource.addChangeListener(handleChange);
                },[]);
                useEffect(()=>{
                    DataSource.removeChangeListener(handleChange);
                });
                const handleChange=()=>{
                    setData(selectData(DataSource,props));
                }
                return <WrappedComponent data={data} {...props} />
                }
                
            }

### 注意
    HOC不会修改传入的组件，也不会使用继承来复制其行为；
    HOC通过将组件包装在容器组件中来组成新组件，HOC是纯函数，没有副作用
    被包装组件接收来自容器组件的所有prop，同时也接收一个新的用于render的data prop

    注意不要试图在HOC中修改组件原型，通过使用组合的方式，将组件包装在容器组件中能够实现功能
        
        function logProps(WrappedComponent){
         return ()=>{
            useEffect((prevProps)=>{
                log(props);
                log(prevProps);
            return <WrappedComponent {...this.props} />    
         }   
     
        }
        HOC和容器组件模式相似，容器组件担任将高级和低级关注点分离的责任，由容器管理订阅和状态，将prop传递给处理UI的组件。
### 将不相干的props传递给被包裹的组件
    HOC为组件添加特性，自身不应该大幅改变约定.HOC返回的组件与原组件应保持类似的接口
    HOC应该透传与自身无关的props。
    HOC大多数都应该包含类似下面的render方法
        render() {
            const {etraProp,passThroughProps} = this.props;
            const injectedProp=someStateOrInstanceMethod;
            return (
                <WrappedComponent injectedProp={injectedProp} {...passThroughProps} />
            );
            }
### 约定：最大化可组合性
    并不是所有HOC都一样，有时候仅接收一个参数，即被包裹的组件
        const NavbarWithRouter =withRoute(Navbar);
    HOC通常可以接受多个参数，比如在Relay中，HOC额外接收了一个配置对象用于指定组件的数据依赖
        const CommentWithRelay=Relay.createContainer(Comment,config);
    最常见的HOC签名如下：
        // React Redux 的 `connect` 函数
        const ConnectComment=connect(commentSelector,commentActions)(CommentList);
        拆开：  
            // connect 是一个函数，它的返回值为另外一个函数。
            const enhance=connect(commentListSelector,commentListActions);
            // 返回值为 HOC，它会返回已经连接 Redux store 的组件
            const ConnectComment=enhance(CommentList);
        connect就是一个返回高阶组件的高阶函数。

    像connect函数返回的单参数HOC具有签名Component=>Component。输入输出类型相同的函数很容易组合在一起
        //不推荐写法
        const EnhancedComponent=withRouter(connect(commentSelector)(WrappedComponent))

        //建议写法
            //编写组合工具函数
            //compose(f,g,h) 等同于（...args）=>f(g(h(...args)))  lodash 的flowRight
        const enhance=compose(withRouter,connect(commentSelector))
        const EnhancedComponent=enhance(WrappedComponent)
### 约定：包装显示名称以便轻松调试
    HOC创建的容器会和其他组件一样，显示在React Developer Tools .为了方便调试，选择一个显示名称
    最常见的是用HOC包住被包装组件的显示名称
        比如：
            高阶组件名：WithSubscription
            被包装组件：CommentList
            显示：WithSubscription（CommentList)
        function withSubscription(WrappedComponent) {
            class WithSubscription extends React.Component {/* ... */}
            WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
            return WithSubscription;
        }

        function getDisplayName(WrappedComponent) {
            return WrappedComponent.displayName || WrappedComponent.name || 'Component';
        }
### 注意事项
    不要在render中使用HOC
    务必复制静态方法
        当你将 HOC 应用于组件时，原始组件将使用容器组件进行包装。这意味着新组件没有原始组件的任何静态方法。
        为了解决这个问题，你可以在返回之前把这些方法拷贝到容器组件上：
            function enhance(WrappedComponent) {
                class Enhance extends React.Component {/*...*/}
                // 必须准确知道应该拷贝哪些方法 :(
                Enhance.staticMethod = WrappedComponent.staticMethod;
                return Enhance;
            }
        但要这样做，你需要知道哪些方法应该被拷贝。你可以使用 hoist-non-react-statics 自动拷贝所有非 React 静态方法:
           import hoistNonReactStatic from 'hoist-non-react-statics';
            function enhance(WrappedComponent) {
                class Enhance extends React.Component {/*...*/}
                hoistNonReactStatic(Enhance, WrappedComponent);
                return Enhance;
            } 
        除了导出组件，另一个可行的方案是再额外导出这个静态方法。
             // 使用这种方式代替...
                MyComponent.someFunction = someFunction;
                export default MyComponent;

                // ...单独导出该方法...
                export { someFunction };

                // ...并在要使用的组件中，import 它们
                import MyComponent, { someFunction } from './MyComponent.js'; 
    Refs不会被传递
          因为 ref 实际上并不是一个 prop - 就像 key 一样，它是由 React 专门处理的。如果将 ref 添加到 HOC 的返回组件中，则 ref 引用指向容器组件，而不是被包装组件。


## 表单
### 受控组件
    表单元素自己维护state，react中可变状态保存在组件的state属性中，通过setState()来更新。
    结合两者，使React的state成为唯一的数据源。
    渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。
####    例子：
        <form onSubmit={this.handleSubmit}>
            <label>
            名字:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="提交" />
        </form>
        
        handleChange=(e)=>{
            this.setState(
                (state)=>{
                    return {addDeadline: e.target.value}
                }
                )
        }
            handleSubmit=(event) =>{
                    alert('提交的名字: ' + this.state.value);
                    event.preventDefault();
                }
## setState
    setState(updater,callback)
    setState() 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。
    setState不是立即更新组建，会批量推迟更新，即调用setState后立即读取this.state，可能没有更改
        所以可以使用componentDidUpdate 或者 setState 的回调函数，componentDidUpdate 或者 setState 的回调函数
    参数：
        参数一为带有形式参数的 updater 函数：
            （state,props）=>stateChange
            state是全一个状态，props是应用更新是的props
        参数二是一个回调函数，在setState() 的异步操作结束并且组件已经重新渲染的时候执行，
            可以通过这个回调来拿到更新的state的值。
###  组件更新渲染：
    修改state 要通过setState，否则组件不会更新，直接赋值，或者state push 都不会重新渲染组件
    关于数组添加：
        1、深拷贝一个state中的数组
        2、对于拷贝出来的数组，进行添加修改
        3.通过setState，对于数组整体赋值（用回调函数）
        let fitems1=_.cloneDeep(this.state.items1);
            fitems1.push(itemArr);
            console.log('fitems1',fitems1);
            this.setState(
                (state)=>{
                return {items1: fitems1}  
                }
            
            )        

## ts中加载lodash
    安装：
        npm i lodash -d
        npm i -d @types/lodash
    使用：
        tsconfig.json中开启
            “esModuleInterop":true
        直接引用
            import _ from "lodash"   
        或者：
            如果没有启用 esModuleInterop，则可以这样引用：
            import * as _ from 'lodash'


## state
### 定义在constructor中
class wxq extends React.Component{
constructor(props){
  super(props);
  this.state={
  name:'wxq',
  age:'18'
  }
}
}
### 修改state
用setState()
this.setState({name:'hh'})
state可能是异步，无法根据他们的值更新下一个状态，所以要让setState()接收一个函数而不是一个对象
this.setState(
state=>{
  counter=state.counter
}
)
### 函数声明组件时的state
#### 使用useState hook
    定义：
    ```javascript
        const [count, setCount]=useState(0)
        const [state参量，修改函数]=useState(初始值）
    使用：
        setCount(count)
        setCount(修改值）

## 事件处理
### 显式使用preventDefault
<a href="#" onClick={handleClick} >clickme</a>
    function handleClick(e){
    e.preventDefault();
    console.log('hi')
    }
    JS中，class的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。

#### this指向解决方法
1.在constructor里bind绑定
  this.handle=this.handle.bind(this);
2.class fields(create React App默认使用 建议使用)
  函数用箭头函数表示
  handle=()=>{
  console.log('hi')
  }
  <button onClick={this.handleClick}>
  Click me
</button>
3.在回调里使用箭头函数
  handle(){
  console.log('hi')
  }
  <button onClick={()=>this.handle()}>
  Click me
</button>

### 向事件处理程序传递参数
    onClick={()=>deleteItem(index)}
## Hook使用了js闭包机制 
## Hook规则
    本质是js函数
    两条规则
        1.只在最顶层使用Hook
            不要在循环，条件或嵌套函数中调用Hook，在react函数的最顶层挥着return之前调用。
            确保hook在每一次渲染都按照同样的顺序被调用
        2.只在React函数中调用Hook
            不要在普通的 JavaScript 函数中调用 Hook。你可以：
                ✅ 在 React 的函数组件中调用 Hook
                ✅ 在自定义 Hook 中调用其他 hook 
## 自定义Hook
    通过自定义Hook，可以将组件逻辑提取到可重用的函数中
    共享逻辑
    两种流行方式共享组件之间的状态逻辑：render props和高阶组件
    Hook如何在不增加组件的情况下解决相同的问题
### 提取自定义Hook
    想在两个函数之间共享逻辑时，会把它提取到地撒个函数中。组件和Hook都是函数，同样适用
    自定义Hook是一个函数，名称以“use”开头，函数内部可以调用其他Hook
    例：    useFriendStatus
            function useFriendStatus(friendID){
                const [isOnline,setIsOnline] = useState(null);
                useEffect(()=>{
                    function handleStatusChange(state){
                        setIsOnline(status.isOnline);
                    }
                    ChatAPI.subscribeToFriendStatus(friendID,handleStatusChange);
                    return ()=>{
                        ChatAPI.unsubscribeFromFriendStatus(friendID,handleStatusChange);
                    };
                });
                return isOnline
            }
        确保只在自定义Hook的顶层无条件调用其他 Hook。
        自定义Hook和自定义组件不同：
            Hook可以决定他的参数是什么，以及它应该返回什么。但是他的名字要以use开头
            自定义组件参数只能是props，返回JSX；
        此处的useFriendStatus的Hook目的是订阅某个好友在线状态，所以要friendID作为参数，并返回这位好友的在线状态
            function useFriendStatus(friendID){
                const [isOnline,setIsOnline] = useState(null);
                ...
                return isOnline;
            }
### 使用自定义Hook
    开始的目标是在FriendStatus和FriendListItem组件中去除重复逻辑
        即：两个组件都想知道好友是否在线
    使用：
    ```javascript
        function FriendStatus(props){

            const isOnline = useFirstOnlineState(props.friend.id);

            if(isOnline===null){
                return 'loading...';
                }
            return isOnline ? 'online' : 'offline';
        }
        function FriendStatus(props){

            const isOnline = useFirstOnlineState(props.friend.id);

            return (
                
                <li style={{"color:isOnline ? 'green' : 'black'}}>
                {props.friend.name}
                </li>
                );
        
        }
    ```
    两个组件使用相同的Hook不会共享state
### 在多个Hook间传递信息
    由于 useState 为我们提供了 recipientID 状态变量的最新值，因此我们可以将它作为参数传递给自定义的 useFriendStatus Hook：
    const [recipientID,setRecipientID]=useState(1);
    const isRecipientOnline=useFriendStatus(recipientID);
### 自定义Hook的常见场景
    表单处理，动画，订阅声明，计时器
## useReducer hook
    const [state,dispatch]=useReducer(reducer,initialArg,init)
    useState的替代方案，接收一个形如 （state，action）=> newState 的reducer，并返回当前的state以及其配套的dispatch
    在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。
## useMemo hook
    const memoizedValue = useMemo(()=>computeExpensiveValue(a,b),[a,b])
    返回一个memoized值
    把创建函数和依赖项数组作为参数传入useMemo。
    它仅会在某个依赖项改变时，才重新计算memoized的值。
    传入useMemo的函数会在渲染器件执行，
    如果没有提供依赖项，useMemo在每次渲染时都会计算新的值
    const value=useMemo(计算函数，依赖项)；
        初次渲染，useMemo调用计算函数，计算结果传给value
        下一次渲染依赖项没有便，useMemo不调用计算函数，但返回及记忆值
        重新渲染过程，依赖关系发生变化，useMemo调用计算函数，记住新值，返回它

## useEffect hook
    数据获取，设置订阅及手动更改React组件中的DOM都属于副作用，可以看做componentDidUpdate componentDidMount componentWillUnmount 三个函数的组合
    两种常见副作用操作：
        需要清除的和不需要清除的
    React 将按照 effect 声明的顺序依次调用组件中的每一个 effect。


### 无需清除的effect
    只想react更新DOM之后运行一些额外的代码，比如发送网络请求手动变更DOM，记录日志之类
    useEffect(function)
    用这个可以告诉react组件需要在渲染后执行某些操作，react会保存你传递的函数（称之为effect），并在执行DOM更新之后调用。
    为什么在组件内部调用useEffect？
        放在内部可以在effect中直接访问state变量（或其他props)    
    默认每次渲染之后都会执行,可以在effect获取最新的state变量值。
### 用useEffect模拟生命周期
    挂载时，模拟componentDidMount
        useEffect(()=>{
            log("Success")
        },[]);
        //第二个参数表示在什么时候执行
        //[]表示在第一次渲染的时候执行
    更新时，模拟componentDidUpdate
        useEffect(()=>{
            log("n变了")
        },[n]);
        //想在n 更新的时候去更新
        //[]里面写了什么，那就是那个东西变了就去执行
    销毁时，模拟componentWillUnmount
        useEffect(()=>{
           return ()=>{log("child销毁了")};
        });
        //返回一个函数
## useContext hook
    定义：
        const value=useContext(MyContext);
        接收一个context对象，（用 React.createContext(defaultValue)创建的对象）
        并返回该content的当前值，当前值由最近的MyContext.Provider的value决定
        Provider更新时，HOOK会触发重新渲染，并使用最新的值；
        
        useContext组件会在context值变化时重新渲染；
            别忘记 useContext 的参数必须是 context 对象本身：
                正确： useContext(MyContext)
                错误： useContext(MyContext.Consumer)
                错误： useContext(MyContext.Provider)
    useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。           
    useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。
    例子：
            const themes = {
                    light: {
                        foreground: "#000000",
                        background: "#eeeeee"
                    },
                    dark: {
                        foreground: "#ffffff",
                        background: "#222222"
                    }
                    };

            const ThemeContext = React.createContext(themes.light);

            function App() {
                return (
                    <ThemeContext.Provider value={themes.dark}>
                    <Toolbar />
                    </ThemeContext.Provider>
                );
            }

            function Toolbar(props) {
                return (
                    <div>
                    <ThemedButton />
                    </div>
                );
            }

            function ThemedButton() {
                const theme = useContext(ThemeContext);
                return (
                    <button style={{ background: theme.background, color: theme.foreground }}>
                    I am styled by theme context!
                    </button>
                );
            }
### Context
    提供了一个无需为每层组件手动添加props，就能在组件树间进行数据传递的方法
    在组件之间共享指定方式，不必显式通过组件树的逐层传递props
####    React.createContext(defaultValue)
        const Mycontext=React.createContext(defaultValue);

        这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
        只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效.
####   Context.Provider
        <MyContext.Provider value={/* 某个值 */}>
                <子组件>
        </MyContext.Provider>

        Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
        export const { Provider, Consumer } = createContext() 可以这么导出容器
        定义数据content：
              getContext = () => {
                    const { fruit, count } = this.state
                    return {
                    fruit,
                    countUtil: {
                        addCount: num => {
                        this.setState({
                            count: count + num,
                        })
                        },
                        delCount: num => {
                        this.setState({
                            count: count - num,
                        })
                        },
                    },
                    }
                }

        父组件给值：
            <Provider value={/* 某个值,可以是方法 */}>   getContext()返回一个{}
            
            <Provider value={getContext()}>
                <son / >  //子组件
            </Provider>
####   Context.Consumer     
        <MyContext.Consumer  >
               {value=>(组件-基于value)}
        </MyContext.Consumer >

    //用函数接收context
        {context=>(
                            <div>
                                {context.fruit}
                            </div>
                        
                        )}
        子组件拿值
            function son(){
                return (
                    <Consumer>  //<MyContext.Consumer>
                    //用函数接收context
                        {context=>(
                            <div>
                                {context.fruit}
                            </div>
                        
                        )}
                    </Consumer>
                )
            }
####    何时使用：
     对一个组件树而已是全局的数据，进行共享。例如当前认证的用户、主题或首选语言
     例子：
        props传递：
            function App(){
                return (<Toolbar theme="dark />)
            }
            function Toolbar(props){
                return (
                    <div>
                    <ThemedButton theme={props.theme}>
                    </div>
                )
            }
            function ThemedButton(props){
                return <button theme={props.theme} />
            }
        context：
            为theme创建一个context
            const ThemeContext=React.createContext('light');
            function App(){

                return (   
                            <ThemeContext.Provider value='dark'>
                                <Toolbar />
                            </ThemeContext.Provider>
                            )
            }
            //中间组件不必指明往下传递theme了
            function Toolbar(){
                return (
                    <div>
                    <ThemedButton />
                    </div>
                    )
            }
            function ThemedButton(){
                
                //指定contextType 读取当前theme Context
                //React会往上找最近的theme Provider，然后使用它的值
                
                return <button theme={this.context} />
                return (
                    <ThemeContext.Consumer>
                        {value=>(<button theme={value}>)}
                    </ThemeContext.Consumer>
                )
                
            }


# TS
##  解决类型“string | null”的参数不能赋给类型“string”的参数。 不能将类型“null”分配给类型“string” ts
    item:string=value||''
# 数据模型设计
```typescript
纯数据的设计，结合视图，可以放到vuex或者redux中
//联合类型
type TDeadline = number | string;

interface ITodo {
    isChecked: boolean;
    desc: string;
    deadline: TDeadline;
    methods: {
        toggleChecked: () => boolean;
        updateDesc: (newDesc: string) => void;
        updateDeadline: (newDeadline?: TDeadline) => void;
    }
}

interface ITodoList {
    list: ITodo[];
inputVal: string;
deadlineVal: TDeadline;
methods: {
    deleteTodo: () => void;
    addTodo()
}
}

function createTodoModel(desc: string, deadline: TDeadline): ITodo {
return {
        isChecked: false,
    desc,
    deadline,
    methods: {
        toggleChecked() {
        this.isChecked = !this.isChecked;
        EventEmitter.emit()
    }
    }
};
}
```
## 数据模型应用
    1.创建/定义类型
    2、创建context 
        export const CooperationContext = createContext<Props>(null);
    3.定义context高阶组件
        定义state 方法
    4.托传出去
        useMemo 

##   出错
   
###  React Hook "useState" is called in function "item" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use".
    原因：组件名称要大写开头
    function item(props:ItemProp):JSX.Element
    改为Item 解决

##  export 的问题

export default{
    createTodoListModel,createTodoModel
};
会导致不能解构导入，要去掉default（default 默认整合一起了）
import {createTodoModel,createTodoListModel } from '../module'


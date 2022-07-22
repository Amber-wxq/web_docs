# Redux
js的状态容器，可以和react一起用。
Redux是一个使用“action”的事件来管理和更新应用状态的模型和工具库，以集中式Store的方式对整个应用中使用的状态进行集中管理，其规则确保状态只能以可以预测的方式更新
安装：
Redux Toolkit
官方推荐的编写逻辑，包含了Redux核心，并包含了构建Redux必不可少的软件包和功能
简化了配置store 创建reducer 编写immutable更新逻辑 
    
     npm install @reduxjs/toolkit

创建一个react Redux应用

    npx create-react-app my-app --template redux

Redux核心库

    npm install redux

React-Redux

    可以让React组件访问state和下发action更新store
- 适用场景：
- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据
多交互，多数据源
组件角度：
- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

action: 是个通知，携带信息。
dispatch：view派发action
reducer:接收action,计算state新值

## 术语
### state管理
    function Counter() {
        // State: a counter value
        const [counter, setCounter] = useState(0)
    
        // Action: 当事件发生后，触发状态更新的代码
        const increment = () => {
            setCounter(prevCounter => prevCounter + 1)
        }
    
        // View: UI 定义
        return (
            <div>
            Value: {counter} <button onClick={increment}>Increment</button>
            </div>
        )
        }
state:驱动应用的真实数据源头
view: 基于当前状态的UI声明性描述
actions：根据用户输入在应用程序中发火说呢过的事情，出发状态更新

####    单项数据流：
- 用state描述应用在特定时间点的状态
- 基于state渲染视图
- 发生事件，state更新，生成新state
- 新state重新渲染view
### 不可变式方法更新
代码复制原来的object/array 更新它的复制体
Redux希望所有状态更新都是不可变方式

### action 
具有type字段的普通js对象，action可以视为描述应用程序中发生了什么事情；

type 字符串，给action一个描述性名字，比如“todos/todoAdded”  “域/事件名称” action所属的特征或类别/发生的具体事情；

action对象还可以有其他字段，包含有关发生的事情的附加信息，信息放在名为payload的字段中；
    例：
        const addTodoAction={
            type:"todos/todoAdded",
            payload:'Buy milk'
        }
### action creator
创建并返回一个action对象的函数，作用是不必每次都手写编写action对象；

​    const addTodo=text=>{
​        return{
​            type:"todos/todoAdded",
​            payload:text
​        }
​    }

### reducer
函数，接收当前state和一个action对象，必要时决定如何更新状态，并返回新状态

    （state，action）=>newState 
可以视为事件监听器，根据接收到的action类型处理事件
规则：

    仅使用state和action参数计算新的状态值
    禁止修改state，必须通过赋值现有的state并对复制的值进行更改的方式来做 **不可变更新**
    禁止任何异步逻辑、依赖随机值或者其他副作用的代码
内部逻辑：

    检查reducer是否关心这个action
        是=》复制state，使用新值更新state副本，返回新state
    否=》返回原来的state不变
    
        例：
            const initialState={value:0}
    
            function counterReducer(state=initialState,action){
                if(state.type =='counter/increment'){
                    //是
                    return {
                        //复制state
                        ...state,
                        //使用新值更新state副本
                        value:state.value+1
                    }
                }
                return state
    
            }
### store
Redux应用的状态存在于一个名叫store的对象中
store通过传入一个reducer来创建的，并且有一个名为getState的方法，返回当前状态
        
        inport {configureState} from '@reduxjs/toolkit'
    
        const store=configureStore({reducer:counterReducer})
        log(store.getState())
        /// {value: 0}
### dispatch
更新state的唯一方法，调用store.dispatch()并传入一个action对象，
store将执行所以reducer函数并计算出更新的state，调用getState（）可以获取新state

        store.dispatch({type:'counter/increment'})
        log(store.getState())
        /// {value:1}

通常调用action creator 来调用action

        const increment=()=>{
            return {
                type:'counter/increment
            }
        }
        store.dispatch(increment())
        log(store.getState());
        /// {value:2}
### selector
可以从store状态树中提取指定片段，随着应用变大，会遇到用于程序的不同部分需要读取相同的数据
selector可以避免重复这样的读取逻辑

    const selectCounterValue =state=>state.value;
    ​const currentValue=selectCounterValue(store.getState());
    ​log(store.getState());
    ​//2

### Redux数据流
初次启动：

-    使用最顶层的root reducer函数创建Redux store
-    store调用一次root reducer，并将返回值保存为他的初始state
-    当UI首次渲染时，UI组件访问Redux store ，并使用该数据来决定要呈现的内容，同时监听store的更新，以便他们可以知道state是否已经更改

更新环节：

-    应用程序中发生了某些事情，例如用户单击按钮
-    dispatch一个action到Redux store 例如dispatch（{type: "counter/increment"}）
-    store用之前的state和当前的action再次运行reducer函数，并将返回值保存为新的state
-    store通知所有订阅过的ui，通知他们store发生更新
-    每个订阅过得UI组价检查他们需要的state部分是否被更新
-    发现数据更新的组件将强制使用新数据重新渲染，更新网页
## 应用结构
store的配置：

        import { configureStore } from '@reduxjs/toolkit'
        //导出一个reducer函数 作为监视器
        import usersReducer from '../features/users/usersSlice'
        import postsReducer from '../features/posts/postsSlice'
        import commentsReducer from '../features/comments/commentsSlice'
    
        export default configureStore({
        reducer: {
            //表示希望在Redux状态对象中有一个state.counter部分，并且希望counterReducer函数负责决定是否以及如何在dispatch action时更新state.counter部分
            users: usersReducer,
            posts: postsReducer,
            comments: commentsReducer
        }
        })
例子中，state.users，state.posts，和 state.comments 均是 Redux state 的一个切片“slice”。由于 usersReducer 负责更新 state.users 切片，我们将其称为“slice reducer”函数。

reducer构造：

        import { createSlice } from "@reduxjs/toolkit";
        //createSlice函数 负责生成action类型字符串 action creator函数和action对象的工作
            //只要定义一个名称，编写一个包含 reducer 函数的对象
        export const counterSlice=createSlice({
            name: 'counter',
            initialState:{
                value:0
            },
            reducers:{
                increment:state=>{
                    state.value+=1;
                },
                decrement:state=>{
                    state.value-=1;
                },
                incrementByAmount:(state,action)=>{
                    state.value+=action.payload;
                }
            }
        })
        export const {increment,decrement,incrementByAmount}=counterSlice.actions
        export default counterSlice.reducer
### createSlice 
您所要做的就是为这个切片定义一个名称，编写一个包含 reducer 函数的对象，它会自动生成相应的 action 代码

createSlice函数接收初始状态initialState,包含reducer函数的对象，切片名称；自动生成action creators和action types 

name 选项的字符串用作每个 action 类型的第一部分，每个 reducer 函数的键名用作第二部分。

因此，"counter" 名称 + "increment" reducer 函数生成了一个 action 类型 {type: "counter/increment"}。
**createSlice** 会自动生成与我们编写的 reducer 函数同名的 action creator。我们可以通过调用其中一个来检查它并查看它返回的内容：


            log(counterSlice.action.increment())
            //{type: "counter/increment"}

它还生成知道如何响应所有这些 action 类型的 slice reducer 函数：

            const newState=counterSlice.reducer(
                {value:10},  //state
                counterSlice.actions.increment()  //action
            )
            log(newState)
            //{value:11}
Reducer的规则
- 仅使用state和action参数计算新的状态值
- 禁止直接修改state。必须通过复制现有的state并对复制的值进行更改的方式做不可变更新
- 禁止任何异步逻辑、依赖随机值或导致其他“副作用”的代码

不能在 Redux 中更改 state 有几个原因：

- 它会导致 bug，例如 UI 未正确更新以显示最新值
- 更难理解状态更新的原因和方式
- 编写测试变得更加困难
- 它打破了正确使用“时间旅行调试”的能力
- 它违背了 Redux 的预期精神和使用模式

改变
    return {
        ...state,
        value:123
     }
**手动编写不可变更新很难记住，所以用createSlice**

    function handwrittenReducer(state,action) {
        return {
            ...state,
            first: {
                ...state.first,
                second: {
                    ...state.first.second,
                    [action.someId]:{
                        ...state.first.second[action.someId],
                        fourth:action.someValue
                    }
                }
            }
        }
变体为：

    function reducerWithImmer(state,action){
        state.first.second[action.someId].fourth = action.someValue
    }
## 用 Thunk 编写异步逻辑
thunk是一个特定类型的Redux函数，异步逻辑
一个内部 thunk 函数，它以 dispatch 和 getState 作为参数
外部创建者函数，它创建并返回 thunk 函数

需要AJAX调用以从服务器回去数据时，可以将调用放到thunk中

    const fetchUserById = userId=>{
        return async (dispatch,getState)=>{
            try{
                const user = await userAPI.fetchById(userId)
                dispatch(userLoaded(user))
                }catch(e){
                    }
            }
        }
    }

## 阮一峰教程

redux设计思想：

​	web应用是一个状态机，视图与状态时一一对应的

​	所有的状态，保存在一个对象里面

### 基本概念

#### Store 

保存数据的地方，整个应用只能有一个

提供createStore函数，生成Store

    import { createStore } from "redux";
    const store = createStore(fn);

createStore函数接收另一个函数作为参数，返回新生成的Store对象

#### State 
Store对象包含所有数据。如果想得到某个时点的数据，就要对Store生成快照。这种时点的数据集合，就叫做State

当前时刻的State，可以通过store.getState()拿到

    import {createStore} from 'redux'
    const store = createStore(fn);
    const state = store.getState();

Redux规定，一个State对应一个View。只要State相同，View就相同。知道State啥样，View就啥样。反之亦然

#### Action
State变化就会导致View变化。但是用户只能接触View。所以State的变化必须时View导致的。action就是View发出的通知，表示State要发生变化了

Action是一个对象。type属性必须，表示名称。其他可以自由设置。

参考案例：

    const action={
        type: "ADD_TODO",  
        payload: 'Learn Redux'
    }

Action名称是ADD_TODO,携带的信息是字符串 Learn Redux

Action描述当前发生的事情，唯一改变State的方法。会运送数据到Store。

#### Action Creator

view要发多少种消息，就会有多少种Action，都手写很麻烦，定义一个函数生成Action——Action Creator

    const ADD_TODO='添加 TODO';
    
    function addTodo(text){
        return {
            type:' ADD_TODO',
            text: text
        }
    }
    
    const action=addTodo('Learn Redux')

addTodo函数就是一个Action Creator。

#### store.dispatch()
View发出action的唯一方法；

    import {createStore} from 'redux';
    const store=createStore(fn);
    store.dispatch({
        type: 'ADD_TODO',
        payload:'Learn Redux'
    });

store.dispatch接收一个Action对象作为参数发生出去。

结合Action Creator，代码改写为：

    store.dispatch(addTodo('Learn Redux'));

#### Reducer

Store收到Action以后，必须给出一个新的State，这样View才会发生变化，这种State 的计算过程就叫Reducer

一个函数，接收Action和当前State作为参数，返回一个新State。

    const reducer = function (state, action) {
        //...
        return new_state;
        };

整个应用的初始状态，可以作为State的默认值。

    const default_state =0;
    const reducer = function (state=default_state , action)=>{
        switch (action.type) {
            case 'ADD':
                return state + action.payload;
            default:
                return state;
                }
    }
    const state=reducer(1,{
        type: 'ADD',
        payload:2
    });

reducer函数收到名为ADD的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。

实际，Reducer函数不用像上面手动调用，store.dispatch自动触发Reducer。

因此，Store需要知道Reducer函数，做法就是在生成Store的时候，将Reducer传入createStore方法

    import {createStore} from 'redux';
    const store = createStore(reducer);

createStore接收Reducer作为参数，生成一个新的Store，以后每当store.dispatch发送过来一个新的Action，就会自动调用Reducer，得到新的State。

为什么函数叫Reducer，因为可以作为数组的reduce方法的参数。

    const actions=[
        {type:'ADD', payload:0 },
        {type:'ADD', payload:1 },
        {type:'ADD', payload:2 },
    ];
    const total=actions.reduce(reducer,0);

数组actions表示依次有三个 Action，分别是加0、加1和加2。数组的reduce方法接受 Reducer 函数作为参数，就可以直接得到最终的状态3。

#### 纯函数
Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。

    // state 是一个对象
    function reducer(state,action){
        return Object.assign({},state,{ thingToChange});
        return {...state,...newState};
    
    }
    //state是一个数组
    function reducer(state,action){
        return [...state,newItem];
        }

#### store.subscribe()

Store允许使用store.subscribe方法设置监听函数，一旦State发生变化，就自动执行这个函数

    import {createStore} from 'redux'l
    const store = createStore(reducer);
    
    store.subscribe(listener);

显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。

store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

    let unsubscribe=store.subscribe(()=>{
        console.log(store.getState());
    });
    unsubscribe();

### Store的实现

Store提供三个方法

- store.getState()
- store.dispatch()
- store.subscribe()

    import {createStore} from 'redux';
    let {subscribe,dispatch,getState} = createStore(reducer);

createStore方法还可以接收第二个参数，表示State的最初状态，这通常是服务器给的

    let store = createStore(todoApp,window.STATE_FROM_SERVER)

上面代码中，window.STATE_FROM_SERVER就是整个应用的状态初始值。注意，如果提供了这个参数，它会覆盖 Reducer 函数的默认初始值。

下面是createStore方法的一个简单实现，可以了解一下 Store 是怎么生成的。

    const createStore=(reducer)=>{
        let store ;
        let listeners=[];
    
        const getState=()=>state;
    
        const dispatch=(action)=>{
            state=reducer(state,action);
            listeners.forEach(listener=> listener());
            };
    
        const subscribe =(listener)=>{
            listeners.push(listener);
            return ()=>{
                listeners=listeners.filter(1=>1!==listener);
            }
        };
        dispatch({});
        return {getState,dispatch,subscribe};
    };

action: 是个通知，携带信息。 包含type和payload
dispatch：view派发action 接收参数是Action
reducer:接收action,计算state新值 接收参数 state和action

#### Reducer的拆分

负责生成State。大型应用，state十分庞大，导致reducer函数十分庞大。

    const charReducer=(state=defaultState,action={})=>{
        const {type,payload} =action;
        switch(type) {
            case ADD_CHAT:
                return Object.assign({},state,{
                    chatLog:state.chatLog.concat(payload)
                    });
            case CHANGE_STATUS:
                return Object.assign({},state,{
                    statusMessage:payload
                    });
            case CHANGE_USERNAME:
                return Object.assign({},state,{
                    userName:payload
                    });   
            default:return state;
            
            }
    }

三种Action分别改变State的三个属性。
- ADD_CHAT：chatLog属性
- CHANGE_STATUS：statusMessage属性
- CHANGE_USERNAME：userName属性

三个属性没有联系，可以把reducer函数拆分。不同函数处理不同属性，最终合成一个大的Reducer

    const charReducer=(state=defaultState,action={})=>{
        return {
            chatLog:chatLog(state.chatLog, action),
            statusMessage: statusMessage(state.statusMessage, action),
            userName: userName(state.userName, action)
        }
    }

Reducer 函数被拆成了三个小函数，每一个负责生成对应的属性。

Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

    import {combineReducers} from 'redux'
    const chatReducer = combineReducers({
        chatLog,
        statusMessage,
        userName
    })
    
    export default todoApp;

通过combineReducers将三个子Reducer合成一个大的函数。
前提，State的属性名必须与子Reducer同名，不同名采取以下写法

    const reducer=combineReducers({
        a:doSomethingWithA,
        b:processB,
        c:c
    })
    
    //等同于
    function reducer(state={},action){
        return{
           a:doSomethingWithA(state.a,action),
            b:processB(state.b,action),
            c:c(state.c, action) 
        }
        }

总之，combineReducers做的就是产生一个整体的Reducer函数，该函数根据State的key去执行相应的子Reducer，并将返回结果合并成一个大的State对象

可以把所有子Reducer放在一个文件里，统一引入

    import {combineReducers} from 'redux'
    import * as reducers from './reducers'
    
    const reducer = combineReducers(reducers)

### 中间件

一个函数，对store.dispatch方法进行了改造，在发出Action和执行Reducer之间，添加了其他功能

#### 使用中间件

```js
import {applyMiddleware,createStore} from 'redux';
import createLogger from 'redux-logger';
const logger=creatLogger();

const store=createStore(
	reducer,
  applyMiddleware(logger)
)
```

`redux-logger`提供一个生成器`createLogger`，可以生成日志中间件`logger`。然后，将它放在`applyMiddleware`方法之中，传入`createStore`方法，就完成了`store.dispatch()`的功能增强。

注意：

- createStore接收初始状态作为参数时，applyMiddleware就是第三个参数了

  `const store=createStore(reducer,initialState,applyMiddleware(logger));`

- 中间件的次序有讲究

  ```
  const store=createStore(
  	reducer,
  	applyMiddleware(thunk,promise,logger)
  )
  ```

  有的中间件有次序要求，使用前要查一下文档。比如，`logger`就一定要放在最后，否则输出结果会不正确。

#### applyMiddleware()

redux的原生方法，作用将所有中间件组成一个数组，依次执行

### 异步操作

同步操作只要发出一种Action就行，异步操作的差别就是它要发出三种Action

- 操作发起时的Action
- 操作成功时的Action
- 操作失败时的Action

例：向服务器取出数据，Action写法

```
//第一种：名称相同，参数不同
{type:'FETCH_POSTS'}
{type:'FETCH_POSTS',status:'error',error:'Oops'}
{type:'FETCH_POSTS',status:'success',response:{...}}
//第二种：名称不同
{type:'FETCH_POSTS_REQUEST'}
{type:'FETCH_POSTS_FAILURE',error:'Oops'}
{type:'FETCH_POSTS_SUCCESS'，response:{...}}
```

除了Action种类不同，异步操作的 State 也要进行改造，反映不同的操作状态。下面是 State 的一个例子。

```
let state={
	ifFetching:true,
	didInvalidate:true,
	lastUpdated:'xxxxxx'
};
```

上面代码中，State 的属性`isFetching`表示是否在抓取数据。`didInvalidate`表示数据是否过时，`lastUpdated`表示上一次更新时间。

整个异步操作的思路就很清楚了。

- 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
- 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染

### redux-thunk中间件

异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？

奥妙就在 Action Creator 之中。

```
class AsyncApp extends Component {
	componentDidMount(){
      const { dispatch, selectedPost } = this.props
      dispatch(fetchPosts(selectedPost))
}
}
```

加载成功后（`componentDidMount`方法），它送出了（`dispatch`方法）一个 Action，向服务器要求数据 `fetchPosts(selectedSubreddit)`。这里的`fetchPosts`就是 Action Creator。

**关键**：

```
const fetchPost=postTitle=>(dispatch,getState)=>{
	dispatch(requestPost(postTitle));
	return fetch(`/some/API/${postTitle}.json`)
	.then(response=>response.json)
	.then(json=dispatch(receivePosts(postTitle,json)));
}

//使用
store.dispatch(fetchPost('reactjs'));
//or
store.dispatch(fetchPosts('reactjs')).then(()=>
	console.log(store.getStatus())
)
```

上面代码中，`fetchPosts`是一个Action Creator（动作生成器），返回一个函数。这个函数执行后，先发出一个Action（`requestPosts(postTitle)`），然后进行异步操作。拿到结果后，先将结果转成 JSON 格式，然后再发出一个 Action（ `receivePosts(postTitle, json)`）

上面代码有一些需要注意的:

1. fetchPosts返回了一个函数，而普通的 Action Creator 默认返回一个对象。
2. 返回的函数的参数是`dispatch`和`getState`这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。
3. 在返回的函数之中，先发出一个 Action（`requestPosts(postTitle)`），表示操作开始。
4. 异步操作结束之后，再发出一个 Action（`receivePosts(postTitle, json)`），表示操作结束。

这样的处理，就解决了自动发送第二个 Action 的问题。但是，又带来了一个新的问题，Action 是由`store.dispatch`方法发送的。而`store.dispatch`方法正常情况下，参数只能是对象，不能是函数

**使用中间件**`reduc-thunk`

```
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
const store=createStore(
    reducer,
    applyMiddleware(thunk)
)
```

使用redux-thunk改造store.dispatch,使后者可以接受函数作为参数.

因此，异步操作的第一种解决方案就是，写出一个返回函数的Action Creator，然后使用redux-thunk中间件改造store.dispatch

### redux-promise中间件

另一个异步操作的解决方案就是让Action Creator返回一个Promise对象

用到redux-promise中间件

```
import {createStore,applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducers';
const store=createStore(
    reducer,
    applyMiddleware(promiseMiddleware)
)
```

这个中间件使得`store.dispatch`方法可以接受 Promise 对象作为参数。这时，Action Creator 有两种写法。写法一，返回值是一个 Promise 对象。

```
const fetchPosts=
	(dispatch,postTitle)=>new Promise(function(resolve,reject){
		dispatch(requestPost(postTitle));
		return fetch(`/some/API/${postTitle}.json`)
			.then(response=>{
				type:'FETCH_POSTS',
				payload:response.json()
			});
	});
```





## Redux 工作流程

首先，用户发出Action。

    store.dispatch(action);

然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State

    let newState=todoApp(preState,action);

State一旦有变化，Store就会调用监听函数。

    //设置监听函数
    store.subscribe(listener);

listener可以通过store.getState()得到当前状态，如果使用的是React，这时就可以触发重新渲染View

    function listener(){
        let newState=store.getState();
        component.setState(newState);
    }

Redux 基本做法：用户发出Action，Reducer函数算出新的state，View重新渲染

Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。

怎么才能 Reducer 在异步操作结束后自动执行呢？这就要用到新的工具：中间件（middleware）。



# 计数器实例的流程

### 在index.js引入

store和Provider

```
//模块中的Prvider组件，可以传store参数给所有子组件，做到全局的感觉
import {Provider} from 'react-redux'
//自定义仓库
import store from './app/store'

const root=ReactDOM.creatRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
```



### app/store.js

构建一个store，参数是reducer

```
import {configureStore} from 'reduxjs/toolkit';
import {counterReducer} from '../features/counter/counterSlice'
//不用createStore改用configureStore 因为已经弃用
export const store=configureStore({
  reducer:{
      counter:counterReducer
  }
})
```

不用createStore改用configureStore ,因为createStore已经弃用



### /features/counter/counterSlice.js

导出一个reducer 作仓库构建的依据，使用createSlice，传入reducer，生成actions

``` 
counterSlice=createSlice({
    name: 'counter',
    initialState,
    reducers:{
        increment:state=>{
            state.value+=1;
        },
        decrement:state=>{
            state.value-=1;
        },
        incrementByAmount:(state,action)=>{
            state.value+=action.payload;
        },
    },
    })
```

导出

```
export const {increment,decrement,incrementByAmount}=counterSlice.actions
export default counterSlice.reducer
export const selectCount=(state)=>state.counter.value;
```

### /features/counter/Counter.js

构建组件，并应用store中的action

引入actions：

```
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
    selectCount,
} from './counterSlice';
```

引入钩子

```
import { useSelector,useDispatch } from "react-redux";
```

useSelector 从store状态中读取一个值并订阅更新；

useDispatch 返回store中的dispatch方法，便于发送actions

初始状态

```
    const count=useSelector(selectCount);
    const dispatch=useDispatch();
    const [incrementAmount,setIncrementAmount]=useState('2');
    const incrementValue=Number(incrementAmount)||0;
```

调用dispatch

```
onClick={()=>dispatch(increment())};
onClick={()=>dispatch(incrementByAmount(incrementValue))

//在定义中 action接收dispatch传参
 incrementByAmount:(state,action)=>{
            state.value+=action.payload;
        },
```




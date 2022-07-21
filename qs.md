1. 函数组件可以用 render props吗
    class DataProvider extends React.Component {
    state = {
        data: {
            target: 'World'
        }
    }
    render() {
        return this.props.render(this.state)
    }
    } 
    等价？  
    function DataProvider(props){
            [data,setData]=useState({target:'world'})
            return props.render(data）
        }

     this.state = { x: 0, y: 0 };
     {this.props.render(this.state)} 函数组件怎么改写
    render 传参要求

2. <ProductItem {...child} />
    {...child} 是什么意思

    function logProps(WrappedComponent){
         return ()=>{
            useEffect((prevProps)=>{
                log(props);
                log(prevProps);
            return <WrappedComponent value={data} {...this.props} />    
         }   
     
        }
3.
    自定义Hook 传参，返回什么都行，但命名以use开头 ，相当于函数？
        同一个Hook 传的参得类型一样还是得一样的值
    高阶组件  传 子组件  返回组件，且为容器组件包裹着的子组件
    作用都是复用逻辑？


函数式组件hooks
自定义hooks  闭包问题 
    
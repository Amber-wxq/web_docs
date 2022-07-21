
interface Todo{
    desc:string,
    deadline:number,
    isChecked:boolean,
    methods:{
    updateDesc:(newDesc:string)=>void,
    updateDeadline:(newDeadline:number)=>void
    }
}

interface TodoList{
    list:Todo[],   
    methods:{
        deleteItem:(index:number)=>void,
        addItem:(desc:string,deadline:number)=>void
        // updateDesc:(newDesc:string,index:number)=>void,
        // updateDeadline:(newDeadline:number,index:number)=>void
    }
}

function createTodoModel():Todo{
    let desc:string ='';
    let deadline:number = 0;
    const isChecked:boolean = false;
    const methods={
        updateDesc(newDesc){
            desc = newDesc;
        },
        updateDeadline(newDeadline){
            deadline=newDeadline;
        }
    }
    return {desc,deadline,isChecked,methods}
}

function createTodoListModel( ):TodoList{
        const list:Todo[]=[];
        const methods={
            deleteItem(index:number){
                list.splice(index,1);
                
            },
            addItem(inputDesc:string,inputDeadline:number){
                
                
                const todo:Todo=createTodoModel();
                list.push(todo);
                
            }
            // updateDesc(newDesc:string,index:number){
            //     const todo:Todo=list.slice(index,index+1)[0];
            //     todo.desc=newDesc;
            //     list.splice(index,1,todo);
                
            // },
            // updateDeadline(newDeadline:number,index:number){
            //    const todo:Todo=list.slice(index,index+1)[0];
            //     todo.deadline=newDeadline;
            //     list.splice(index,1,todo);
                
            // }

        };
    return{list, methods}


    
}


const todoList=createTodoListModel();
import {createContext, useState, useReducer} from 'react'
import {ADD_TASK,DELETE_TASK,EDIT_TASK,GET_TASKS,SET_TASKS,SORT_TASKS} from './../utils/reducerConsts'

const TodoContext = createContext()

const Provider = ({children}) => {
    const [todoArr, setTodoArr] = useState([])
    
    const addTask = (task) =>{
            const newTask = {_id: `${Date.now()*Math.random()}`,...task}
            const updatedList = [...todoArr,newTask]
            setTodoArr(updatedList)
            localStorage.setItem("todoArr", JSON.stringify(updatedList))
            console.log(todoArr);
          }        
    const deleteTask = (id) => {
        console.log('delete task');   
        console.log(` DELETE ${id}`);
        console.log(todoArr);
        
        const filteredList = todoArr.filter(item=>item._id!=id)
        setTodoArr(filteredList)
        localStorage.setItem("todoArr", JSON.stringify(filteredList))
    }
    const editTask = (editedTask) => {
        console.log(editedTask);
        const updatedList = todoArr?.map(task=>{return (task._id===editedTask._id) ? editedTask : task})
        console.log(updatedList);
        
        setTodoArr(updatedList)
        localStorage.setItem("todoArr", JSON.stringify(updatedList))
    }
    const completeTask = (id) => {
        console.log('complete Task');
    }
    const sortTasksBy = (sortBy) => {
        console.log('sort Tasks');
    }
    const reducer = (state, action)=>{
        switch (action.type){
            // case SET_TASKS:{
            //     const updatedList = [...state,todoArr: state.todoArr]
            //     localStorage.setItem("todoArr", JSON.stringify(updatedList))

            // }
            // case GET_TASKS:{
            //     return state.todoArr
            // }
            case ADD_TASK:
                addTask(action.payload)
                return [state]
            default: return state
        }
    }
    const [state, dispatch] = useReducer(reducer, {
        todoArr : []
    })
    const shared = {
        todoArr, 
        setTodoArr,
        dispatch,
        addTask,
        editTask,
          deleteTask,
           completeTask,
            sortTasksBy
    }


    return (<TodoContext.Provider value={ shared}>
        {children}
    </TodoContext.Provider>)
}
export {Provider as TodoProvider}
export default TodoContext

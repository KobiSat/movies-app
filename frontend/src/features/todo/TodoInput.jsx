import React, { useContext, useState } from 'react'
import TodoContext from '../../context/todos'
import {ADD_TASK} from '../../utils/reducerConsts'
// import {useAddTodoMutation} from './../../slices/toApiSlice'


const TodoInput = () => {
  const {dispatch} = useContext(TodoContext)
  // const {data, isLoading, error} = useAddTodoMutation()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24);
    return tomorrow.toISOString().split("T")[0];
  });  
  const [taskUrgency, setTaskUrgency] = useState("Low");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault()

    dispatch({type: ADD_TASK, payload: {
      title, 
      description, 
      deadlineDate, 
      taskUrgency,
      isCompleted
    }})
    setTitle("")
    setDescription("")
    setDeadlineDate(new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().split("T")[0])
    setTaskUrgency("Low")
    setIsCompleted(false)
  }
  const dateNow = Date.now()

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Task Title'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        required
      />
      <input
        type='text'
        placeholder='Task Description'
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        required
      />
      <input
        type='date'
        value={deadlineDate}
        onChange={(e)=>setDeadlineDate(e.target.value)}
        required
      />
      <div>
        <p>Please select Task urgency:</p>
        <input
          type='radio'
          value='Critical'
          checked={taskUrgency === "Critical"}
          onChange={(e)=>setTaskUrgency(e.target.value)}
          />
        <label htmlFor='urgency1'>Critical</label>

        <input
          type='radio'
          value='High'
          checked={taskUrgency === "High"}
          onChange={(e)=>setTaskUrgency(e.target.value)}
          />
        <label htmlFor='urgency2'>High</label>

        <input
          type='radio'
          value='Medium'
          checked={taskUrgency === "Medium"}
          onChange={(e)=>setTaskUrgency(e.target.value)}
        />
        <label htmlFor='urgency3'>Medium</label>

        <input
          type='radio'
          value='Low'
          checked={taskUrgency === "Low"}
          onChange={(e)=>setTaskUrgency(e.target.value)}
        />
        <label htmlFor='urgency4'>Low</label>
      </div>
      <input 
        type='checkbox' 
        id={`taskDone${dateNow}`}  
        checked={isCompleted} 
        onChange={(e)=>setIsCompleted(e.target.checked)}
      />
      <label htmlFor={`taskDone${dateNow}`}>Task Done</label>

      <button type='submit'>Add Task</button>
    </form>
  );
};  

export default TodoInput
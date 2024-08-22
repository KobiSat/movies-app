import React, { useState, useContext } from 'react'
import TodoContext from '../../context/todos';

const EditTask = ({task,  handleToggleEditForm}) => {
    const {editTask} = useContext(TodoContext)

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [deadlineDate, setDeadlineDate] = useState(task.deadlineDate);
    const [taskUrgency, setTaskUrgency] = useState(task.taskUrgency);

    const handleSubmit = (e)=>{
    e.preventDefault()
    
    editTask({
        _id: task._id,
        title,
        description,
        deadlineDate,
        taskUrgency,
        isCompleted: task.isCompleted,
    })
    
    handleToggleEditForm()
    }

  return (
    
    <form onSubmit={handleSubmit}>
    <input
      type='text'
      value={title}
      onChange={e=>setTitle(e.target.value)}
      required
    />
    <input
      type='text'
      placeholder='Task Description'
      value={description}
      onChange={e=>setDescription(e.target.value)}
      required
    />
    <input
      type='date'
      value={deadlineDate}
      onChange={e=>setDeadlineDate(e.target.value)}
      required
    />

<div>
        <input
          type='radio'
          id={`urgency1${task._id}`}
          value='Critical'
          checked={taskUrgency === "Critical"}
          onChange={e=>setTaskUrgency(e.target.value)}
          />
        <label htmlFor={`urgency1${task._id}`}>Critical</label>

        <input
          type='radio'
          name='urgency2'
          value='High'
          checked={taskUrgency === "High"}
          onChange={e=>setTaskUrgency(e.target.value)}
        />
        <label htmlFor='urgency2'>High</label>

        <input
          type='radio'
          name='urgency3'
          value='Medium'
          checked={taskUrgency === "Medium"}
          onChange={e=>setTaskUrgency(e.target.value)}
        />
        <label htmlFor='urgency3'>Medium</label>

        <input
          type='radio'
          name='urgency4'
          value='Low'
          checked={taskUrgency === "Low"}
          onChange={e=>setTaskUrgency(e.target.value)}
        />
        <label htmlFor='urgency4'>Low</label>
      </div>
    <button type='submit'>Save Changes</button>
  </form>
  )
}

export default EditTask
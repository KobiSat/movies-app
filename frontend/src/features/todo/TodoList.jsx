import React, { useContext } from 'react'
import {Accordion} from 'react-bootstrap'
import TodoItem from './TodoItem'
import TodoContext from '../../context/todos'
import './todo.css'
import {useGetTasksQuery} from './../../slices/toApiSlice'

const TodoList = () => {
  const {data, isLoading, error} = useGetTasksQuery()
  const todoArr = data.documents

  return ( 
    <Accordion className='w-50'>
      {todoArr?.map((item)=>{return (
        <TodoItem 
          key={item._id} 
          _id={item._id} 
          title={item.title} 
          deadlineDate = {item.deadlineDate} 
          description={item.description} 
          taskUrgency={item.taskUrgency}  
          isCompleted={item.isCompleted}
        />
      )})}
    </Accordion>
  )
}

export default TodoList
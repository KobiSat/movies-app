import { useContext, useEffect, useState } from 'react';
import TodoContext from './context/todos';
import Header from './features/layout/Header';
import RegisterPage from './features/pages/RegisterPage';
// import TodoList from './features/todo/TodoList';
import './App.css';
import { useGetTasksQuery } from './slices/toApiSlice';

function App() {
  const {setTodoArr} = useContext(TodoContext)
  const {data, isLoading, error} = useGetTasksQuery()
  console.log(isLoading, data);
  
  useEffect(()=>{
    if(isLoading)
      setTodoArr([])
    else
      setTodoArr(data.documents)
  }, [])

  return (
    <div className="bg-info">
      <RegisterPage/>
      <main className='container'>
        {/* <TodoList/> */}
      </main>
    </div>
  );
}

export default App;

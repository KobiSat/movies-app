import React from 'react'
import TodoInput from './../todo/TodoInput'
import "./header.css"

const Header = () => {
  return (
    <header className="App-header">
      <h1>TODO LIST APP</h1>
      <TodoInput/>
    </header>
  )
}

export default Header
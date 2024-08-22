import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js'
import { TodoProvider } from './context/todos.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode> 
    <TodoProvider>
      <Provider store={store}>
       <App  />  
      </Provider>
    </TodoProvider>
  </StrictMode>
)


import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'

function App() {

  return (
    <Routes>
      <Route path="/" Component = {Home}/>
      <Route path="/register" Component = {Register}/>
      <Route path='/login' Component = {Login}/>
    </Routes>
  )
}

export default App

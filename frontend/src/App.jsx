import React from 'react'
import Login from './authPage/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Register from './authPage/Register'


function App() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/register' element={<Register/>}/>
        </Routes>
        
        </BrowserRouter>
    </div>
  )
}

export default App
/* eslint-disable no-unused-vars */
import React from 'react'
import { Route,BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/login'
import Register from '../screens/register'
import Home from '../screens/Home'
import Project from '../screens/Project'
import UserAuth from '../auth/userAuth'
function AppRoutes() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path='/register' element = {<Register/>}/>
   <Route path='/project' element={<UserAuth><Project/></UserAuth>}/>
   </Routes>
   
   </BrowserRouter>
  )
}

export default AppRoutes
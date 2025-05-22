import React from 'react';
import {Routes, Route} from 'react-router'

import Landing from "./pages/Landing/Landing"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import ToDoList from "./pages/ToDo/ToDoList"
import "./App.css"
import "antd/dist/reset.css"
import '@ant-design/v5-patch-for-react-19';


function App() {
  return (
   <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/to-do-list" element={<ToDoList/>}/>
    </Routes>  
  )
}
export default App 
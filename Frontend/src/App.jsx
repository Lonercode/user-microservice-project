import { useState } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import AddUser from './pages/add';
import UpdateUser from './pages/update';
import UpdatePassword from './pages/updatePassword';


function Nav(){
  return (
    <>
      <div className='navBar'>
        <a href = "/">Home</a>
        <a href = "/addUser">Add User</a>
      </div>
    </>
  )
}


function App() {
  return (

    <>
    <Nav/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/addUser" element = {<AddUser/>}/>
      <Route path="/updateUser/:_id/:first_name/:last_name/:email/:country" element = {<UpdateUser/>}/>
      <Route path="/updatePassword/:_id" element = {<UpdatePassword/>}/>
    </Routes>
    </BrowserRouter>
  </>
    )
  
}

export default App

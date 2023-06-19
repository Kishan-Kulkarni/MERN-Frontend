import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from './Pages/Home';
import Write from './Pages/Write';
import './App.css'
import PostPage from './Pages/PostPage';
import EditPage from './Pages/EditPage';
function App() {

  const [isAuth, setIsAuth]=useState(false)
  const [id , setId]=useState('')

  return (
    <>
   
        <Routes>
          <Route index element={<Login 
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          />} />
          <Route path="register" element={<Register 
            isAuth={isAuth}
          setIsAuth={setIsAuth}
          />} />
          <Route path="/home" element={<Home 
           isAuth={isAuth}
          setIsAuth={setIsAuth}
          />} />
          <Route path="write" element={<Write 
            isAuth={isAuth}
          setIsAuth={setIsAuth}
          />} />
          <Route path="post/:id" element={<PostPage 
            isAuth={isAuth}
          setIsAuth={setIsAuth}
          id={id}
          setId={setId}
          />} />
          <Route path="edit" element={<EditPage 
            isAuth={isAuth}
          setIsAuth={setIsAuth}
          id={id}
          setId={setId}
          />} />
        </Routes>
    </>
  )
}

export default App

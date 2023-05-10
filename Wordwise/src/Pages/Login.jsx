import React, { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = ({isAuth, setIsAuth}) => {
    const [username , setusername]=useState("")
    const [password , setPassword]=useState("")
    const navigate = useNavigate();
    const loginresponse= async(e)=>{
      e.preventDefault();
      try {
        const data={username, password}
        // const response =await fetch('http://localhost:3000/login', params, {headers:{Accept:"application/x-www-form-urlencoded"}}, { withCredentials: true })
        const response= await fetch('http://localhost:3000/login', {
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        })
        const user=await response.json()
        console.log(user);
        if(user.ok){
          setIsAuth(true)
          localStorage.setItem('token', user.token)
          localStorage.setItem('id', user.user.id)
          navigate('/home')
        }else{
          setIsAuth(false)
          alert('Wrong Creds')
        }
        
      } catch (error) {
        console.log(error.response)
      }
    }

    useEffect(()=>{
      if(isAuth){
        navigate('/home')
      }
    },[])


  return (
    <div className="login">
        <h2>Login</h2>
        <form onSubmit={loginresponse} >
            <div className="name-inp"><input type="text" name="username" id="email" placeholder="Enter your username" value={username} onChange={(e) => setusername(e.target.value)}/></div>
            <div className="pass-inp"><input type="password" name="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
            <input type="submit" value="Login"  id="submit" />
        </form>
        <button id='register' onClick={()=>{navigate('/register')}}>Register</button>
        
    </div>
  )
}
export default Login
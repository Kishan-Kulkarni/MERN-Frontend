import { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = ({isAuth, setIsAuth}) => {
    const [password , setPassword]=useState("")
    const [username , setusername]=useState("")
    const navigate = useNavigate();

    const regresponse= async(e)=>{
      e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      const response =await axios.post('https://wordwise-cjja.onrender.com/register', params, {headers:{Accept:"application/x-www-form-urlencoded"}}, { withCredentials: true })
      if(response.data.isAuthenticated){
        setIsAuth(true)
        alert("Registration succesful")
        navigate("/")
      }else{
        setIsAuth(false)
        alert("Registration failed")
        navigate("/")
      }
    } catch (error) {
      console.log(error.response)
    }
    }

  return (
    <div className="register" >
        <h2>Register</h2>
        <form onSubmit={regresponse} >
            <div classusername="username-inp"><input type="text" username="email" id="email" placeholder="Enter your username" value={username} onChange={(e) => setusername(e.target.value)}/></div>
            <div classusername="pass-inp"><input type="password" username="password" id="password" placeholder="Enter a strong password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
            <input type="submit" value="Register"  id="submit" />
        </form>
        
        
       
        <button id='login' onClick={()=>{navigate('/')}}>Login</button>
       
        
    </div>
  )
}
export default Register
import Navbar from "../Components/Navbar"
import Input from "../Components/Input"
import { useEffect } from "react"
import { Navigate,useNavigate } from "react-router-dom"

const Write = ({isAuth, setIsAuth}) => {
  const navigate=useNavigate()
  
  async function checkAuth(){
    const req = await fetch('http://localhost:3000', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

    if(!req){
      navigate('/')
    }

    
		const data = await req.json()
		if (data.status === 'ok') {
      setIsAuth(true)
		} else {
      setIsAuth(false)
			navigate('/')
		}
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
		if (token) {
      setIsAuth(true)
      checkAuth()
      
		}
  },[])

  return (
    <>
      {isAuth?<div>
        <Navbar 
          isAuth={isAuth}
          setIsAuth={setIsAuth}
        />
        <Input />
    </div>:<Navigate to='/'/>}
    </>

    
  )
}
export default Write
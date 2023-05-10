import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"
import { Navigate, useNavigate } from "react-router-dom"
import Login from "./Login"
import Posts from "../Components/Posts"
import Post from "../Components/Post"
import PostLoad from "../Components/PostLoad"


const Home = ({isAuth, setIsAuth}) => {
  const navigate=useNavigate()
  const [isLoading, setIsLoading]=useState(true)
  const [data, setData]=useState({})

  async function getData(){
    const response= await fetch('http://localhost:3000/post', {
      mode: "no-cors",
    })
    const data = await response.json()
    if(data.status==='ok'){
      if(data.posts.length<1){
        navigate('/write')
      }
      setIsLoading(false)
      setData(data)
    }
  }
  
  async function checkAuth(){
    const req = await fetch('http://localhost:3000', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
      mode: "no-cors",
		})

    if(!req){
      setIsAuth(false)
    }

    
		const data = await req.json()
		if (data.status === 'ok') {
      setIsAuth(true)
		} else {
      setIsAuth(false)
		}
  }

  useEffect(()=>{
    setIsLoading(true)
    const token = localStorage.getItem('token')
		if (token) {
      setIsAuth(true)
      checkAuth()
      getData()
		}
  },[])



  return (
    
    <>
      {isAuth?
      <><div className="home">
        <Navbar 
          isAuth={isAuth}
          setIsAuth={setIsAuth}
        />
        {isLoading?<>
          <PostLoad />
          <PostLoad />
          <PostLoad />
        </>:
        <>
        <Posts 
         posts={data.posts}
        />
        </>
        }
    </div></>:<Navigate to='/'/>}
      
    </>
    
  )
}
export default Home
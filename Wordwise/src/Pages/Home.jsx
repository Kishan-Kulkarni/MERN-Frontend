import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"
import { Navigate, useNavigate , useLocation} from "react-router-dom"
import Login from "./Login"
import Posts from "../Components/Posts"
import Post from "../Components/Post"
import PostLoad from "../Components/PostLoad"
import axios from "axios"


const Home = ({isAuth, setIsAuth,data,setData}) => {
  const navigate=useNavigate()
  const location=useLocation()
  const [isLoading, setIsLoading]=useState(true)

  async function getData(){
    
    const response= await axios.get('https://wordwise-cjja.onrender.com/post')
    const data =  response.data.posts
    
    if(response.data.status==='ok'){
      if(data.length<1){
        navigate('/write')
      }
      setIsLoading(false)
      setData(data.reverse())
    }
  }
  
  async function checkAuth(){
    
    const req = await axios.get('https://wordwise-cjja.onrender.com', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

    

    if(!req){
      setIsAuth(false)
    }

    
		const data = req.data
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
      if(!data?.length && !location.state?.length) {
        console.log('here')
        getData()
      }else{
        setIsLoading(false)
        if(location.state?.length){
          setData(location.state)
        }else{
          setData(data)
        }
      }
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
         posts={data}
        />
        </>
        }
    </div></>:<Navigate to='/'/>}
      
    </>
    
  )
}
export default Home
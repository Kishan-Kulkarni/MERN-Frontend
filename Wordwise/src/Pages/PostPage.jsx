import { useEffect, useState } from "react"
import { Navigate, useNavigation } from "react-router-dom"
import { useParams } from "react-router-dom"
import Navbar from "../Components/Navbar";
import PostPageLoad from "../Components/PostPageLoad";
import EditPage from "./EditPage";
const PostPage = ({isAuth, setIsAuth, id, setId}) => {
    const  params=useParams()
    const [content, setContent ]=useState({})
    const [username, setUsername]=useState('')
    const [loading, setLoading]=useState(true)
    const [redirect , setRedirect]=useState(false)
    async function getUser(){
        if(!content.id){
            setUsername("")
        }else{
            const data=await fetch('https://wordwise-cjja.onrender.com/user', {
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({id: content.id})
              })
              const user=await data.json()
              setUsername(user.username)
              setLoading(false)
        }
    
  }
    async function checkAuth(){
        const req = await fetch('https://wordwise-cjja.onrender.com', {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
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

      async function getData(){
        const url='http://localhost:3000/post'
        const data =await fetch(`https://wordwise-cjja.onrender.com/post/${params.id}`)
        const content=await data.json()
        
        setContent(content.post)
      }

      useEffect(()=>{
        setRedirect(false)
        const token = localStorage.getItem('token')
		if (token) {
            setLoading(true)
        setIsAuth(true)
        checkAuth()
        getData()
        }
      }, [])

      useEffect(()=>{
        getUser()
        setId(content._id)
      }, [content])

  return (
    <div>
        {isAuth?<>
            <Navbar 
                isAuth={true}
                setIsAuth={setIsAuth}
            />
            <>{redirect?<EditPage 
                post={content}
            />: <>
            {loading?<PostPageLoad />:<div className="postpage">
            <div className="title"><h1>{content.title}</h1></div>
            <div className="author"><p>{username}</p></div>
            <div className="date"><p>{new Date(content.updatedAt).toUTCString().split(' ')[1]+'-'+new Date(content.updatedAt).toUTCString().split(' ')[2]+'-'+new Date(content.updatedAt).toUTCString().split(' ')[3]}</p></div>
            {(localStorage.getItem('id')==content.id)?<div className="edit"><button onClick={()=>{setRedirect(true)}}>Edit Post</button></div>:<></>}
            <img className="image" src={content.image}/> 
            <div className="content" dangerouslySetInnerHTML={{__html:content.content}}></div>
            </div>}
            </>}</>
           
            
        </>:<Navigate to='/'/>}
    </div>
  )
}
export default PostPage
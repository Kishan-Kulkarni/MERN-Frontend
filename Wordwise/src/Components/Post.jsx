import { useEffect, useState } from 'react'
import { useNavigate,Navigate } from 'react-router-dom'
const Post = (props) => {
  const post=props
  const [username, setUsername]=useState('')
  const navigate=useNavigate()
  async function getUser(){
    const data=await fetch('https://wordwise-cjja.onrender.com/user', {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:props.id})
    })
    const user=await data.json()
    setUsername(user.username)
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <div className='post' >
        <div className="image">
            <img src={props.image} alt="image"  onClick={()=>{navigate(`/post/${props._id}`, {state:post})}}/>
        </div>
        <div className="content">
            <h1  onClick={()=>{navigate(`/post/${props._id}`, {state:post})}}>{props.title}</h1>
            <p className='author'>{username}</p>
            <p className='date'>{new Date(props.updatedAt).toUTCString().split(' ')[1]+'-'+new Date(props.updatedAt).toUTCString().split(' ')[2]+'-'+new Date(props.updatedAt).toUTCString().split(' ')[3]}</p>
            <p className='summary'>{props.summary}
            </p>
        </div>
    </div>
  )
}
export default Post
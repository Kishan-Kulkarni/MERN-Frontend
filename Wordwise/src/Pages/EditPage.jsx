import { useEffect, useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

const EditPage = ({post}) => {
    const [title, setTile]=useState(post.title)
  const [summary, setSummary]=useState(post.summary)
  const [image, setImage]=useState('')
  const [content, setContent]=useState(post.content)
  const navigate=useNavigate()

  const handleInpt=async(e)=>{
    e.preventDefault()
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', post.id);
    data.set('_id', post._id)
    data.set('image', image)
    const response = await fetch('http://localhost:3000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });

    if(response.ok===true){
      navigate('/home')
    }else{
      alert("Post not created")
    }
  }

  
  

  return (
    <div>
    <div className='blog-inp'>
    <div className='inner'>
    <h1 className='inp-h1'>Enter the blog components</h1>
    <form onSubmit={handleInpt} encType='multipart/form-data'>
            <div id="title-inp">
                <input type="text" name="title" id="title"  placeholder="Enter the title of the article" value={title} onChange={(e)=>setTile(e.target.value)}/>
            </div>
            <div id="title-sum">
                <input type="summary" name="summary" id="summary"  placeholder="Enter the summary of the article" value={summary} onChange={(e)=>setSummary(e.target.value)}/>
            </div>
            <div className='file-inpt'>
            <label>
              Upload file
              <input type="file" name="file"  id="image-button"  onChange={e=>{
                const reader =new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onload=() =>{
                  setImage(reader.result)
                }
                reader.onerror=(error)=>{
                  console.log(error)
                }
              }}/>
            </label>
            
            </div>
            <div id="content-inp" style={{backgroundColor:"white"}}>
                <ReactQuill theme='snow' modules={modules} formats={formats} value={content} onChange={setContent}></ReactQuill>
            </div>
            <button type="submit" id="submit-article">Submit article</button>
        </form>
    </div>
    </div>
    </div>
  )
}
export default EditPage
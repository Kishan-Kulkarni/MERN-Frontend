import Post from "./Post"

const Posts = (props) => {
    const posts=props.posts
  return (
    <>
        {posts.map(post=>{
            return(
                <Post 
                    key={post._id}
                    {...post}
                />
            )
        })}
    </>
  )
}
export default Posts
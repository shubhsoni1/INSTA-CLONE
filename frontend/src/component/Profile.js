import React,{useEffect,useState}from 'react'
import images from '../img/images.jpg'
import xxx from '../img/profile-user.png'

// import xyz from '../img/3.png'
import './Profilee.css'
import PostDetail from './PostDetail'
import ProfilePic from './ProfilePic'

export default function Profile() {
  const [pic,setPic]=useState([])
  const [show,setShow]=useState(false)
  const [posts,setPosts]=useState([])
  const[changePic,setChangePic]=useState(false)
  const[user,setUser]=useState("")


  const toogleDetails=(posts)=>{
    // console.log("first"+ show)
    if(show){
      setShow(false);
    }
    else{
      setShow(true);
      setPosts(posts);
      // console.log(item)

    }
  }
  

  const changeprofile=()=>{
     if(changePic){
      setChangePic(false)
     }
     else{
      setChangePic(true)
     }

  }
 

  
 useEffect(()=>{
 fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
  headers:{
    "Authorization": "Bearer " + localStorage.getItem("jwt")
  }
 }).then(res=>res.json()).then((data)=>{setPic(data.post);setUser(data.user)})

 },[])




  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        {/* profile pic */}
        <div className="profile-pic">
        <img onClick={changeprofile} src={user.Photo?user.Photo:xxx} alt="" />
        </div>
        {/* profile data */}
        <div className="profile-data">
           <h1>{JSON.parse(localStorage.getItem("user")).name} </h1>
           <div className="profile-info" style={{display:"flex"}}>
            <p>{pic?pic.length:"0"} post</p>
            <p>{user.followers?user.followers.length:"0"} followers</p>
            <p>{user.following?user.following.length:"0"} following</p>
           </div>
        </div>
      </div>
      <hr />

      <div className="gallery">
        {pic.map((pics)=>{
          return <img key={pics._id} src={pics.photo} alt="" onClick={()=>{
            toogleDetails(pics)
          }} />
        })}
      </div>
      {show&&<PostDetail item={posts} toogleDetails={toogleDetails} />}
      {
        changePic&&<ProfilePic changeprofile={changeprofile}/>
      }
      
   
    </div>
  )
}

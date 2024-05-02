import React,{useState,useEffect,useRef} from 'react'

function ProfilePic({changeprofile}) {
    const hiddenFileInput=useRef(null)
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")

    const postDetails = () => {

        const data = new FormData();
        data.append("file", image)
        data.append("upload_preset", "my-clone")
        data.append("cloud_name", "drrzf5tpk")
        fetch("https://api.cloudinary.com/v1_1/drrzf5tpk/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => { setUrl(data.url); })
        
    }
 
    const handleClick=()=>{
        hiddenFileInput.current.click()
    }

    const postPic=()=>{
        fetch("http://localhost:5000/uploadProfilePic", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                pic: url
            })
        }).then(res=>res.json()).then((data)=>{
            console.log(data)
            changeprofile()
            window.location.reload();
            })
    }


    useEffect(()=>{
        if(image){
            postDetails()
        }
    },[image])
   
    useEffect(()=>{
        if(url){
            postPic()
        }
    },[url])

  return (
    <div className='profilePic darkBg'>
       <div className="changePic centered">
           <div>
             <h2>Change Profile Photo</h2>
           </div>
           <div style={{borderTop:"1px solid #00000030"}}>
            <button className='upload-btn' style={{color:"#1EA1F7"}} onClick={handleClick} >upload Photo</button>
            <input ref={hiddenFileInput} type="file" accept="image/*" style={{display:"none"}} onChange={(e)=>{setImage(e.target.files[0])}}/>
           </div>
           <div style={{borderTop:"1px solid #00000030"}}>
               <button className='upload-btn' style={{color:"#ED4956"}} onClick={()=>{
                 setUrl(null);
                 postPic();
               }} >Remove Current Button</button>
           </div>
           <div style={{borderTop:"1px solid #00000030"}}>
              <button style={{background:"none",border:"none",cursor:"pointer" ,fontSize:"15px"}} onClick={
                changeprofile }>cancel</button>
           </div>
       </div>
    </div>
  )
}

export default ProfilePic 

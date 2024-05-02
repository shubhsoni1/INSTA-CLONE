import React, { useState, useEffect } from 'react'
import "./createpost.css"
import img from '../img/images.jpg'
import { toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';


export default function Createpost() {
    const navigate=useNavigate();
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const notifyA = (a) => toast.error(a);
    const notifyB = (a) => toast.success(a);

    useEffect(() => {
        //  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  {DANGER}  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        // eslint-disable-next-line    
        if (!image =="") {

            const data = new FormData();
            data.append("file", image)
            data.append("upload_preset", "my-clone")
            data.append("cloud_name", "drrzf5tpk")
            fetch("https://api.cloudinary.com/v1_1/drrzf5tpk/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json()).then(data => { setUrl(data.url); })

            
        }


    }, [image])


    // posting image to cloudnary
    const postDetails = () => {

        // saving post to mongo db 
        fetch("http://localhost:5000/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                body: body,
                pic: url
            })


        }).then(res=>res.json()).then((data)=>{
            if(data.error){
               notifyA(data.error);
            }
            else{
              notifyB("SUCESSFULLY POSTED ");
              navigate("/")
             
            }
            })

    }


    const loadfile = (event) => {
        var output = document.getElementById("output");
        output.src = URL.createObjectURL(event.target.files[0]);

        // output.onload = function () {
        //   URL.revokeObjectURL(output.src); // free memory
        // };
    };
    return (
        <div className='createPost'>
            {/* header */}
            <div className="post-header">
                <h4 style={{ margin: "3px auto" }}>create new createPost</h4>
                <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
            </div>
            {/* image preview */}
            <div className="main-div">
                <img id="output" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" alt="" />
                <input type="file" accept='image/*' onChange={(event) => { loadfile(event); setImage(event.target.files[0]) }} />


            </div>
            {/* details */}
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src={img} alt="" />
                    </div>
                    <h5>PuneetSupperstar</h5>
                </div>
                <textarea tpe="text" placeholder="Write a caption " value={body} onChange={(e) => { setBody(e.target.value) }}></textarea>
            </div>


        </div>
    )
}

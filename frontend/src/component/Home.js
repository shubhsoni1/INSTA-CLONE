import React, { useEffect, useState } from 'react'
// import xyz from '../img/3.png'
import images from '../img/images.jpg'
import "../component/Home.css"
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {Link}  from 'react-router-dom'
import xxx from '../img/profile-user.png'

export default function Home() {
  const notifyB =(a)=>toast.success(a);
  const notifyA =(a)=>toast.error(a);

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false)
  const [item, setItem] = useState([])



  // FETCHING DATA FOR HOME PAGE 
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      navigate("./signUp")
    }

    // Fetching all posts 
    fetch("http://localhost:5000/allpost", {
      // method not required because get 
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(req => req.json()).then(result => setData(result)).catch(err => console.log(err))
    // console.log(data);

    // eslint-disable-next-line
  }, [])


  // API FOR LIKE UPDATE
  const likePost = async (id) => {
    await fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
      })
    }).then(res => res.json()).then((result) => {
      const newData = data.map((posts) => {
        // eslint-disable-next-line
        if (posts._id == result._id) {
          return result;
        } else {
          return posts;
        }
      });
      setData(newData);
      // console.log(result);
    });

  }


  //  API FOR LIKE POST
  const unlikePost = async (id) => {
    await fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
      })
    }).then(res => res.json()).then((result) => {
      const newData = data.map((posts) => {
        // eslint-disable-next-line
        if (posts._id == result._id) {
          return result;
        } else {
          return posts;
        }
      });
      setData(newData);
      console.log(result);
    });
  }

  // function to make comment 
  const makeComment = (text, id) => {
    if(text==""){
      notifyA("nothing posted")
      return;
    }
    // console.log("postID" + id)

    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
        text: text,
      })
    }).then(res => res.json()).then((result) => {
      const newData = data.map((posts) => {
        // eslint-disable-next-line
        if (posts._id == result._id) {
          return result;
        } else {
          return posts;
        }
      })
      setData(newData);
      // console.log(new)
      setComment("")});
      notifyB("comment posted")

  }

  // FUNCTION TO SHOW COMMENT  AND HIDE
  const toogleComment=(posts)=>{
    if(show){
      setShow(false);
    }
    else{
      setItem(posts);
      // console.log(item)
       setShow(true);

    }
  }


  return (

    <div className="home">
      {/* card */}

      {data.map((posts) => {
        return (


          <div className="card">
            {/* cardheader */}
            <div className="card-header">
              <div className="card-pic">
                <img src={posts.postedBy.Photo?posts.postedBy.Photo:xxx} alt="" />
              </div>
              <h5>
                <Link to={`/profile/${posts.postedBy._id}`}>
                {posts.postedBy.name}
                </Link>
              
                </h5>
            </div>
            {/* card image */}
            <div className="card-image">
              <img src={posts.photo} alt="" />
            </div>
            {/* card content */}
            <div className="card-content">
              {
                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => { unlikePost(posts._id) }}>favorite</span> : <span className="material-symbols-outlined" onClick={() => { likePost(posts._id) }}>favorite</span>
              }
              <p>{posts.likes.length} Likes</p>
              <p>{posts.body}</p>
              <p style={{fontWeight:"bold" ,cursor:"pointer"}} onClick={()=>{toogleComment(posts)}}>View all comments</p>
            </div>
            {/* comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined">
                mood
              </span>

              <input type="text" placeholder='Add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
              <button className="comment" onClick={() => {   makeComment(comment, posts._id) }}><span className="material-symbols-outlined">
                send
              </span></button>
            </div>

          </div>
        )
      })}

      {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}

      {/* {show comment } */}

      {show &&(
      <div className="showComment">
        <div className="container">
          <div className="postPic">
            <img src={item.photo} alt="" />
          </div>
          <div className="detail">
            {/* CARD HEADER  */}
            <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
              <div className="card-pic">
                <img src={images} alt="" />
              </div>
              <h5>{item.postedBy.name}</h5>
            </div>
            {/* COMMENT SECTION  */}
            <div className="comment-section" style={{ borderBottom: "1px solid #00000029" , overflow:"scroll" }}>
              
              {item.comments.map( (comment)=>{
              return(<p className="comm">
               <span className="commenter" style={{ fontWeight: "bolder" }}> 
                {/* working here */}
                {comment.postedBy.name } 

                </span>
                <span className="commentText">{comment.comment}</span>
              </p>)
              })}
              
              
            </div>
            {/* card content */}
            <div className="card-content">
              <p>{item.likes.length} Likes</p>
              <p>{item.body}</p>
            </div>
            {/* ADD comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined">
                mood
              </span>

              <input type="text" placeholder='Add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
              <button className="comment"
               onClick={() => {
                 toogleComment()
                 makeComment(comment, item._id) }}
              ><span className="material-symbols-outlined">
                  send
                </span></button>
            </div>


          </div>
        </div>
        <div className="close-comment">
          <span className="material-symbols-outlined material-symbols-outlined-comment" onClick={()=>{toogleComment()}}>
            close
          </span>
        </div>
      </div>)
      }



    </div>
  )
}

// import React from 'react'
// import images from '../img/images.jpg'
// import "./PostDetail.css"
// function PostDetail({ item, toogleDetails }) {
//    const removePost=(postId)=>{

//       console.log(postId)
//       fetch(`http://localhost:5000/deletePost/${postId}`,{
//         method:"delete",
//         headers:{
//             "Authorization": "Bearer " + localStorage.getItem("jwt")
//           }

//       })
//     }


//     return (

//         <div className="showComment">
//             <div className="container">
//                 <div className="postPic">
//                     <img src={item.photo} alt="" />
//                 </div>
//                 <div className="detail">
//                     {/* CARD HEADER  */}
//                     <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
//                         <div className="card-pic">
//                             <img src={images} alt="" />
//                         </div>
//                         <h5>{item.postedBy.name}</h5>
//                         <div className="deletePost">
//                             <span className="material-symbols-outlined" onClick={()=>{removePost(item._id)}}>
//                                 delete
//                             </span>
//                         </div>
//                     </div>
//                     {/* COMMENT SECTION  */}
//                     <div className="comment-section" style={{ borderBottom: "1px solid #00000029", overflow: "scroll" }}>

//                         {item.comments.map((comment) => {
//                             return (<p className="comm">
//                                 <span className="commenter" style={{ fontWeight: "bolder" }}>
//                                     {/* working here */}
//                                     {comment.postedBy.name}

//                                 </span>
//                                 <span className="commentText">{comment.comment}</span>
//                             </p>)
//                         })}


//                     </div>
//                     {/* card content */}
//                     <div className="card-content">
//                         <p>{item.likes.length} Likes</p>
//                         <p>{item.body}</p>
//                     </div>
//                     {/* ADD comment */}
//                     <div className="add-comment">
//                         <span className="material-symbols-outlined">
//                             mood
//                         </span>

//                         <input type="text" placeholder='Add a comment'
//                         // value={comment} 
//                         // onChange={(e) => { setComment(e.target.value) }}
//                         />
//                         <button className="comment"
//                         //  onClick={() => {
//                         //    toogleComment()
//                         //    makeComment(comment, item._id) }}
//                         ><span className="material-symbols-outlined">
//                                 send
//                             </span></button>
//                     </div>


//                 </div>
//             </div>
            
//             <div className="close-comment">
//                 <span className="material-symbols-outlined material-symbols-outlined-comment"
//                     onClick={() => { toogleDetails() }}
//                 >
//                     close
//                 </span>
//             </div>
//         </div>
        
//         )
// }

// export default PostDetail

import React,{useContext}from 'react'
import download from '../img/download.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'
export  default function Navbar({login}) {
  const navigate=useNavigate()
   const {setModalOpen}=useContext(LoginContext)
  const loginStatus=()=>{
    const token =localStorage.getItem("jwt")
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXX"+login)
    if(login||token){
       return [
        <>
         <Link to="/profile">
        <li>Profile</li>
       </Link>
       <Link to="/createPost">
        <li>Create-post</li>
       </Link>
       <Link to="/followingpost" style={{marginLeft:"20px"}}>My Following</Link>
       <Link to={""}>
        <button className="primaryBtn" onClick={()=>setModalOpen(true)}>
          Log Out
        </button>
       </Link>
        </>
       ]
    }
    else{
      return [
      <>
         <Link to="/signUp">
        <li>SignUp</li>
       </Link>
       <Link to="/signIn">
        <li>SignIn</li>
       </Link>
      </>
    ]}



  }


  return (
    <div className="navbar">
      <img src={download} alt=""  onClick={()=>{navigate("/")}}/>
      <ul className="nav-menu" >
       {loginStatus()}
      </ul>

    </div>
  )
}



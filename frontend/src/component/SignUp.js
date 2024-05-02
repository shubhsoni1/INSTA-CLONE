
import {React,useState} from 'react'
// import {useEffect} from 'react'
import download from '../img/Instagram_logo.svg.png'
import {  toast } from 'react-toastify';


import { Link,useNavigate } from 'react-router-dom'
import "./SignUp.css"

export default function SignUp() {
  const navigate=useNavigate();
  //  const fetchdat=async()=>{
  //     const response=await fetch("http://localhost:5000/");
  //     const data= await response.json();
  //     console.log(data)


  //  }
  //  useEffect(()=>{
  //     fetchdat();
  //  },[])
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [userName,setUserName]=useState("");
 const [password,setPassword]=useState("");


 const notifyA = (msg) => toast.error(msg)
 const notifyB = (msg) => toast.success(msg)

 const emailregex= (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
//  const passwordregex = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

 const postData=()=>{
   // console.log({
     //   name,userName,password,email
     // })
     
    //  sending data to server 
    // server take both key and value
    if(!emailregex.test(email)){ 
      notifyA("fill correct email")
      return;
    }
    // if(!passwordregex.test(passwordregex)){
    //   alert("PASSWORD IS NOT STRONG")
    //   return;
    // }
  
    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          navigate("/signIn")
          notifyB(data.message)
          
        }
      
      
        console.log(data)
      });
  

 }





  return (
    <div className='signUp'>
      <div className="form-container">

        <div className="form">


        <img src={download} alt="" className="signUpLogo" />
        <p className="loginPara">signUp to see photos and videos
          from your friends.
        </p>
        <div >
          <input type="email" name="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)} }placeholder='xyz@email.com' />
        </div>
        <div>
          <input type="text" name="name" id="name" placeholder='Full Name'  value={name} onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div>
        <input type="text" name="username" id="username" placeholder='Username'  value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
        </div>
        <div>
          <input type="password" name="password" id="password" placeholder='Password'  value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>

        <p className="loginPara" style={{fontSize:"12px",margin:"3px 0px"}}>
          by signup ,you agree to out term,privacy policy and cookies policies
        </p>
        
          <input type="submit" id ="submit-btn" value="Sign Up" onClick={()=>{postData()}}  />

        </div>
        <div className="form2">
          Already have an account ?
         <Link to={"/signIn"}>

          <span  style={{cursor: "pointer", color:" #1773EA"}}  >Sign In</span>
         </Link>
        </div>

      </div>

    </div>
  )
}

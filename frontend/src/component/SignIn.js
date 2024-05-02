import {React,useState,useContext} from 'react'
import { LoginContext } from "../context/LoginContext";
import "./SignIn.css";
import download from '../img/Instagram_logo.svg.png'
import { Link ,useNavigate} from 'react-router-dom';
import {  toast } from 'react-toastify';
export default function SignIn() {
  // adding global variable 
  const {setUserLogin}=useContext(LoginContext)
  
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyA =(a)=>toast.error(a);
  const notifyB =(a)=>toast.success(a);

  const emailregex= (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  const postdata=()=>{
     
    if(!emailregex.test(email)){ 
      notifyA("fill correct email")
      return;
    }

   
     fetch("http://localhost:5000/signIn",{
     method:"post",
     headers:{
      "Content-Type":"application/json"
     },
     body:JSON.stringify({
      email:email,
      password:password
     })
     
     }).then(res=>res.json()).then((data)=>{
      if(data.error){
         notifyA(data.error);
      }
      else{
        // console.log(data)
        notifyB("You Are Loggedin ");
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        setUserLogin(true)
        navigate("/")
      }


      
      })
     

  }


  return (
    <div className="signIn">
         <div>
          <div className="loginForm">
          <img src={download} alt="" className="signUpLogo" />
          <div><input type="email" name="email" id="email"
          placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/></div>
          <div><input type="password" name="password" id="password"
          placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} /></div>
          <div>
          <input type="submit" id="login-btn"value="Sign In" onClick={()=>{postdata()}} />
                     
          </div>
          </div>
          <div className="loginForm2">
               Don't have an account ?
               <Link to="/SignUp">
               <span style={{cursor: "pointer", color:" #1773EA"}}>Sign Up</span>
               </Link>
          </div>


          
         </div>
   
    </div>
  )
}

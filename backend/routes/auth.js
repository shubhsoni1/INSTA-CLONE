const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {Jwt_secret}=require("../keys.js");
// const requirelogin = require("../middlewares/requirelogin.js");
const USER=mongoose.model("USER");



// Home route
router.get('/',(req,res)=>{
    res.json("hellow234s")
    

})

// during signup we generally use post method

router.post("/signup",(req,res)=>{
const {name,userName,email,password}=req.body;

if(!name||!userName||!email||!password){
   return res.status(422).json({error:"fill all credentials"})
}

USER.findOne({$or:[{email:email},{userName:userName}]}).then((saveuser)=>{
   if(saveuser){
    return res.status(422).json({error:"User already exists"})
   }
   bcrypt.hash(password,12).then((hashedPassword)=>{
  
    //  password=hashedPassword;
    const user = new USER({
     name,
     email,
     userName,
     password:hashedPassword
    })
    user.save().then(user=>{res.json({message:"registered sucessfully"})})
    .catch(err=>{console.log(err)})
   })


})
 
})

// during signin 
router.post("/signIn",(req,res)=>{

const {email,password}=req.body;
if(!email||!password){
    return res.json({error:"please fill all credentials"})
}

USER.findOne({email:email}).then((saveduser)=>{
    if(!saveduser){
        return res.status(422).json({error:"invalid email"})
    }


    bcrypt.compare(password,saveduser.password).then((ok)=>{
      if(ok){
        // return res.status(200).json({message:"you are loggedin "})
        const token =jwt.sign({id:saveduser.id},Jwt_secret)
        
        const{_id,userName,email,name}=saveduser;
        // console.log(name)
        // console.log({token,user:{_id,userName,email,name}})
        return res.json({token,user:{_id,userName,email,name}});
      }
      else{
        return res.status(422).json({error:"Invalid password"});
      }
    
    }).catch(err=> console.log(err))
      
})



})



module.exports=router;


// signin ======>signIn
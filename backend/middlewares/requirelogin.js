const jwt=require("jsonwebtoken");
const {Jwt_secret}=require("../keys");
const mongoose =require("mongoose")
 const USER=mongoose.model("USER")


module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        console.log("HIIIII")
        return res.status(401).json({error:"you must logged in 1"})
    }
    const token =authorization.replace("Bearer ","")
    jwt.verify(token,Jwt_secret,(err,payload)=>{
          if(err){
        return res.status(401).json({error:"you must logged in 2"})
        }
            const _id=payload.id
            USER.findById(_id).then(userData=>{
                req.xyz=userData;
            // console.log(userData)
            next();
        })
        
    })
    // console.log(token)
}
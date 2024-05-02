const express =require("express");
const router  = express.Router();
const mongoose =require("mongoose");
const POST=mongoose.model("POST");

const requirelogin = require("../middlewares/requirelogin");
// Route
router.post("/createpost",requirelogin,(req,res)=>{

 const {pic,body}=req.body;
  
 if(!pic||!body){
  return res.status(422).json({error:"FILL ALL FIRST"})
 }
 
  
  const post= new POST({
    photo:pic,
    body:body,
    postedBy:req.xyz
  })
  post.save().then((result)=>{
  return res.json({post:result})
  }).catch(err=>console.log(err))
})

// fetching post at home 
router.get("/allpost",requirelogin,(req,res)=>{
  POST.find().populate("postedBy","_id name Photo").populate("comments.postedBy","_id name").sort("-createdAt").then(post=>res.json(post)).catch(err=>console.log(err))

})
// fetching post on profile
router.get("/myposts",requirelogin,(req,res)=>{
  POST.find({ postedBy:req.xyz._id}).populate("postedBy","_id name").populate("comments.postedBy","_id name").sort("-createdAt").then(userdetail=>{
    res.json(userdetail)
  })
  // console.log(req.xyz)



})

// LIKES

router.put("/like",requirelogin,(req,res)=>{
POST.findByIdAndUpdate(req.body.postId,{
  $push:{likes:req.xyz._id}
},{
  new:true
}).populate("postedBy","_id name Photo").exec((err,result)=>{
  if(err){
    return res.status(422).json({error:err})
  }
   else{
    res.json(result)
   }
})


})

//  UNLIKE
router.put("/unlike",requirelogin,(req,res)=>{
  POST.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.xyz._id}
  },{
    new:true
  }).populate("postedBy","_id name Photo").exec((err,result)=>{
    if(err){
      
      return res.status(422).json({error:err})
    }
     else{
      res.json(result)
     }
  })
  
  
  })
  
// ADDING COMMENT TO BACKEND 
router.put("/comment",requirelogin,(req,res)=>{

     const comment={
      comment:req.body.text,
      postedBy:req.xyz._id
     }
    console.log({"postID":req.body.postId,"text":req.body.text,"postedBy":req.xyz._id})
     
   POST.findByIdAndUpdate(req.body.postId,{
           $push:{comments:comment}
   },{
    new:true
   }).populate("comments.postedBy","_id name").populate("postedBy","_id name Photo").exec((err,result)=>{
    if(err){
      
      return res.status(422).json({error:err})
    }
     else{
      res.json(result)
     }
  })

})

// Api to delet post
router.delete("/deletePost/:postId",requirelogin,(req,res)=>{
  POST.findOne({_id:req.params.postId}).
  populate("postedBy","_id").
  exec((err,post)=>{
    if(err||!post){
      return res.status(422).json({error:err})
    }
    if(post.postedBy._id.toString()==req.xyz._id.toString()){
      post.remove().then(result=>{
        
        // console.log("Returning from here ")
          return res.json({message:"Sucessfully deleted"})
         }).catch((err) => {
          console.log(err)
      })
      }
  })
  
})

// 
module.exports=router;
const express =require("express");
const router  = express.Router();
const mongoose =require("mongoose");
const POST=mongoose.model("POST");
const USER=mongoose.model("USER")
const requieLogin=require("../middlewares/requirelogin");
const requirelogin = require("../middlewares/requirelogin");


// to get user profile

 router.get("/user/:id",(req,res)=>{

  USER.findOne({_id:req.params.id}).select("-password").then(user=>{
    // console.log(user)
    // res.json(user)
    POST.find({postedBy:req.params.id}).populate("postedBy","_id").exec((err,post)=>{
             if(err){
                return res.status(422).json({error:err})
             }
             console.log("backend pe aa rahi hai ")
             res.status(200).json({user,post})
    })    
  }).catch(err=>{
    return res.status(404).json({error:"User not found"})
  })


})

// to follow user 
router.put("/follow",requieLogin,(req,res)=>{
  USER.findByIdAndUpdate(req.body.followId,{
     $push:{followers:req.xyz._id}
  },{
    new:true
  },(err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    USER.findByIdAndUpdate(req.xyz._id,{
      $push:{following:req.body.followId}
    },{
      new:true
    }).then(result=>res.json(result)).catch(err=>{return res.status(422).json({error:err})})

  })
})

// unfollow
router.put("/unfollow",requieLogin,(req,res)=>{
  USER.findByIdAndUpdate(req.body.followId,{
     $pull:{followers:req.xyz._id}
  },{
    new:true
  },(err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    USER.findByIdAndUpdate(req.xyz._id,{
      $pull:{following:req.body.followId}
    },{
      new:true
    }).then(result=>res.json(result)).catch(err=>{return res.status(422).json({error:err})})

  })
})

// to show following post
router.get("/myfollowingpost",requieLogin,(req,res)=>{
    POST.find({postedBy:{$in:req.xyz.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
     .then(posts=>{
      res.json(posts)
     }).catch(err=>{console.log(err)})

})

// to uploadprofilepic

router.put("/uploadProfilePic",requirelogin,(req,res)=>{
          
       USER.findByIdAndUpdate(req.xyz._id,{
        $set:{Photo:req.body.pic}
       },{
        new:true
       }).exec((err,result)=>{
           if(err){
            res.status(422).json({error:err})
           }
           else{
            res.json(result)
           }

       })
})


module.exports=router;
const mongoose= require("mongoose")


const {ObjectId}=mongoose.Schema.Types;
const postSchema =new mongoose.Schema({
     //   titleeeeee:{
     //    type:String,
     // //    required:true
     //   },

       body:{
            type:String,
            required:true
       },
       likes:[{
          type:ObjectId,
          ref:"USER"
       }],
       comments:[{
           comment:{type:String},
           postedBy:{type:ObjectId, ref:"USER"}

       }]
       ,
       photo:{
        type :String,
        default:"no photo"
       },

       postedBy:{
        type:ObjectId,
        ref:"USER"

       }



},{timestamps:true})

mongoose.model("POST",postSchema)



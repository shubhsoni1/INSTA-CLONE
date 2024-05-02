// const http =require("http");

// const server=http.createServer((req,res)=>{
//    console.log("server created");
//    res.end("working");

// });

// server.listen(5000,"localhost",()=>{
//     console.log("server running on 5000");
// })


// ###################################################################
//    CREATING SECOND TIME
// ###################################################################

// we cannot send two response in one hit of end point 

// const express=require("express")
// const app=express();
// const PORT=5000;
// const cors=require("cors")
// const data=require("./filebasedmodule.js")
// app.use(cors());
// app.get('/',(req,res)=>{

//     // res.json(({
//     //     name:"shubh",
//     //     study:"collageeeemxmx"
//     // }))

//     res.json(data);

//     // res.end("hii there")
// })
// app.get('/about',(req,res)=>{

//     res.json("about page ")
//     // res.end("hii there")
// })

// app.listen(PORT,()=>{
//     console.log("running"+PORT);
// })


// ###################################################################
//    CREATING THIRD TIME
// ###################################################################


// running server
const express=require("express");
const app=express();
const PORT=5000;
// cors pakage for connecting to dif port servers for sequrity issues
const cors=require("cors");
app.use(cors())
// the mongoose connection
const mongoose=require("mongoose");
const {mongoUrl}=require("./keys.js");
mongoose.connect(mongoUrl);
mongoose.connection.on("connected",()=>{
    console.log("sucessfully connect to mongodb")
})
mongoose.connection.on("error",()=>{
    console.log("not connected to mongodb")
})
// importing models
require("../backend/models/model.js");
require("./models/post.js")
// body parser for json parsing 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// middleware for diverting hitted nodes
app.use(require("./routes/auth.js"))
app.use(require("./routes/createpost.js"))
app.use(require("./routes/user.js"))               







// app.get("/",(req,res)=>{

//     res.json(({"shubh":"trueeeexyz"}))

// })

app.listen(PORT,()=>{
    console.log("server is running ");
})


// app.use are generally used to run middleware function;
// ex cors,Router();
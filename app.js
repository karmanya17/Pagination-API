const express=require("express");
const app=express();
const mongoose=require("mongoose");
const User=require("./model/user");
mongoose.connect("mongodb://localhost:27017/pagination");
const db=mongoose.connection;
db.once("open",async function(){
  if(await User.countDocuments().exec()>0) return
  for(var i=1;i<20;i++)
  {
    await User.create({name:`user ${i}`})
  }

}).then(function(){
    console.log("user created");
  })
// const users=[
//   {id:1,name:"user 1"},
//   {id:2,name:"user 2"},
//   {id:3,name:"user 3"},
//   {id:4,name:"user 4"},
//   {id:5,name:"user 5"},
//   {id:6,name:"user 6"},
//   {id:7,name:"user 7"},
//   {id:8,name:"user 8"},
//   {id:9,name:"user 9"},
//   {id:10,name:"user 10"},
//   {id:11,name:"user 11"},
//   {id:12,name:"user 12"},
//   {id:13,name:"user 13"},
//   {id:14,name:"user 14"}
// ]
app.get("/api",paginatedResults(User),function(req,res){
  res.json(res.paginatedResults)
})

//Middleware for pagination
 function paginatedResults(model){
  return async function(req,res,next){
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    const results={};
    if(endIndex<await model.countDocuments(){
      results.next={
        page:page+1,
        limit:limit
      }
    }

    if(startIndex>0){
      results.previous={
        page:page-1,
        limit:limit
      }
    }
    try{
      results.results=await model.find().limit(limit).skip(startIndex);
      res.paginatedResults=results;
      next();
    }
    catch(err){
      console.log(err);
    }

  }
}



app.listen(3000,function(req,res){
  console.log(3000);
})

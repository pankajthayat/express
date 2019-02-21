const { MongoClient, ObjectID }=require("mongodb");  
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log("unable to connect to mongodb server");
    }
    console.log("connected to mongodb server");
    const db=client.db("TodoApp");
    
    db.collection("todos").findOneAndUpdate({
        _id:new ObjectID('5c61735c059e1710d8837351')
    },{
        $set:{
            completed:false
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result)
    })
        
        //2nd arg is update operater...refer docs... we have to use update operator..else update will not work
  // 3rd options...by default it is return original means it will return the origenal document not the updated one
  // we update one so set it false
  
  
    // client.close();// commenting bcz it would interfere with the code above
});

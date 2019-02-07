

const MongoClient=require("mongodb").MongoClient;  
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log("unable to connect to mongodb server");
    }
    console.log("connected to mongodb server");
    const db=client.db("TodoApp");
    //query base on completed value
    db.collection("Todos").find({completed:true}).toArray().then((docs)=>{
        console.log("Todos");
        console.log(JSON.stringify(docs,undefined,2))

    },(err)=>{
        console.log("unable to fetch:",err)
    })

   // client.close();// commenting bcz it would interfere with the code above
});

// docs : node mongo native
// wecan pass a callback fn in the toArray or count method or call a promisegitb
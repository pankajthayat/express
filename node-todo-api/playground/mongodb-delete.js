

const MongoClient=require("mongodb").MongoClient;  
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log("unable to connect to mongodb server");
    }
    console.log("connected to mongodb server");
    const db=client.db("TodoApp");
    //deletMany
    // db.collection('Todos').deleteMany({text:"Eat Lunch"}).then((result)=>{
    //     console.log(result);
    // });
    // db.collection("Todos").deleteOne({text:"Eat Lunch"}).then((result)=>{
    //     console.log(result);
    // })

    // db.collection("Todos").findOneAndDelete({completed:false}).then((r)=>{
    //     console.log(r);

    // })
   // client.close();// commenting bcz it would interfere with the code above
});

// mongo client lets us connect to mongo server

const {MongoClient, ObjectID } =require("mongodb");// pull off mongo client from mongodb lib
//  no need to create before using it like others..just give name u want.. mongo will not create db until we start using
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log("unable to connect to mongodb server");
    }
    console.log("connected to mongodb server");
    const db=client.db("TodoApp");
    db.collection('todos').find().count().then((count)=>{
        console.log("Todos");
        console.log(`total count : ${count}`);
    },(err)=>{
        console.log("error : ",err)
    });

    //client.close();
});


// count and toArray are just method in mongoose

/// in docs there is a callback for count...but we can provide a promise too.
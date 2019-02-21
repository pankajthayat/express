// mongo client lets us connect to mongo server

const {MongoClient, ObjectID } =require("mongodb");// pull off mongo client from mongodb lib
//  no need to create before using it like others..just give name u want.. mongo will not create db until we start using
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log("unable to connect to mongodb server");
    }
    console.log("connected to mongodb server");
    const db=client.db("TodoApp");
    db.collection('todos').find({
        _id: new ObjectID('5c617366059e1710d8837352')
    }).toArray().then((docs)=>{
        console.log("Todos");
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log("error : ",err)
    });

    //client.close();
});
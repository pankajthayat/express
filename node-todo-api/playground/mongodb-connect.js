// mongo client lets us connect to mongo server

const MongoClient=require("mongodb").MongoClient;// pull off mongo client from mongodb lib
//  no need to create before using it like others..just give name u want.. mongo will not create db until we start using
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log("unable to connect to mongodb server");
    }
    console.log("connected to mongodb server");
    const db=client.db("TodoApp");
    db.collection("Users").insertOne({
        _id:123,
        name:"pankaj",
        place:"bangalore"
    },(err,result)=>{
        if(err){
                    return console.log("unable to insert into user",err);
                }
                console.log(JSON.stringify(result.ops,undefined,2));
    })
    //we can give our own id as well in mongob

    client.close();
});// takes 2 string.. url where db lives.. in prod aws,heroku...here its local, 2nd arg is callback fn

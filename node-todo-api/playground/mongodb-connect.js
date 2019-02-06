// mongo client lets us connect to mongo server
const assert=require('assert'); // what is assert
const MongoClient=require("mongodb").MongoClient;// pull off mongo client from mongodb lib
//  no need to create before using it like others..just give name u want.. mongo will not create db until we start using
const client=new MongoClient('mongodb://localhost:27017');
client.connect((err)=>{
    if(err){
        return console.log("unable to connect to mongodb server");
    }
    console.log("connected to mongodb server");

    const db=client.db();
    db.collection('Todos').insertOne({
        text:"something"
    })

    client.close();
});// takes 2 string.. url where db lives.. in prod aws,heroku...here its local, 2nd arg is callback fn

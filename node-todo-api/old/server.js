var express=require('express');
var bodyparser=require("body-parser");

var {mongoose }=require('./db/mongoose');
var {Todo}=require("./models/todo");
var {User}=require("./models/user");

var app=express();

app.use(bodyparser.json());// bodyparser.json() return a fn that we need to send... that converts json to obj

app.post('/todos',(req,res)=>{
    // console.log(req.body)
    var todo=new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get("/todos",(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos}) // we are wrapping todo arrya in object so that we can send more data in future

    },(e)=>{
        res.status(400).send(e);
    })
})


app.get("/todos/:id",(req,res)=>{
    var id=req.params.id
    
   // res.send(req.params);
})

app.listen(3000, ()=>{
    console.log("started on port 3000")
})
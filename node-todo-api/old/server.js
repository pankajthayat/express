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




//////////////////////////////////////////////

////old+1

// after connect create model ... by using model more orgernise..
// in mongodb inside collection we can have anything as we saw in mongobd native in playground...but mondoose keep things more orgernised by creating model

var User=mongoose.model("User",{
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    }
})

var user=new User({
    email:"pankajthayat@gmail.com"
})
user.save().then((doc)=>{
    console.log("User saved : ",doc); //  __v comes from mongoose.. its version ..it keeps track of varios model change
},(e)=>{
    console.log("unable to save User : ",e)
});

/*
var Todo=mongoose.model('Todo',{
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    //specify details about attributes inside object
    completed:{
        type:Boolean,
        default:true
    },
    completedAt:{
        type:Number,
        default:null
    }
})// 1st name of model...2nd properties

var newTodo=new Todo({
    text:"edit video" // if text= number..then pass..mongoose typecast..but if text==obj..then error
});
// if we see db..it auto craete a collection if doesnot find a one...it auto lowercase and pluralise the namme
//Todo will become todos

newTodo.save().then((doc)=>{
    console.log("saved Todo : ",doc); //  __v comes from mongoose.. its version ..it keeps track of varios model change
},(e)=>{
    console.log("unable to save : ",e)
});

*/


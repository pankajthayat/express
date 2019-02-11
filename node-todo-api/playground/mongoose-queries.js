const { mongoose } =require("./../server/db/mongoose")
const { Todo }=require("./../server/models/todo");

var id='5c617366059e1710d8837352';

//var id='5c617366059e1710d8837352'; if our id doest present in collection we will get null.. 
// if our id has wrong format (like add new string at the back) we will get error....so catch this error or use ObjectId.. and check if the id is valid


Todo.find({
    _id:id
}).then((todos)=>{
    console.log("Todos ",todos)
})

Todo.findOne({
    _id:id  
}).then((todo)=>{
    console.log("Todo ",todo);
})


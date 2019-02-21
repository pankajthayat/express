const { mongoose } =require("./../server/db/mongoose")
const { Todo }=require("./../server/models/todo");
const {ObjectID}=require("mongodb");

var id='5c617366059e1710d8837352';


//var id='5c617366059e1710d8837352'; if our id doest present in collection we will get null.. 
// if our id has wrong format (like add new string at the back) we will get error....so catch this error or use ObjectId.. and check if the id is valid

if(!ObjectID.isValid(id)){
    console.log("ID is not valid");
}

Todo.find({
    _id:id  // mongoose auto convert it into ObjectId no need to pass ObjectID obj
}).then((todos)=>{
    console.log("Todos ",todos)
})

Todo.findOne({
    _id:id  
}).then((todo)=>{
    console.log("Todo ",todo);
}).catch((e)=>{console.log(e)})
// monggosejs.com...docs... what happen when id is incorrect...we dont want code to fail...handle it
//

Todo.findById(id).then((todo)=>{
    
    if(!todo){
        return console.log("Id not found");
    }
    console.log("Todo by id ",todo);
}).catch((e)=>{console.log(e)})

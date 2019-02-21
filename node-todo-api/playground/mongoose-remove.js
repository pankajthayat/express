const { mongoose } =require("./../server/db/mongoose")
const { Todo }=require("./../server/models/todo");
const {ObjectID}=require("mongodb");

//Todo.findOneAndRemove

Todo.findByIdAndRemove('5c5d76a147d7340d78ef4391',(todo)=>{
console.log(todo)
})

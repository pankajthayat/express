var mongoose=require('mongoose');

mongoose.Promise==global.Promise; // to tell mongoose use built in promise as opposed to 3r party..
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo=mongoose.model('Todo',{
text:{
type:String
},
completed:{
type:Boolean
},
completedAt:{
type:Number
}
});
// takes 2 args...1st name, 2nd object: define varios properties for a model
//todo model..creating.mongose model so that mongoose know how to store our data

var newTodo=new Todo({
    text:"Cook dinner"
});// constr.. fn ...expept arg but we can or not


newTodo.save().then((doc)=>{
console.log("Saved todo ",doc);
},(e)=>{
    console.log("unable to save");
});
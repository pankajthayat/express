var {mongoose }=require('./db/mongoose');
mongoose.Promise=global.Promise;
// we are telling mongoose we use built in promise
//mongoose support callback by defalt ..but we will use propmise

mongoose.connect('mongodb://localhost:27017/TodoApp');
// after connect create model ... by using model more orgernise..
// in mongodb inside collection we can have anything as we saw in mongobd native in playground...but mondoose keep things more orgernised by creating model

var Todo=mongoose.model('Todo',{
    text:{
        type:String
    },
    //specify details about attributes inside object
    completed:{
        type:Boolean
    },
    completedAt:{
        type:Number
    }
})// 1st name of model...2nd properties

var newTodo=new Todo({
    text:'cook dinner'
});
// if we see db..it auto craete a collection if doesnot find a one...it auto lowercase and pluralise the namme
//Todo will become todos
newTodo.save().then((doc)=>{
    console.log("saved Todo : ",doc); //  __v comes from mongoose.. its version ..it keeps track of varios model change
},(e)=>{
    console.log("unable to save")
});


// app.listen(3000, ()=>{
//     console.log("started on port 3000")
// })
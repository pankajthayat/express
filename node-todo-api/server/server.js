var express = require('express');
var bodyParser = require('body-parser');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
app.use(bodyParser.json());//midllware=>return value of this method is middl.. here
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e); //httpstatus.com
    })
});
// body pasrse takes json and convert into obj

app.get('/todos',(req,res) => {
    Todo.find().then((todos)=>{
        console.log("data sent : ")
        res.send({
            todos// we could have sent array but we will lock our self we will not be able to add things in response in future...so use obj

        }), (e)=>{
            console.log("error ", e);
            res.status(400).send(e);
        }
})
});






 app.listen(3000,()=>{
     console.log('started on port 3000');
 })
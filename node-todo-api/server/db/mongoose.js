var mongoose=require('mongoose');

mongoose.Promise==global.Promise; // to tell mongoose use built in promise as opposed to 3r party..
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports={mongoose}
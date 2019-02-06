const express=require('express');
const fs=require("fs")
// views is the default dir express use

var app=express();
const hbs=require("hbs");// handlebar

app.set("view engine",'hbs');
hbs.registerPartials(__dirname+"/views/partials");// dir name for partials

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})// so that we dont have to call same fn again and again

hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase(text);
})// we can even set a fn that takes args

//app.set('views', 'someOtherFolder') to set deafult dir to some other folder

app.use((req,res,next)=>{
    res.render("maintenance.hbs");
})
// middleware gets called in the order they are defined.. 1st 2nd 3rd

app.use(express.static(__dirname+"/public"))// .use is used to add middleware
//client : app,brower, i phone or any
app.use((req,res,next)=>{

    var now=new Date().toString();
    let log= `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err)
        console.log("unable to append to the srver.log");
    });
    next();// it is to tell express that we done with other works
// if we dont use next().. req will never get fired...
})// .use takes one fn



app.get('/',(req,res)=>{
 


res.render('home.hbs',{
    pageTitle:"Home Page",
    welcomeMsg:"Welcome  to Home Page"
})
});
// if we dont call next the .get will never get executed
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page'
    });
})
// for passing the props..to make the template dynamic
app.get('/bad',(req,res)=>{
    //res.send("error");
    res.status(400).send("error")
})

//res.send(body, status): Use res.status(status).send(body)

app.listen(3000,()=>{
console.log("server is up on port 3000");
});// it can take a 2nd arg.. its optional..its fn.. it let us do sth when the server is up;
// get expect two argument 1st url... in our case the root... 
//2nd is function for sendening res back...and it has two arg




//middleware----------1. If a middleware sends a response back to the client, it doesn't need to call next.
//1. If a middleware sends a response back to the client, it doesn't need to call next.
//2. If a middleware only modifies a request, then it must call next so that the request is passed along to the next middleware/router handler.
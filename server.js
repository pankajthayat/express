const express=require('express');

// views is the default dir express use

var app=express();
const hbs=require("hbs");// handlebar
//app.use(express.static(__dirname+"/public")); // to add middleware....app.use take the mw function 
//How did render know where to get the html file
//That is Express' default behavior when it comes to res.render(). It'll look for a folder called 'views'. You can change it via:

app.set("view engine",'hbs');

//app.set('views', 'someOtherFolder')

app.get('/',(req,res)=>{
   // res.send("hello express");
  // res.send("<h1>hello express</h1>");
//   res.send({
//       name:"pankaj",
//       likes:[
//           'biking',
//           'cities'
//       ]
//   })
res.render('home.hbs',{
    pageTitle:"Home Page",
    welcomeMsg:"Welcome  to Home Page",
    currentYear:new Date().getFullYear()
})
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page',
        currentYear:new Date().getFullYear()
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
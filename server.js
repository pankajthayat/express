const express=require('express');

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


app.get('/',(req,res)=>{
 
res.render('home.hbs',{
    pageTitle:"Home Page",
    welcomeMsg:"Welcome  to Home Page"
})
});

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
const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

/* Using EJS */

// 'public' folder serves all the static files and makes them available for EJS files.
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.set("view engine","ejs");  // here app has a function '.set()' that sets the view engine to ejs.
app.set("views", path.join(__dirname,"/views"));

app.get("/",(req,res) => {
    res.render("home.ejs");  //.render() sends the file 'home.ejs'.
})

app.get("/hello",(req,res) => {
    res.send("hello");
})

/* Passing data to EJS */

app.get("/rolldice",(req,res) => {
    let diceVal =  Math.floor(Math.random() * 6) + 1;
    res.render("rollDice.ejs",{diceVal});
});

/* Instagram Page with EJS */

app.get("/ig/:username",(req,res) => { 
    const {username} = req.params;
    let instaData = require("./data.json");
    const data = instaData[username];
    if(data){
        res.render("instagram.ejs",{data});
    }
    else{
        res.render("noError.ejs");
    }
    
})

app.listen(port,() => {
    console.log(`listening to the port ${port}.`);
});

const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');
const { name } = require('ejs');

const app = express();

//convert data into json format
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');

app.use(express.static("public"));

app.get("/",(req,res) =>{
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

//Register user
app.post("/signup", async (req, res) =>{

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
       res.send("User Already exists.Plz choose a different username.")
    }else{
        //hash the password using brypt
        const saltRounds = 10;// Number of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;//Replace the hash password with original password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }  
});

app.post("/login", async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot found");
        }

        //compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch) {
            res.render("home");
        }else{
            req.send("wrong passord");
        }
    }catch{
           res.send("wrong Detaill")
    }
})


const port = 5000;
app.listen(port,() => {
    console.log(`Server running on port: ${port}`);
})
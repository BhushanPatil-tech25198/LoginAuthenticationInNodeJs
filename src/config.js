const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/loginSignup");


//check database connected or not

connect.then(() => {
    console.log("database connected successfully");
})
.catch(() =>{
    console.log("database cannot connected");
});

//Create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password:{
        type:String,
        require:true
    }
});

//collection port

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
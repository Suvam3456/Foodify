// Create krte vakt data ko database me (ex: signup ) schema chaiye hoga so using mongoose
// to create schema and export it to my database (gofoodmern) , models are used for data insertion as they are like a wrap for schema

const mongoose = require('mongoose')

const { Schema } = mongoose; // mongoose se schema nikalre ie destructuring hori yha

// Creating a schema for a user sign up in my react
const Userschema = new Schema({
 name: { type: String, required: true },
 location: { type: String, required: true},
 email: {type:String ,required :true},
 password: { type: String, required: true },
 date: { type: Date, default: Date.now},
});

module.exports= mongoose.model("users", Userschema)
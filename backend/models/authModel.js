//create Authentication model schema

const mongoose=require("mongoose");

const authModel=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:{ type: String, required: true },
    role:{type:String, enum:["admin","faculty","student"]}},
    {timestamps:true}
);

module.exports=mongoose.model("Authentication",authModel);

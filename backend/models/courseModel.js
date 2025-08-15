const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    duration:{
     type:String,
     required:true   
    },
    department:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Course",courseSchema);
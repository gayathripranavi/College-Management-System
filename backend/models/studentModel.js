//Student schema

const mongoose=require("mongoose");
const { schema } = require("./authModel");
const{Schema}=mongoose;

const studentSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"Authentication",
       required:true,
    },
    rollNumber:{
        type:String,
        unique:true, 
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    courses:
        {
            type:Schema.Types.ObjectId,
            ref:"Course",
        }
    

});

module.exports=mongoose.model("Student",studentSchema);
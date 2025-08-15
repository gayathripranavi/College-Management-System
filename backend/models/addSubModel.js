const mongoose=require("mongoose");
//const{Schema}=mongoose;

const addSubjectSchema=new mongoose.Schema({
    subjectName:{
        type:String,
        unique:true,
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    
    semester:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("AddSubject",addSubjectSchema);
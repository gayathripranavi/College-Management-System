const mongoose=require("mongoose");
const{Schema}=mongoose;

const subjectSchema=new Schema({
    subjectName:{
        type:String,
        unique:true,
        required:true
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"Course"
    },
    facultyId:{
        type:Schema.Types.ObjectId,
        ref:"Authentication"
    },
    semester:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("Subject",subjectSchema);
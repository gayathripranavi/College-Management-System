const Course=require("../models/courseModel");

//create

exports.createCourse=async(req,res)=>{
    try{
        //console.log(req.body)
        const course=new Course(req.body);
        const saved=await course.save();
        res.status(201).json(saved);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

//read all

exports.getCourse=async(req,res)=>{
    try{
        const courses=await Course.find();
        res.json(courses);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

//get course by id

exports.getCourseById=async(req,res)=>{
    try{
        const courseId=await Course.findById(req.params.id);
      //  console.log(req.params.id)
        res.json(courseId);
  }catch(err){
        res.status(500).json({error:err.message});
    }
}

// Update course by ID

exports.updateCourse=async(req,res)=>{
    try{

       const updateCourse=await Course.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if (!updateCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
       // console.log(updateCourse)
        res.json(updateCourse);
    }catch(err){
        res.json(400).json({error:err.message})
    }
}

//delete

exports.deleteCourse=async(req,res)=>{
    try{
        await Course.findByIdAndDelete(req.params.id);
        res.json({message:"course deleted"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
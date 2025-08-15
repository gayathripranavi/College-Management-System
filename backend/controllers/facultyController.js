const Faculty=require('../models/facultyModel');

// Create new faculty

exports.createFaculty=async(req,res)=>{
    try {
      //console.log(req.body);
    const { userId, employeeId, courseId, subjects } = req.body;
    const newFaculty = new Faculty({ userId, employeeId, courseId, subjects });
    await newFaculty.save();
    res.status(201).json({ message: 'Faculty created', faculty: newFaculty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//
exports.readFaculty=async(req,res)=>{
    try{
   
        const findFaculty=await Faculty.find();
        res.json(findFaculty);
    }catch(err){
         res.status(500).json({error:err.message});
    }
}

//delete

exports.deleteFaculty=async(req,res)=>{
    try{
        await Faculty.findByIdAndDelete(req.params.id);
        res.json({message:"course deleted"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.getFacultyById=async(req,res)=>{
  try{
    const facultyId= await Faculty.findById(req.params.id);
    res.json(facultyId);
  }catch(err){
    res.status(500).json({error:err.message});
  }
}

exports.updateFaculty=async(req,res)=>{
  try{
    const updateFaculty=await Faculty.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!updateFaculty){
      return res.status(404).json({error:'faculty not found'});
    }
    res.json(updateFaculty);
  }catch(err){
    res.json(400).json({error:err.message});
  }
}
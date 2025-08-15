const mongoose=require("mongoose");
const AddSubject=require('../models/addSubModel');



//create
exports.createSubject=async(req,res)=>{
    try{
        const subject=new AddSubject(req.body);
        const saved=await subject.save();
        res.status(201).json(saved);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}



exports.readSubject=async(req,res)=>{
    try{
   
        const findSub=await AddSubject.find();
        res.json(findSub);
    }catch(err){
         res.status(500).json({error:err.message});
    }
}


exports.getSubjectById=async(req,res)=>{
    try{
        const subId=await AddSubject.findById(req.params.id);
        res.json(subId);
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.updateSubject=async(req,res)=>{
    try{
        const update=await AddSubject.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!update){
            return res.status(404).json({error:'subject not found'});
        }
        res.json(update);
    }catch(err){
        res.json(400).json({error:err.message})
    }
}

exports.deleteSubject=async(req,res)=>{
    try{
       await AddSubject.findByIdAndDelete(req.params.id);
       res.json({message:'subject deleted'});
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
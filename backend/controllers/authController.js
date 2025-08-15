const express=require("express");

const User=require('../models/authModel');
const bcrypt=require('bcryptjs');
exports.createUser=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body;
        console.log(req.body)
           const oldUser= await User.findOne({email});
           if(oldUser)
           {
            return res.status(400).json({error: 'User exists'});
           }

    const hashed = await bcrypt.hash(password, 10)
    const user = new User({name,email, password: hashed ,role})
    console.log(user)
    await user.save()
    res.status(201).json({ message: 'Registered' })
    }catch(err){
        res.status(500).json({error:'Server error' });
    }
};

exports.login=async(req,res)=>{
    const { email, password } = req.body;
    console.log(req.body)
   try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' })

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid Email' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: 'Invalid Password' })

    // Login successful
    res.json({ message: 'Login successful', email: user.email ,role:user.role})
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }

};


//read all

exports.getUsers = async (req, res) => {
try {
const users = await User.find({role:'student'});
res.json(users);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

exports.getFaculty = async (req, res) => {
try {
const faculty = await User.find({role:'faculty'});
res.json(faculty);
} catch (err) {
res.status(500).json({ error: err.message });
}
};


exports.getAdmin=async(req,res)=>{
  try{
    const admin=await User.find({role:'admin'});
    res.json(admin);
  }catch(err){
    res.status(500).json({error:err.message});
  }
}

//get User by id

exports.getUserById=async(req,res)=>{
    try{
        const userId=await User.findById(req.params.id);
      //  console.log(req.params.id)
        res.json(userId);
  }catch(err){
        res.status(500).json({error:err.message});
    }
}

// Update user by ID

exports.updateUser=async(req,res)=>{
    try{
console.log(req.body)
       const updateUser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if (!updateUser) {
      return res.status(404).json({ error: 'User not found' });
    }
        console.log(updateUser)
        res.json(updateUser);
    }catch(err){
        res.json(400).json({error:err.message})
    }
}


//delete users

exports.deleteUser=async(req,res)=>{
  try{
    await User.findByIdAndDelete(req.params.id)
    res.json({message:'user deleted'})
  }catch(err){
    res.status(500).json({error:err.message});
  }
}

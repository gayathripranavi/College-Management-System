const express=require("express");
const router=express.Router();
const {createUser,login,getUsers,deleteUser,updateUser,getFaculty,getAdmin}=require('../controllers/authController');


router.post('/register',createUser);
router.post('/login',login);
router.get('/users',getUsers);
router.get('/faculty',getFaculty);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);
router.get('/admin',getAdmin);

module.exports=router;
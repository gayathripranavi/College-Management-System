const express=require("express");
const router=express.Router();
const {createStudent,getStudents,getStudentById,updateStudent}=require('../controllers/studentController');

router.post('/',createStudent);
router.get('/',getStudents);
router.get('/:id',getStudentById);
router.put('/:id',updateStudent);

module.exports=router;
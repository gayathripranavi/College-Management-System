const express=require("express");
const router=express.Router();
const {createSubject,readSubject,getSubjectById,updateSubject,deleteSubject,
    getSubjectByCourseId}=require('../controllers/addSubController');

router.post('/',createSubject);
router.get('/',readSubject);
router.get('/:id',getSubjectById);
router.put('/:id',updateSubject);
router.delete('/:id',deleteSubject);
//router.get('/:courseId',getSubjectByCourseId);
module.exports=router;
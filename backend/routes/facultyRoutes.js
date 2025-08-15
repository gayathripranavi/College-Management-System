const express=require('express');
const router=express.Router();
const{createFaculty,readFaculty,deleteFaculty,getFacultyById,updateFaculty}=require('../controllers/facultyController');
router.post('/',createFaculty);
router.get('/',readFaculty);
router.delete('/:id',deleteFaculty);
router.get('/:id',getFacultyById);
router.put('/:id',updateFaculty);
module.exports=router;
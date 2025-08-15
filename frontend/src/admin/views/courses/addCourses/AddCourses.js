import axios from 'axios';
import React, { useState } from 'react';

const AddCourses = () => {
  const [data, setData] = useState({
    courseName: '',
    duration: '',
    department: ''
  });

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', data);
    // Use axios.post() here if sending to backend
      axios.post('http://localhost:5000/course',data)
      .then(response=>{
        setData(response.data)
        alert("course added successfully");
        setData({
          courseName:'',
          duration:'',
          department:''
        })
      })
      .catch((err)=>{
        console.log("axios error:",err);
      })
 };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Course Details</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">

        <div className="mb-3">
          <label className="form-label">Course Name</label>
          <input
            type="text"
            name="courseName"
            className="form-control" value={data.courseName}
            onChange={(e)=>{setData({...data,courseName:e.target.value})}}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input
            type="text"
            name="duration"
            className="form-control" value={data.duration}
             onChange={(e)=>{setData({...data,duration:e.target.value})}}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            className="form-control" value={data.department}
             onChange={(e)=>{setData({...data,department:e.target.value})}}
            required
          />
        </div>

         <button type="submit" className="btn btn-primary w-100">ADD COURSE</button>
      </form>
    </div>
  );
};

export default AddCourses;

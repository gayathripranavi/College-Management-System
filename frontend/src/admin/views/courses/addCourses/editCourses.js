import axios from 'axios';
import React, { useState } from 'react';

const EditCourses = () => {
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
      })
      .catch((err)=>{
        console.log("axios error:",err);
      })
 };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Course Details</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">

        <div className="mb-3">
          <label className="form-label">Course Name</label>
          <input
            type="text"
            name="courseName"
            className="form-control"
            onChange={(e)=>{setData({...data,courseName:e.target.value})}}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input
            type="text"
            name="duration"
            className="form-control"
             onChange={(e)=>{setData({...data,duration:e.target.value})}}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            className="form-control"
             onChange={(e)=>{setData({...data,department:e.target.value})}}
            required
          />
        </div>

         <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default EditCourses;

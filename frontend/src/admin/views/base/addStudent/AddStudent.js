import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    department: '',
    year: ''
    
    });

const[courseList,setCourseList]=useState([]);

useEffect(()=>{
  axios.get('http://localhost:5000/course')
  .then(response=>{
    setCourseList(response.data)
  })
  .catch((err)=>{
    console.log("axios err",err);
  })
},[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // Use axios.post() here if sending to backend
    axios.post('http://localhost:5000/student',formData)
    .then(response=>{
      setFormData(response.data)
      alert("student added successfully")
      setFormData('')
    })
    .catch((err)=>{
      console.log("axios error:" ,err)
    })


  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Student Details</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">

        
        <div className="mb-3">
          <label className="form-label">Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            className="form-control"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            className="form-control"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            type="text"
            name="year"
            className="form-control"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        

        <div className="mb-3">
          <label className="form-label">Courses</label>
          <select
            name="course"
            className="form-select"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Course --</option>
            {courseList.map(course=>(
              <option key={course._id} value={course._id}>
                {course.courseName} 
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;

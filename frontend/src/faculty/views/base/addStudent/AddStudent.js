import React, { useState } from 'react';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    course: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // Use axios.post() here if sending to backend
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Student Details</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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
          <label className="form-label">Course</label>
          <select
            name="course"
            className="form-select"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Course --</option>
            <option value="BCA">BCA</option>
            <option value="BSc IT">BSc IT</option>
            <option value="MCA">MCA</option>
            <option value="B.Tech">B.Tech</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default AddStudent;

import axios from 'axios';
import React, { useState } from 'react';

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role:'admin'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);

    
    // Use axios.post() here if sending to backend

    axios.post('http://localhost:5000/auth/register',formData)
    .then(response=>{
      setFormData(response.data)
      alert("admin added successfully")
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'admin'});
    })
    .catch((err)=>{
      console.log("axios error:",err)
    })
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Admin</h2>
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
          <label className="form-label">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
     <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="text"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default AddAdmin;

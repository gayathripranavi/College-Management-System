import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddSubjects = () => {
  const [data, setData] = useState({
    subjectName: '',
    courseId: '',
    semester: ''
  });
const[courseList,setCourseList]=useState([]);
  
useEffect(()=>{
  axios.get('http://localhost:5000/course')
  .then(response=>{
    setCourseList(response.data)
  })
  .catch((err)=>{
    console.log("axios error" + err);
  })
},[])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', data);
    // Use axios.post() here if sending to backend
      axios.post('http://localhost:5000/addSubject',data)
      .then(response=>{
        setData(response.data)
        alert("subject added successfully");
        setData({
          subjectName:'',
          courseId:'',
          semester:''
        })
      })
      .catch((err)=>{
        console.log("axios error:",err);
      })
 };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Subjects Details</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">

        <div className="form-group mb-3">
                  <label className="col-form-label">Courses:</label>
                  <select
            name="course"
            className="form-select"
            value={data.courseId}
           onChange={(e) =>
                      setData({ ...data, courseId: e.target.value })
                    }
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

        <div className="mb-3">
          <label className="form-label">Subject Name</label>
          <input
            type="text"
            name="subjectName"
            className="form-control" value={data.subjectName}
             onChange={(e)=>{setData({...data,subjectName:e.target.value})}}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Semester</label>
          <input
            type="text"
            name="semester"
            className="form-control" value={data.semester}
             onChange={(e)=>{setData({...data,semester:e.target.value})}}
            required
          />
        </div>

         <button type="submit" className="btn btn-primary w-100">ADD SUBJECT</button>
      </form>
    </div>
  );
};

export default AddSubjects;

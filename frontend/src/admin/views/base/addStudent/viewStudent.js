import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewStudent = () => {
  const [student, setStudent] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({
    userId:'',
    rollNumber: '',
    department: '',
    year: '',
    courses:''
  });

  const[courseList,setCourseList]=useState([]);

  // Fetch all courses
  useEffect(() => {
    axios.get('http://localhost:5000/course')
  .then(response=>{
    setCourseList(response.data)
  })
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get('http://localhost:5000/student');
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Handle update
  const handleUpdate = async () => {
  
    try {
    
      await axios.put(`http://localhost:5000/student/${selectedStudent._id}`, selectedStudent);
      alert('Student updated successfully');
      fetchStudent(); // refresh course list
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

const deleteUser=async(id)=>{
try{
    await axios.delete(`http://localhost:5000/auth/users/${id}`)
    alert('Student deleted successfully');
    fetchStudent();
}catch(error){
    console.error('Error updating course:', error);
}
}



return (
    <div className="container mt-4">
      <h1>View Students</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">RollNumber</th>
            <th scope="col">Department</th>
            <th scope="col">Year</th>
            <th scope="col">Course</th>
           <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {student.map((user, index) => (
            <tr key={index}>
              <td>{user.rollNumber}</td>
              <td>{user.department}</td>
              <td>{user.year}</td>
               <td>
                {courseList.find(course => course._id === user.courses)?.courseName || 'Unknown Course'}
               </td>
              <td>
                {/* <button
                  type="button"
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setSelectedUser(user)}
                >
                  Update
                </button> */}
               <button
                  type="button"
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setSelectedStudent(user)}
                >
              Update
                </button>
                <button className="btn btn-danger me-2" 
                onClick={() => deleteUser(user._id)}>Delete</button>
                            
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>

{/* Modal add button*/}

          <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Student
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label className="col-form-label">RollNumber:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedStudent.rollNumber}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, rollNumber: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Department:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedStudent.department}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, department:e.target.value})
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Year:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedStudent.year}
                    onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, year: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Courses:</label>
                  <select
            name="course"
            className="form-select"
            value={selectedStudent.courses}
           onChange={(e) =>
                      setSelectedStudent({ ...selectedStudent, courses: e.target.value })
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
                data-bs-dismiss="modal"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ViewStudent;



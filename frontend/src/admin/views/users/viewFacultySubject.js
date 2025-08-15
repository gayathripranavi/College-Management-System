import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewFacultySubject = () => {
  const [faculty, setFaculty] = useState([]);
  const [addSubject, setAddSubject] = useState([]);
  const [subject, setSubject] = useState({
    subjects:'',
    courseId: '',
    employeeIdId: '',
    userId: ''
    
  });

  const[courseList,setCourseList]=useState([]);
  const[authFaculty,setAuthFaculty]=useState([]);

  
  // Fetch all courses
  useEffect(() => {

    fetchSubject();
    fetchFaculty();
    fetchCourse();
    fetchAddSubject();
  }, []);

  const fetchSubject = async () => {
    try {
      const response = await axios.get('http://localhost:5000/faculty');
      setFaculty(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

const fetchAddSubject = async () => {
    try {
      const response = await axios.get('http://localhost:5000/addSubject');
      setAddSubject(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

const fetchFaculty = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/faculty');
      setAuthFaculty(response.data);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    }
  };
const fetchCourse = async () => {
    try {
      const response = await axios.get('http://localhost:5000/course');
      setCourseList(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };



  // Handle update
  const handleUpdate = async () => {
  
    try {
     // console.log(selectedUser)
      await axios.put(`http://localhost:5000/faculty/${subject._id}`, subject);
      alert('faculty updated successfully');
      fetchSubject(); // refresh course list
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

const deleteSubject=async(id)=>{
try{
    await axios.delete(`http://localhost:5000/faculty/${id}`)
    alert('subject deleted successfully');
    fetchSubject();
}catch(error){
    console.error('Error updating course:', error);
}
}


return (
    <div className="container mt-4">
      <h1>Display Faculty Details</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Faculty Name</th>
            <th scope="col">Course Name</th>
            <th scope="col">Subject Name</th>
            <th scope="col">Employee Id</th>
           <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((newFaculty, index) => (
            <tr key={index}>
              <td>{
              authFaculty.find(authFa => authFa._id === newFaculty.userId)?.name 
              
              }
              </td>
              <td>{
              courseList.find(course => course._id === newFaculty.courseId)?.courseName 
              
              }
              </td>
            <td>
  {newFaculty.subjects && newFaculty.subjects.length > 0 ? (
    newFaculty.subjects
      .map((subjectId) => addSubject.find((sub) => sub._id === subjectId)?.subjectName)
      .filter(Boolean) // remove undefined
      .join(', ')
  ) : 'No Subjects'}
</td>

              <td>{newFaculty.employeeId}</td>
               
              <td>
                
               <button
                  type="button"
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setSubject(newFaculty)}
                >
              Update
                </button>
                <button className="btn btn-danger me-2" 
                onClick={() => deleteSubject(newFaculty._id)}>Delete</button>
                            
               
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
                Update Faculty Details
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label className="col-form-label">Faculty Name:</label>
                            <select
                        className="form-select"
                        value={subject.userId}
                        onChange={(e) =>
                        setSubject({ ...subject, userId: e.target.value })
                        }
                            >
                            <option value="">-- Select Faculty --</option>
                            {authFaculty.map((faculty) => (
                            <option key={faculty._id} value={faculty._id}>
                                {faculty.name}
                            </option>
                            ))}
                        </select>
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Course Name:</label>
                  <select
            name="course"
            className="form-select"
            value={subject.courseId}
           onChange={(e) =>
                      setSubject({ ...subject, courseId: e.target.value })
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
               
                
                {/* Checkbox Subject Selection */}

<div className="mb-3">
  <label className="col-form-label">Select Subjects:</label>
  <div className="form-check">
    {addSubject
      .filter((sub) => String(sub.courseId) === String(subject.courseId))
      .map((sub) => (
        <div key={sub._id}>
          <input
            type="checkbox"
            className="form-check-input"
            id={`subject-${sub._id}`}
            value={sub._id}
            checked={subject.subjects.includes(sub._id)}
            onChange={(e) => {
              const { value, checked } = e.target;
              setSubject((prev) => ({
                ...prev,
                subjects: checked
                  ? [...prev.subjects, value]

                  
                  : prev.subjects.filter((id) => id !== value)
              }));
            }}
          />
          <label
            className="form-check-label ms-2"
            htmlFor={`subject-${sub._id}`}
          >
            {sub.subjectName}
          </label>
        </div>
      ))}
  </div>
</div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Employee Id:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={subject.employeeId}
                    onChange={(e) =>
                      setSubject({ ...subject, employeeId: e.target.value })
                    }
                  />
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

export default ViewFacultySubject;



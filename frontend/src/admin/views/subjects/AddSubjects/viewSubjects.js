import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewSubjects = () => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState({
    courseId: '',
    subjectName: '',
    semester: '',
    facultyId:''
  });
  const[viewSub,setViewSub]=useState([]);
  // Fetch all courses
  useEffect(() => {
    viewSubjects();
    fetchCourses();
  }, []);

  const viewSubjects=async()=>{
    try{
       const response= await axios.get('http://localhost:5000/addSubject');
        setViewSub(response.data);
    }catch(error){
        console.log('error fetching subjects:',error);
    }
  }

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Handle update
  const handleUpdate = async () => {
   //console.log("inside update")
   //console.log(subjects)
    try {
      await axios.put(`http://localhost:5000/addSubject/${subjects._id}`, subjects);
      alert('Subject updated successfully');
      viewSubjects();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

const deleteSubject=async(id)=>{
try{
  console.log(id)
    await axios.delete(`http://localhost:5000/addSubject/${id}`)
    alert('Subject deleted successfully');
    viewSubjects();
}catch(error){
    console.error('Error updating course:', error);
}
}

return (
    <div className="container mt-4">
      <h1>All Subjects</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Course Name</th>
            <th scope="col">Subject Name</th>
            <th scope="col">Semester</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {viewSub.map((sub, index) => (
            <tr key={index}>
              <td>{courses.find(course=>course._id===sub.courseId)?.courseName}</td>
              <td>{sub.subjectName}</td>
              <td>{sub.semester}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setSubjects(sub)}
                >
                  Update
                </button>
                <button className="btn btn-danger" 
                onClick={() => deleteSubject(sub._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
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
                Update Subject
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                {/* <div className="form-group mb-3">
                  <label className="col-form-label">Course Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={subjects.courseName}
                    onChange={(e) =>
                      setSubjects({ ...subjects, courseName: e.target.value })
                    }
                  />
                </div> */}

<div className="form-group mb-3">
                  <label className="col-form-label">Courses:</label>
                  <select
            name="course"
            className="form-select"
            value={subjects.courseId}
           onChange={(e) =>
                      setSubjects({ ...subjects, courseId: e.target.value })
                    }
            required
          >
            <option value="">-- Select Course --</option>
            {courses.map(course=>(
              <option key={course._id} value={course._id}>
                {course.courseName} 
              </option>
            ))}
          </select>
                </div>

                <div className="form-group mb-3">
                  <label className="col-form-label">Subject Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={subjects.subjectName}
                    onChange={(e) =>
                      setSubjects({ ...subjects, subjectName:e.target.value})
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Semester:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={subjects.semester}
                    onChange={(e) =>
                      setSubjects({ ...subjects, semester: e.target.value })
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

export default ViewSubjects;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({
    courseName: '',
    duration: '',
    department: ''
  });

  // Fetch all courses
  useEffect(() => {
    fetchCourses();
  }, []);

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
   
    try {
      await axios.put(`http://localhost:5000/course/${selectedCourse._id}`, selectedCourse);
      alert('Course updated successfully');
      fetchCourses(); // refresh course list
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

const deleteCourse=async(id)=>{
try{
    await axios.delete(`http://localhost:5000/course/${id}`)
    alert('course deleted successfully');
    fetchCourses();
}catch(error){
    console.error('Error updating course:', error);
}
}

return (
    <div className="container mt-4">
      <h1>All Courses</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Course Name</th>
            <th scope="col">Duration</th>
            <th scope="col">Department</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.courseName}</td>
              <td>{course.duration}</td>
              <td>{course.department}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setSelectedCourse(course)}
                >
                  Update
                </button>
                <button className="btn btn-danger" 
                onClick={() => deleteCourse(course._id)}>Delete</button>
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
                Update Course
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label className="col-form-label">Course Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedCourse.courseName}
                    onChange={(e) =>
                      setSelectedCourse({ ...selectedCourse, courseName: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Duration:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedCourse.duration}
                    onChange={(e) =>
                      setSelectedCourse({ ...selectedCourse, duration:e.target.value})
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Department:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedCourse.department}
                    onChange={(e) =>
                      setSelectedCourse({ ...selectedCourse, department: e.target.value })
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

export default ViewCourses;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Modal, Button, Form } from "react-bootstrap";

// export default function ViewCourses() {
//   const [data, setData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:5000/course')
//       .then(response => setData(response.data))
//       .catch(err => console.log("axios error", err));
//   }, []);

//   const handleUpdateClick = (course) => {
//     setSelectedCourse(course);
//     setShowModal(true);
//   }

//   const handleModalClose = () => {
//     setShowModal(false);
//     setSelectedCourse(null);
//   }

//   const handleSendUpdate = () => {
//     // For example redirect to edit page of selectedCourse._id
//     navigate(`/editCourses/${selectedCourse._id}`);
//     handleModalClose();
//   }

//   // Example delete (needs implementation)
//   const del = (id) => { /* your delete logic */ };

//   return (
//     <div className="container mt‑5 text‑center">
//       <h2 className="mb‑4">View Student Courses</h2>
//       <table className="table table-striped table-bordered">
//         <thead>
//           <tr>
//             <th>COURSE NAME</th><th>DURATION</th><th>DEPARTMENT</th><th>ACTION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(course => (
//             <tr key={course._id}>
//               <td>{course.courseName}</td>
//               <td>{course.duration}</td>
//               <td>{course.department}</td>
//               <td>
               
//                 <button
//                   className="btn btn-success m-1"
//                   onClick={() => handleUpdateClick(course)}
//                 >
//                   UPDATE
//                 </button>
//                 <button className="btn btn-danger" onClick={() => del(course._id)}>DELETE</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Course</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedCourse && (
//             <Form>
//               <Form.Group className="mb‑3" controlId="formCourseName">
//                 <Form.Label>Course Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   defaultValue={selectedCourse.courseName}
                  
//                 />
//               </Form.Group>
//               <Form.Group className="mb‑3" controlId="formDuration">
//                 <Form.Label>Duration</Form.Label>
//                 <Form.Control
//                   type="text"
//                   defaultValue={selectedCourse.duration}
                 
//                 />
//               </Form.Group>
//               <Form.Group controlId="formDepartment">
//                 <Form.Label>Department</Form.Label>
//                 <Form.Control
//                   type="text"
//                   defaultValue={selectedCourse.department}
                 
//                 />
//               </Form.Group>
//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>Close</Button>
//           <Button variant="primary" onClick={handleSendUpdate}>Go to Edit</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

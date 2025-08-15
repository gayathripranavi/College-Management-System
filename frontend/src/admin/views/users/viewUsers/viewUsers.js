import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Handle update
  const handleInsert = async () => {
  
    try {
     // console.log(selectedUser)
      await axios.post('http://localhost:5000/student', selectedUser);
      alert('Student added successfully');
      fetchUsers(); // refresh course list
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

const deleteUser=async(id)=>{
try{
    await axios.delete(`http://localhost:5000/auth/users/${id}`)
    alert('user deleted successfully');
    fetchUsers();
}catch(error){
    console.error('Error updating course:', error);
}
}

const setUser=(user)=>{
setSelectedUser(prev=>({
  ...prev,userId:user._id
}));
}


return (
    <div className="container mt-4">
      <h1>Student Management</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
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
                  onClick={() => setUser(user)}
                >
              Add
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
                Add Student
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
                    // value={selectedUser.rollNumber}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, rollNumber: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Department:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedUser.department}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, department:e.target.value})
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Year:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedUser.year}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, year: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Courses:</label>
                  <select
            name="course"
            className="form-select"
            value={selectedUser.courses}
           onChange={(e) =>
                      setSelectedUser({ ...selectedUser, courses: e.target.value })
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
                onClick={handleInsert}
                data-bs-dismiss="modal"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>










      {/* Modal update button*/}
      {/* <div
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
                  <label className="col-form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, email:e.target.value})
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Role:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedUser.role}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
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
      </div> */}
    </div>
  );
};

export default ViewUsers;



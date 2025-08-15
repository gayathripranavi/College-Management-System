import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAdmin = () => {
  const [admin, setAdmin] = useState([]);
  const [updateAdmin, setUpdateAdmin] = useState({
    courseName: '',
    duration: '',
    department: ''
  });

  // Fetch all courses
  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/admin');
      setAdmin(response.data);
    } catch (error) {
      console.error('Error fetching admin:', error);
    }
  };

  // Handle update
  const handleUpdate = async () => {
   console.log(updateAdmin)
    try {
      await axios.put(`http://localhost:5000/auth/register/${updateAdmin._id}`, updateAdmin);
      alert('Admin updated successfully');
      setAdmin(); // refresh course list
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
      <h1>View Admin Details</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Admin Name</th>
            <th scope="col">Email</th>
            <th scope="col">Created At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admin.map((admins, index) => (
            <tr key={index}>
              <td>{admins.name}</td>
              <td>{admins.email}</td>
              <td>{admins.createdAt}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setUpdateAdmin(admins)}
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
                  <label className="col-form-label">Admin Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updateAdmin.name}
                    onChange={(e) =>
                      setUpdateAdmin({ ...updateAdmin, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updateAdmin.email}
                    onChange={(e) =>
                      setUpdateAdmin({ ...updateAdmin, email:e.target.value})
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-form-label">Created At:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updateAdmin.createdAt}
                    onChange={(e) =>
                      setUpdateAdmin({ ...updateAdmin, createdAt: e.target.value })
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

export default ViewAdmin;






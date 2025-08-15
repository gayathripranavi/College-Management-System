import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subject, setSubject] = useState([]);

  const [addFaculty, setAddFaculty] = useState({
    userId: '',
    employeeId: '',
    courseId: '',
    subjects: ''
  });

  // Load faculty, course, and subject data on mount
  useEffect(() => {
    viewFaculty();
    viewCourse();
    listSubject();
  }, []);

  const viewFaculty = () => {
    axios
      .get('http://localhost:5000/auth/faculty')
      .then((response) => {
        setFaculty(response.data);
      })
      .catch((error) => {
        console.log('all faculty error', error);
      });
  };

  const viewCourse = () => {
    axios
      .get('http://localhost:5000/course')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log('view course error', error);
      });
  };

  const listSubject = () => {
    axios
      .get('http://localhost:5000/addSubject')
      .then((response) => {
        setSubject(response.data);
      })
      .catch((error) => {
        console.log('view subject error', error);
      });
  };

  // Handle Add Faculty button click for a selected user
  const handleFaculty = (allfaculty) => {
    setAddFaculty((prev) => ({
      ...prev,
      userId: allfaculty._id
    }));
  };

  // add faculty 
  const handleInsert = async () => {
    

    try {
     console.log(addFaculty)
      await axios.post('http://localhost:5000/faculty', addFaculty);
      alert('Faculty added successfully');
      setAddFaculty({ userId: '', employeeId: '', courseId: '', subjects: '' });
    } catch (err) {
      console.log('axios error:', err);
    }
  };

  return (
    <>
      <div className="container m-4">
        <h1>Faculty Management</h1>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((allfaculty) => (
              <tr key={allfaculty._id}>
                <td>{allfaculty.name}</td>
                <td>{allfaculty.email}</td>
                <td>{allfaculty.role}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleFaculty(allfaculty)}
                  >
                    Add Faculty
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                Add Faculty
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                {/* Employee ID */}
                <div className="form-group mb-3">
                  <label className="col-form-label">Employee ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addFaculty.employeeId}
                    onChange={(e) =>
                      setAddFaculty((prev) => ({
                        ...prev,
                        employeeId: e.target.value
                      }))
                    }
                  />
                </div>

                {/* Select Course */}
                <div className="mb-3">
                  <label className="col-form-label">Select Course:</label>
                  <select
                    id="course"
                    className="form-select"
                    value={addFaculty.courseId}
                    onChange={(e) =>
                      setAddFaculty((prev) => ({
                        ...prev,
                        courseId: e.target.value
                      }))
                    }
                  >
                    <option value="">-- Select Course --</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Subject */}
                {/* <div>
                  <label className="col-form-label">Select Subject:</label>
                  <select
                    id="subject"
                    className="form-select mb-3"
                    value={addFaculty.subjects}
                    onChange={(e) =>
                      setAddFaculty((prev) => ({
                        ...prev,
                        subjects: e.target.value
                      }))
                    }
                  >
                    <option value="">-- Select Subject --</option>
                    {subject
                      .filter(
                        (sub) =>
                          String(sub.courseId) === String(addFaculty.courseId)
                      )
                      .map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.subjectName}
                        </option>
                      ))}
                  </select>
                </div> */}



                {/* Checkbox Subject Selection */}
<div className="mb-3">
  <label className="col-form-label">Select Subjects:</label>
  <div className="form-check">
    {subject
      .filter((sub) => String(sub.courseId) === String(addFaculty.courseId))
      .map((sub) => (
        <div key={sub._id}>
          <input
            type="checkbox"
            className="form-check-input"
            id={`subject-${sub._id}`}
            value={sub._id}
            checked={addFaculty.subjects.includes(sub._id)}
            onChange={(e) => {
              const { value, checked } = e.target;
              setAddFaculty((prev) => ({
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
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFaculty;

import React, { useEffect, useState } from 'react';
import './AddStudent.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStudent = () => {
  const [student, setStudent] = useState({
    studentId: '',
    studentname: '',
    gender: '',
    standard: '',
    age: '',
    email: '',
    status: ''
  });

  const navigate = useNavigate();
  const { id } = useParams(); // URL से student ID मिलेगा

  // GET student by ID
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:5093/api/Students/${id}`);
        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        } else {
          alert('Student not found');
          navigate('/');
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        alert('Error fetching student data');
      }
    };

    fetchStudent();
  }, [id, navigate]);

  // Input change handler
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // Update student handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5093/api/Students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      });

      if (response.ok) {
        alert('Student updated successfully!');
        navigate('/');
      } else {
        alert('Failed to update student');
      }
    } catch (error) {
      console.error('Update Error:', error);
      alert('Something went wrong while updating.');
    }
  };

  return (
    <div className="add-student-container">
      <h2 className="heading">Update Student</h2>
      <form onSubmit={handleSubmit} className="add-student-form">
        <label>Name</label>
        <input
          type="text"
          name="studentname"
          value={student.studentname}
          onChange={handleChange}
          required
        />

        <label>Gender:</label>
        <select name="gender" value={student.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Standard:</label>
        <input
          type="text"
          name="standard"
          value={student.standard}
          onChange={handleChange}
          required
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={student.age}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <label>Status:</label>
        <select name="status" value={student.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
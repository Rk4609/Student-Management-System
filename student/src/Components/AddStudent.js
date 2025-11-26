import React, { useState } from 'react';
import './AddStudent.css';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [student, setStudent] = useState({
    Studentname: '',
    gender: '',
    standard: '',
    age: '',
    email: '',                      
    status: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("student object:",student);

    try {
      const response = await fetch('http://localhost:5093/api/Students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      });

      if (response.ok) {
        alert('Student added successfully!');
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        alert('Failed to add student.');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      alert('Something went wrong while sending data.');
    }
  };

  return (
    <div className="add-student-container">
      <h2 className='heading'>Add Student</h2>
      <form onSubmit={handleSubmit} className="add-student-form">
        <label>Name</label>
        <input
          type="text"
          name="Studentname"
          value={student.Studentname}
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

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
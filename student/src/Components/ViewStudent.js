// src/components/ViewStudent.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewStudent.css'; // Optional: for styling

const ViewStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${id}`);
        if (res.ok) {
          const data = await res.json();
          setStudent(data);
        } else {
          alert("Student not found");
        
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        alert("Something went wrong");
        navigate('/');
      }
    };

    fetchStudent();
  }, [id, navigate]);

  if (!student) return <p>Loading student profile...</p>;

  return (
    <div className="view-container">
      <h2>Student Profile</h2>
      <div className="student-profile-card">
        <p><strong>Name:</strong> {student.Studentname}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Standard:</strong> {student.standard}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Status:</strong> {student.status}</p>
        <button className="viewbtn" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

export default ViewStudent;
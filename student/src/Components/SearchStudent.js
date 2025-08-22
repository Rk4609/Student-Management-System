// src/components/SearchStudent.jsx

import React, { useState, useEffect } from 'react';
import './SearchStudent.css';

const SearchStudent = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // fetch all students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5093/api/Students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.studentname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-container">
      <h2>Search Students</h2>
      <input
        type="text"
        placeholder="Enter name to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Standard</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.studentname}</td>
              <td>{student.gender}</td>
              <td>{student.standard}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchStudent;
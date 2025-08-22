import React, { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './StudentList.css'

const StudentList = () => {
    const navigate=useNavigate();
    const[students,setStudents]=useState([]);

    const handleAddStudent =()=>{
        navigate("/AddStudent");
    };
    
    useEffect(() => {
    fetch("http://localhost:5093/api/Students")
    .then((response)=>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data)=>
    setStudents(data))
    .catch((error)=>
    console.error("Error fetching data:",error));
    
    }, [])
      
   
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) return;
      
        try {
          const response = await fetch(`http://localhost:5093/api/Students/${id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            alert("Student deleted successfully");
          
            setStudents(prev => prev.filter(s => s.id !== id)); 
          } else {
            alert("Failed to delete student");
          }
        } catch (error) {
          console.error("Delete error:", error);
          alert("Something went wrong");
        }
      
      };
    
  return (
    <div>
        <div className='list-div'>
       <h2>Student Management
        <div className='header'>
        <button className='search-btn' onClick={()=>navigate('/search')}>Search student</button>
        
        {/* <Link to="/AddStudents">
        <button className='add-btn'>Add student</button>
        </Link> */}
        <button className='Addlist' onClick={handleAddStudent}>Add Student</button>
        </div>
       </h2>
      
       </div>


       <table className='container' border="1">
        <thead className='table'>

        {/* table headings  */}
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Standard</th>
                <th>Age</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>

            </tr>
        </thead>
        <tbody>
            {students.map((student) =>(
                // table all data fetch backend
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.studentname}</td>
                    <td>{student.gender}</td>
                    <td>{student.standard}</td>
                    <td>{student.age}</td>
                    <td>{student.email}</td>
                    <td>{student.status}</td>
                    <td>
                        <div className='action-container'>
                        <button className='edit-btn' onClick={()=>navigate(`/update/${student.id}`)}>Edit</button>
                <button className='deactivate-btn' onClick={()=>handleDelete(student.id)}>Delete</button>
               
                <button className='view-btn' onClick={()=>navigate(`/View/${student.id}`)}>View Profile</button>
            
                        </div>
                    </td>
                  
                </tr>
            ))}
        </tbody>
       </table>
    </div>
  )
}

export default StudentList

import { BrowserRouter, Route, Routes } from "react-router-dom"
import StudentList from "./Components/StudentList"

import Signup from "./Components/Signup"
import Login from "./Components/Login"

import AddStudent from "./Components/AddStudent"
import UpdateStudent from "./Components/UpdateStudent"
import ViewStudent from "./Components/ViewStudent"
import SearchStudent from "./Components/SearchStudent"
// import LoginSignup from "./Components/LoginSignup"
import Dashboard from "./Components/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="/update/:id" element={<UpdateStudent />} />
        <Route path="/View/:id" element={<ViewStudent />} />
        <Route path="/search" element={<SearchStudent />} />
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

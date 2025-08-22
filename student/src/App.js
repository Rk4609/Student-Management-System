import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentList from "./Components/StudentList";
import AddStudent from "./Components/AddStudent";
import UpdateStudent from "./Components/UpdateStudent";
import ViewStudent from "./Components/ViewStudent";
import SearchStudent from "./Components/SearchStudent";


function App() {
  return (
  
           <BrowserRouter>
           <Routes>
            <Route path="/"element={<StudentList />} />
           <Route path="/AddStudent"element={<AddStudent />}/>
            <Route path="/update/:id"element={<UpdateStudent />} />
            <Route path="/View/:id"element={<ViewStudent />} />
            <Route path="/search"element={<SearchStudent />} />
            </Routes>
            </BrowserRouter>
  
  );
}

export default App;

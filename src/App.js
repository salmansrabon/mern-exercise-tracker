import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component.js";
import EditExercises from "./components/edit-exercise.component.js";
import CreateExercise from "./components/create-exercise.component.js";
import CreateUsers from "./components/create-user.component.js";
import Login from "./components/login.component.js";

function App() {
  return (

    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ExercisesList />} />
          <Route path="/edit/:id" element={<EditExercises />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/user" element={<CreateUsers />} />
        </Routes>
      </div>
    </Router>



  );
}

export default App;

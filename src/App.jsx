import React from "react";
import Navbar from "./components/Navbar";
import ProjectForm from "./components/ProjectForm";
import AllProjectsPage from "./pages/AllProjectsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Skills from "./pages/Skills";
import SkillForm from "./components/SkillForm";
import EditSkillForm from "./components/EditSkillForm";
// import { Education } from "../../backend/models/educationModel";
import EducationList from "./pages/EducationList";
import AddEducationForm from "./components/AddEducationForm";
import EditEducationForm from "./components/EditEducationForm";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/projects" element={<AllProjectsPage />} />
          <Route path="/dashboard/project/add" element={<ProjectForm />} />
          <Route path="/dashboard/skill/add" element={<SkillForm />} />
          <Route path="/dashboard/skill" element={<Skills />} />
          <Route path="/dashboard/skill/:id" element={<EditSkillForm />} />
          <Route path="/dashboard/education" element={<EducationList />} />
          <Route path="/dashboard/education/add" element={<AddEducationForm />} />
          <Route path="/dashboard/education/edit/:id" element={<EditEducationForm />} />
        </Routes>
      </Router>
    </div>
  );
}

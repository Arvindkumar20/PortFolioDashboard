import React from "react";
import Navbar from "./components/Navbar";
import ProjectForm from "./components/ProjectForm";
import AllProjectsPage from "./pages/AllProjectsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Skills from "./pages/Skills";
import SkillForm from "./components/SkillForm";

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllProjectsPage />} />
          <Route path="/dashboard/projects" element={<AllProjectsPage />} />
          <Route path="/dashboard/project/add" element={<ProjectForm />} />
          <Route path="/dashboard/skill/add" element={<SkillForm />} />
          <Route path="/dashboard/skill" element={<Skills />} />
        </Routes>
      </Router>
    </div>
  );
}

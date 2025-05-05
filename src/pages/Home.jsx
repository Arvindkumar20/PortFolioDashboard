import React from "react";
import AllProjectsPage from "./AllProjectsPage";
import Skills from "./Skills";
import EducationList from "./EducationList";

export default function Home() {
  return (
    <div>
      <AllProjectsPage />
      <Skills />
      <EducationList />
    </div>
  );
}

import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CampusViewerPage from "./components/Campus3D/CampusViewerPage";
import Chatbot from "./components/Chatbot/Chatbot";
import AdmissionForm from "./components/Admission/AdmissionForm";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour/:id" element={<CampusViewerPage />} />
          <Route path="/tuyen-sinh" element={<AdmissionForm />} />
        </Routes>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;

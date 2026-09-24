import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import AdminAddBlog from "./pages/AdminAddBlog";
import AdminAddCaseStudy from "./pages/AdminAddCaseStudy";
import AdminAppointments from "./pages/AdminAppointments";
import EditBlog from "./pages/EditBlog";
import BlogList from "./pages/BlogList";
import CaseStudiesList from "./pages/CaseStudiesList";
import EditCaseStudy from "./pages/CaseStudyEdit";
import CaseStudyEdit from "./pages/CaseStudyEdit";
import GalleryManager from "./pages/GalleryManager";
import AuthorProfile from "./pages/AuthorProfile";
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/add-blog" element={<Layout><AdminAddBlog /></Layout>} />
          <Route path="/add-casestudy" element={<Layout><AdminAddCaseStudy /></Layout>} />
          <Route path="/appointments" element={<Layout><AdminAppointments /></Layout>} />
          <Route path="/gallery" element={<Layout><GalleryManager /></Layout>} />
          <Route path="/author-profile" element={<Layout><AuthorProfile /></Layout>} />
          <Route path="/blogs/edit/:id" element={<Layout><EditBlog/></Layout>} />
          <Route path="/blog-list" element={<Layout><BlogList /></Layout>} />
           <Route path="/case-studies" element={<Layout><CaseStudiesList /></Layout>} />
 <Route path="/case-studies/edit/:id" element={<Layout><CaseStudyEdit /></Layout>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
            background: "#ffffff",
            color: "#172033",
            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.16)",
          },
          success: { duration: 3000 },
          error: { duration: 4500 },
        }}
      />
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import InfinityLoader from "./components/InfinityLoader";

import About from "./pages/About";
import Treatments from "./pages/Treatments";
import Appointment from "./pages/Appointment";
import Homepage from "./pages/Hompage.jsx";
import BlogPage from "./blog/BlogPage.jsx";
import BlogDetails from "./blog/BlogDetails.jsx";
import MindwellnessPage from "./pages/MindwellnessPage.jsx";
import CaseStudyList from "./pages/CaseStudyList.jsx";
import CaseStudyDetails from "./pages/CaseStudyDetails.jsx";
import ScrollToTop from "./components/ScrollToTop"; // import here

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <InfinityLoader />;

  return (
    <div className="font-sans">
      <Header />
<ScrollToTop />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/appointment" element={<Appointment />} />
           <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/mindwellness" element={<MindwellnessPage />} />
        <Route path="/case-study" element={<CaseStudyList />} />
        <Route path="/case-study/:slug" element={<CaseStudyDetails />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

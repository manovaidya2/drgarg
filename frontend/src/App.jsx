import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import InfinityLoader from "./components/InfinityLoader";
import ScrollToTop from "./components/ScrollToTop";

import Homepage from "./pages/Hompage";
import About from "./pages/About";
import BlogPage from "./blog/BlogPage";
import BlogDetails from "./blog/BlogDetails";
import Treatments from "./pages/Treatments";
import Appointment from "./pages/Appointment";
import MindwellnessPage from "./pages/MindwellnessPage";
import CaseStudyList from "./pages/CaseStudyList";
import CaseStudyDetails from "./pages/CaseStudyDetails";
import MediaCoverage from "./pages/MediaCoverage";

import { GlobalSEO } from "./components/SEOProvider";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <InfinityLoader />;

  return (
    <div className="font-sans">
      <GlobalSEO /> {/* Default global SEO */}
      <Header />
      <ScrollToTop />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/mindwellness" element={<MindwellnessPage />} />
          <Route path="/case-study" element={<CaseStudyList />} />
          <Route path="/case-study/:slug" element={<CaseStudyDetails />} />
          <Route path="/media-coverage" element={<MediaCoverage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

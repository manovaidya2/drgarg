import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
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
import Gallery from "./pages/Gallery";

import { GlobalSEO } from "./components/SEOProvider";
import System from "./pages/System";
import AutismADHDSection from "./autism/AutismADHDSection";
import Adult from "./pages/Adult";
import Teenage from "./pages/Teenage";
import Seniour from "./pages/Seniour";
import NotFound from "./pages/NotFound";
import ChildDevelopmentCarePage from "./child-development-care/ChildDevelopmentCarePage";

import TestimonialsPage from "./pages/TestimonialsPage";
import TestimonialVideosPage from "./pages/TestimonialVideosPage";
import ThankYou from "./pages/ThankYou";

export default function App() {
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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/neuro-ayurveda-system" element={<System />} />
          <Route path="/autism-adhd" element={<AutismADHDSection />} />
          <Route
            path="/child-development-care"
            element={<ChildDevelopmentCarePage />}
          />
          <Route path="/adult-mental-health" element={<Adult />} />
          <Route path="/teenage-mental-health" element={<Teenage />} />
          <Route path="/seniour-mental-health" element={<Seniour />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/testimonial-videos" element={<TestimonialVideosPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

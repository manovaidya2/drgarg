import { Helmet } from "react-helmet-async";
import { Calendar, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance.js";

export default function Appointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    date: "",
    concern: "Autism / ADHD",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/appointments/book", formData);
      navigate("/thank-you");
      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        date: "",
        concern: "Autism / ADHD",
        message: "",
      });
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Appointment booking failed. Please try again.");
      // Clear error message after 5 seconds
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  // Breadcrumb Schema Data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://drankushgarg.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Book Consultation",
        "item": "https://drankushgarg.com/appointment"
      }
    ]
  };

  // Medical Business Schema for Local SEO
  const medicalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Manovaidya Clinic",
    "description": "Ayurvedic mental health and autism treatment clinic by Dr. Ankush Garg",
    "image": "https://drankushgarg.com/clinic-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Vinayak Hospital, Atta Market, Pocket E, Sector 27",
      "addressLocality": "Noida",
      "addressRegion": "UP",
      "postalCode": "201301",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.5700",
      "longitude": "77.3200"
    },
    "url": "https://drankushgarg.com/appointment",
    "telephone": "+917823838638",
    "openingHours": "Mon-Sat 10:00-19:00",
    "priceRange": "₹₹",
    "hasMap": "https://maps.google.com/?q=Manovaidya+Clinic+Noida"
  };

  return (
    <>
      {/* SEO and Schema */}
      <Helmet>
        <title>Book Consultation | Dr. Ankush Garg - Ayurvedic Neurologist</title>
        <meta name="description" content="Book online or in-clinic consultation with Dr. Ankush Garg, India's No.1 Autism Doctor and Ayurvedic Neurologist. Get personalized Neuro-Ayurveda assessment for autism, ADHD, and mental health." />
        <meta name="keywords" content="book consultation, Dr. Ankush Garg appointment, autism doctor appointment, ADHD treatment, Ayurvedic neurologist, Manovaidya clinic" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://drankushgarg.com/appointment" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drankushgarg.com/appointment" />
        <meta property="og:title" content="Book Consultation | Dr. Ankush Garg" />
        <meta property="og:description" content="Book a consultation with India's No.1 Autism Doctor and Ayurvedic Neurologist. Online and in-clinic appointments available." />
        <meta property="og:image" content="https://drankushgarg.com/consultation-og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book Consultation | Dr. Ankush Garg" />
        <meta name="twitter:description" content="Book a consultation with India's No.1 Autism Doctor and Ayurvedic Neurologist." />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(medicalBusinessSchema)}
        </script>
      </Helmet>

      {/* Visible Breadcrumb Navigation */}
      <nav className="w-full bg-[#f6f4ef] pt-6 px-4 sm:px-6 lg:px-10" aria-label="Breadcrumb">
        <div className="mx-auto">
          <ol className="flex flex-wrap items-center gap-2 text-[#5d625b] text-sm">
            <li className="flex items-center">
              <a href="/" className="hover:text-[#d98923] transition-colors">
                Home
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#b9cac1]">/</span>
              <span className="text-[#002b18] font-medium">Book Consultation</span>
            </li>
          </ol>
        </div>
      </nav>

      <div className="bg-[#f6f4ef]">
        {/* HERO */}
        <section className="w-full border-b border-[#e6e0d6]">
          <div className="mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfd6d2] bg-white px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d8a63b]" />
              <span className="text-[#0b3b2e] text-[11px] uppercase tracking-[0.25em]">
                CONTACT
              </span>
            </div>

            {/* TITLE */}
            <h1 className="mt-6 font-serif text-[#0b3b2e] text-[34px] sm:text-[44px] md:text-[52px] leading-[1.1]">
              Book a Consultation
            </h1>

            {/* DESC */}
            <p className="mt-4 max-w-[600px] text-[#4b5d57] text-[16px] leading-[1.7]">
              Online and in-clinic consultations available. Begin with a structured Neuro-Ayurveda assessment.
            </p>
          </div>
        </section>

        {/* MAIN */}
        <section className="py-10 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto grid md:grid-cols-2 gap-8">
            {/* LEFT SIDE */}
            <div className="space-y-6">
              {/* CLINIC CARD */}
              <div className="bg-[#fbfaf7] border border-[#e6e0d6] rounded-[10px] p-6">
                <h2 className="font-serif text-[#0b3b2e] text-[18px] mb-4">
                  Manovaidya Clinic
                </h2>

                <div className="space-y-4 text-[#40514d] text-[14px]">
                  <p>
                    <strong>Address</strong><br />
                    Near Vinayak Hospital, Atta Market, Pocket E, Sector 27,<br />
                    Noida, Uttar Pradesh 201301
                  </p>

                  <p>
                    <strong>Phone</strong><br />
                    <a href="tel:+917823838638" className="hover:text-[#d8a63b] transition-colors">
                      078238 38638
                    </a>
                  </p>

                  <p>
                    <strong>WhatsApp</strong><br />
                    <a href="https://wa.me/917823838638" className="hover:text-[#d8a63b] transition-colors">
                      Chat on WhatsApp
                    </a>
                  </p>

                  <p>
                    <strong>Email</strong><br />
                    <a href="mailto:hello@manovaidya.in" className="hover:text-[#d8a63b] transition-colors">
                      hello@manovaidya.in
                    </a>
                  </p>

                  <p>
                    <strong>Clinic Hours</strong><br />
                    Mon–Sat · 10:00 AM – 7:00 PM
                  </p>
                </div>
              </div>

              {/* MAP */}
              <div className="rounded-[10px] overflow-hidden border border-[#e6e0d6]">
                <iframe
                  title="Manovaidya Clinic Location Map"
                  src="https://maps.google.com/maps?q=Manovaidya+Clinic+Noida&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-[220px]"
                  loading="lazy"
                />
              </div>

              {/* Success/Error Messages */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-[10px] p-4 text-sm">
                  ✅ {success}
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-[10px] p-4 text-sm">
                  ❌ {error}
                </div>
              )}
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="bg-[#fbfaf7] border border-[#e6e0d6] rounded-[10px] p-6 sm:p-8">
              <h2 className="font-serif text-[#0b3b2e] text-[18px] mb-2">
                Request a Consultation
              </h2>

              <p className="text-[#6b7c76] text-[13px] mb-6">
                Tell us a little about the concern. Our team will reach out with the next steps.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* NAME + PHONE */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm focus:outline-none focus:border-[#d8a63b] transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
                      Phone *
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm focus:outline-none focus:border-[#d8a63b] transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* EMAIL + CONCERN */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm focus:outline-none focus:border-[#d8a63b] transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
                      Concern *
                    </label>
                    <select
                      name="concern"
                      value={formData.concern}
                      onChange={handleChange}
                      required
                      className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm focus:outline-none focus:border-[#d8a63b] transition-colors"
                    >
                      <option value="Autism / ADHD">Autism / ADHD</option>
                      <option value="Teenage Mental Health">Teenage Mental Health</option>
                      <option value="Adult Mental Health">Adult Mental Health</option>
                      <option value="Senior Mental Health">Senior Mental Health</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* LOCATION (Optional) */}
                <div>
                  <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
                    Location (City)
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm focus:outline-none focus:border-[#d8a63b] transition-colors"
                    placeholder="Enter your city"
                  />
                </div>

                {/* FULL WIDTH MESSAGE */}
                <div>
                  <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
                    Brief Message *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Share what you'd like clarity on..."
                    className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm focus:outline-none focus:border-[#d8a63b] transition-colors resize-none"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#003f26] text-white py-3 rounded-full text-sm font-medium hover:bg-[#002f1c] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Request"
                  )}
                </button>

                <p className="text-[11px] text-[#6b7c76] text-center">
                  Online & in-clinic consultation available. We respect your privacy.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
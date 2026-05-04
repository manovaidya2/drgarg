import React, { useState } from "react";
import { X } from "lucide-react";
import api from "../api/axiosInstance.js";

export default function ConsultationPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    concern: "Autism / ADHD",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await api.post("/appointments/book", formData);

      setSuccess("Consultation request submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        concern: "Autism / ADHD",
        message: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Request submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/55 px-3 sm:px-4 py-4 sm:py-6 flex items-center justify-center">
      <div className="relative w-full max-w-[620px] max-h-[92vh] overflow-y-auto rounded-[16px] sm:rounded-[20px] bg-[#fbfaf7] border border-[#e6e0d6] p-4 sm:p-6 md:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-[#ddd8cd] flex items-center justify-center text-[#0b3b2e] hover:bg-[#f6f4ef]"
        >
          <X size={17} />
        </button>

        <h3 className="font-serif text-[#0b3b2e] text-[22px] sm:text-[26px] leading-tight pr-10">
          Request a Consultation
        </h3>

        <p className="mt-2 text-[#6b7c76] text-[12px] sm:text-[13px] mb-5 sm:mb-6 leading-relaxed">
          Tell us a little about the concern. Our team will reach out with the
          next steps.
        </p>

        {success && (
          <p className="mb-4 rounded-[6px] bg-green-50 border border-green-200 px-3 sm:px-4 py-2 text-green-700 text-[12px] sm:text-sm">
            {success}
          </p>
        )}

        {error && (
          <p className="mb-4 rounded-[6px] bg-red-50 border border-red-200 px-3 sm:px-4 py-2 text-red-700 text-[12px] sm:text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
                Full Name *
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#0b3b2e]"
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
                className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#0b3b2e]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#0b3b2e]"
              />
            </div>

            <div>
              <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
                Concern
              </label>
              <select
                name="concern"
                value={formData.concern}
                onChange={handleChange}
                className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#0b3b2e]"
              >
                <option>Autism / ADHD</option>
                <option>Adult Mental Health</option>
                <option>Teenage Mental Health</option>
                <option>Senior Mental Health</option>
                <option>Neuro-Ayurveda</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
              Brief Message
            </label>
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share what you'd like clarity on..."
              className="w-full resize-none border border-[#ddd8cd] bg-white rounded-[6px] px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none focus:border-[#0b3b2e]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003f26] text-white py-3 rounded-full text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          <p className="text-[10px] sm:text-[11px] text-[#6b7c76] text-center">
            Online & in-clinic consultation available.
          </p>
        </form>
      </div>
    </div>
  );
}
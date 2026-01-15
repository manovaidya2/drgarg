import { Calendar, Phone } from "lucide-react";
import { useState } from "react";
import api from "../api/axiosInstance.js";

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    date: "",
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
      setSuccess("Appointment booked successfully!");
      setFormData({
        name: "",
        phone: "",
        location: "",
        date: "",
        message: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Appointment booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">

        {/* LEFT */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#8b43ba] mb-4 md:mb-6">
            Book Your Appointment
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 md:mb-8">
            Take the first step toward a healthier mind and body.
          </p>

          <div className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-3 sm:space-y-4 max-w-md mx-auto md:mx-0">
            <div className="flex items-center gap-3 sm:gap-4 justify-center md:justify-start">
              <Phone className="text-[#8b43ba]" />
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                +91 7823838638
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 justify-center md:justify-start">
              <Calendar className="text-[#8b43ba]" />
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                Mon – Sat | 11:00 AM – 7:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center md:text-left">
            Appointment Details
          </h3>

          {success && (
            <p className="text-green-600 mb-4 text-sm sm:text-base">{success}</p>
          )}
          {error && (
            <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
          )}

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="border rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="border rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>

            {/* Location & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City"
                required
                className="border rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>

            {/* Message */}
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your health issue"
              className="border rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8b43ba] text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base disabled:opacity-60 transition"
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

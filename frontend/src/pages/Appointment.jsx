import { Calendar, Phone, User, MessageCircle, MapPin } from "lucide-react";
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
      setError(
        err.response?.data?.message || "Appointment booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#8b43ba] mb-6">
            Book Your Appointment
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Take the first step toward a healthier mind and body.
          </p>

          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Phone className="text-[#8b43ba]" />
              <span className="text-gray-700 font-medium">
                +91 7823838638
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="text-[#8b43ba]" />
              <span className="text-gray-700 font-medium">
                Mon – Sat | 11:00 AM – 7:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Appointment Details
          </h3>

          {success && <p className="text-green-600 mb-4">{success}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name & Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="border rounded-xl px-4 py-3"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="border rounded-xl px-4 py-3"
              />
            </div>

            {/* Location & Date */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City"
                required
                className="border rounded-xl px-4 py-3"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-3"
              />
            </div>

            {/* Message */}
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your health issue"
              className="border rounded-xl px-4 py-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8b43ba] text-white py-4 rounded-xl disabled:opacity-60"
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

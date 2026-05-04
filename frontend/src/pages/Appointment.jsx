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
  <div className="bg-[#f6f4ef]">

    {/* HERO */}
    <section className="w-full border-b border-[#e6e0d6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">

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
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* CLINIC CARD */}
          <div className="bg-[#fbfaf7] border border-[#e6e0d6] rounded-[10px] p-6">
            <h3 className="font-serif text-[#0b3b2e] text-[18px] mb-4">
              Manovaidya Clinic
            </h3>

            <div className="space-y-4 text-[#40514d] text-[14px]">

              <p>
                <strong>Address</strong><br />
                Near Vinayak Hospital, Atta Market, Pocket E, Sector 27,<br />
                Noida, Uttar Pradesh 201301
              </p>

              <p>
                <strong>Phone</strong><br />
                078238 38638
              </p>

              <p>
                <strong>WhatsApp</strong><br />
                Chat on WhatsApp
              </p>

              <p>
                <strong>Email</strong><br />
                hello@manovaidya.in
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
              title="map"
              src="https://maps.google.com/maps?q=Noida&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[220px]"
            />
          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-[#fbfaf7] border border-[#e6e0d6] rounded-[10px] p-6 sm:p-8">

          <h3 className="font-serif text-[#0b3b2e] text-[18px] mb-2">
            Request a Consultation
          </h3>

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
        className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm"
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
        className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm"
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
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm"
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
        className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm"
      >
        <option>Autism / ADHD</option>
        <option>Adult Mental Health</option>
        <option>Teenage Mental Health</option>
      </select>
    </div>
  </div>

  {/* FULL WIDTH MESSAGE */}
  <div>
    <label className="block text-[#0b3b2e] text-[12px] font-medium mb-1">
      Brief Message
    </label>
    <textarea
      name="message"
      rows="4"
      value={formData.message}
      onChange={handleChange}
      placeholder="Share what you'd like clarity on..."
      className="w-full border border-[#ddd8cd] bg-white rounded-[6px] px-4 py-3 text-sm"
    />
  </div>

  {/* BUTTON */}
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-[#003f26] text-white py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
  >
    {loading ? "Submitting..." : "Submit Request"}
  </button>

  <p className="text-[11px] text-[#6b7c76] text-center">
    Online & in-clinic consultation available.
  </p>

</form>
        </div>

      </div>
    </section>

  </div>
);
}

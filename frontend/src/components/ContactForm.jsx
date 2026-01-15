import React from "react";

const ContactForm = ({ title = "Contact Information" }) => {
  return (
    <div className="border rounded-xl p-8 shadow-sm">
      <h3 className="font-semibold text-xl mb-6">{title}</h3>

      <form className="space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Phone"
            className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Message */}
        <textarea
          rows="5"
          placeholder="Message"
          className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

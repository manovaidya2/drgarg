import React, { useState } from "react";

export default function HealthyMindSection() {
  const youtubeVideoIds = [
    "yDXgoCLLE7c",
    "tELh7hghm0Y",
    "ZpXSu4BIRiE",
    "VIDEO_ID_4",
    "VIDEO_ID_5",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const prevVideo = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? youtubeVideoIds.length - 1 : prev - 1
    );
  };

  const nextVideo = () => {
    setCurrentIndex((prev) =>
      prev === youtubeVideoIds.length - 1 ? 0 : prev + 1
    );
  };

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="max-w-7xl mx-auto mt-16 px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-8 items-start">

        {/* LEFT CONTENT */}
        <div className="relative md:w-2/3 bg-[#8b43ba] text-white p-10 rounded-2xl overflow-hidden">
          <div className="absolute left-6 top-1 -translate-y-1/2 text-[#a66ad6] opacity-30 text-[260px] font-extrabold pointer-events-none">
            +
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            A Good and healthy body is the reason behind a healthy mind.
          </h2>

          <p className="text-white text-base md:text-lg relative z-10">
            A physically fit healthy body encourages the release of feel-good hormones.
          </p>
        </div>

        {/* RIGHT VIDEO CARD */}
        <div className="md:w-1/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Video Gallery
          </h3>

          {/* Clickable Video */}
          <div
            onClick={() => setIsOpen(true)}
            className="relative w-full h-[200px] md:h-[220px] rounded-xl overflow-hidden cursor-pointer group"
          >
            <iframe
              className="w-full h-full pointer-events-none"
              src={`https://www.youtube.com/embed/${youtubeVideoIds[currentIndex]}`}
              title="YouTube video"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="bg-white text-purple-700 rounded-full p-4 text-xl">
                ▶
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 mt-4">
            <button onClick={prevVideo} className="nav-btn">←</button>
            <button onClick={nextVideo} className="nav-btn">→</button>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-4">
            {youtubeVideoIds.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentIndex ? "bg-purple-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 VIDEO POPUP MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
          onClick={closeModal} // click outside closes
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/50 p-2 rounded-full hover:bg-black/80 transition"
            >
              ✕
            </button>

            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeVideoIds[currentIndex]}?autoplay=1&mute=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Button Styles */}
      <style>
        {`
          .nav-btn {
            background: #7c3aed;
            color: white;
            padding: 12px;
            border-radius: 9999px;
            font-size: 18px;
            transition: transform 0.2s;
          }
          .nav-btn:hover {
            transform: scale(1.1);
            background: #6d28d9;
          }
        `}
      </style>
    </>
  );
}

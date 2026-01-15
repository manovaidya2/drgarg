import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";



export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Matthews",
      role: "Finance Manager, UAE",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    },
    {
      id: 2,
      name: "Sarah Al Nahyan",
      role: "Marketing Director, UAE",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    },
    {
      id: 3,
      name: "John Matthews",
      role: "Finance Manager, UK",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-12">
        {/* Heading */}
        <div className="text-center mb-12">
          {/* <img
            src={logo}
            alt="Eagle Icon"
            className="mx-auto mb-4 w-10"
          /> */}
          <h2 className="text-3xl font-bold mb-4">What’s our Patients says</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Navigation]}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white border rounded-lg shadow-md p-6 text-left">
                {/* Profile */}
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                {/* Feedback */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {testimonial.feedback}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Controls Below */}
       {/* Custom Controls in a single row */}
<div className="flex justify-end items-center mt-6 space-x-4">
  {/* Pagination Dots */}
  <div className="custom-pagination flex space-x-2"></div>

  {/* Navigation Arrows */}
  <div className="flex space-x-2">
    <button className="custom-prev px-3 py-1 bg-gray-200 rounded">←</button>
    <button className="custom-next px-3 py-1 bg-gray-200 rounded">→</button>
  </div>
</div>

      </div>
    </section>
  );
}

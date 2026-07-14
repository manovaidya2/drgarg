import React, { useState } from "react";
import { ArrowRight, MessageCircleHeart, Quote, ShieldCheck, Star, Video } from "lucide-react";
import ConsultationPopup from "../components/ConsultationPopup";
import { GlobalSEO } from "../components/SEOProvider";

const videoTestimonials = [
  {
    id: "yDXgoCLLE7c",
    title: "Parent Story: Autism Care Journey",
    category: "Child Development",
    note: "A family shares how structured guidance helped them understand progress more clearly.",
  },
  {
    id: "tELh7hghm0Y",
    title: "Understanding ADHD & Behaviour",
    category: "ADHD Support",
    note: "Real concerns, practical direction, and a calmer way to look at behaviour challenges.",
  },
  {
    id: "ZpXSu4BIRiE",
    title: "Mental Wellness Experience",
    category: "Mental Health",
    note: "A patient-focused story around trust, listening, and step-by-step support.",
  },
];

export default function TestimonialVideosPage() {
  const [activeVideo, setActiveVideo] = useState(videoTestimonials[0]);
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <GlobalSEO
        seo={{
          title: "Testimonial Videos | Dr. Ankush Garg",
          description:
            "Watch testimonial videos from families and patients sharing their experience with Dr. Ankush Garg and the Neuro-Ayurveda approach.",
          keywords:
            "Dr Ankush Garg video testimonials, patient video reviews, Manovaidya reviews, autism care videos",
          canonical: "https://drankushgarg.in/testimonial-videos",
          image: "https://drankushgarg.in/og-image.jpg",
        }}
      />

      <nav className="w-full bg-[#fbfaf6] pt-6 px-4 sm:px-6 lg:px-10" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-[#5d625b] text-sm">
          <li>
            <a href="/" className="hover:text-[#d98923] transition-colors">
              Home
            </a>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#b9cac1]">/</span>
            <span className="text-[#002b18] font-medium">Testimonial Videos</span>
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden bg-[#fbfaf6] px-4 pb-10 pt-3 sm:px-6 sm:pt-4 lg:px-10">
        <div className="absolute right-[-90px] top-[-110px] h-[300px] w-[300px] rounded-full bg-[#d8a33d]/18 blur-3xl" />
        <div className="absolute bottom-[-130px] left-[-110px] h-[300px] w-[300px] rounded-full bg-[#0b5a3d]/12 blur-3xl" />

        <div className="relative mx-auto grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8a33d]/40 bg-white/80 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#064834]">
              <Video size={15} />
              Video Stories
            </div>

            <h1 className="mt-5 font-serif text-[34px] font-semibold leading-[1.05] text-[#003f26] sm:text-[46px] lg:text-[56px]">
              Real Stories of
              <br />
              Progress & Trust
            </h1>

            <p className="mt-5 max-w-[680px] text-[16px] font-medium leading-[1.75] text-[#43554d] sm:text-[18px]">
              Hear families and patients share their journey toward better
              understanding, steady progress, and clearer care through structured
              Neuro-Ayurveda guidance.
            </p>

            <div className="mt-7 grid max-w-[620px] grid-cols-3 overflow-hidden rounded-[14px] border border-[#e4ddd0] bg-white/86 shadow-[0_18px_45px_rgba(5,54,39,0.07)]">
              {[
                ["4.9", "Google Rating"],
                ["7+", "Year Experience"],
                ["Family", "Centred Care"],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-[#ebe5da] px-3 py-4 text-center last:border-r-0">
                  <div className="text-[22px] font-bold text-[#064834]">{value}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7c7468]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/70 bg-white p-3 shadow-[0_28px_75px_rgba(5,54,39,0.16)]">
            <div className="overflow-hidden rounded-[18px] bg-[#061f17]">
              <div className="aspect-video">
                <iframe
                  key={activeVideo.id}
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${activeVideo.id}`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="grid gap-4 px-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#c77700]">
                  {activeVideo.category}
                </p>
                <h2 className="mt-1 text-[20px] font-bold text-[#08251d]">
                  {activeVideo.title}
                </h2>
              </div>
              <button
                onClick={() => setOpenPopup(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[7px] bg-[#064834] px-5 text-[14px] font-semibold text-white transition hover:bg-[#053b2b]"
              >
                Talk to Team
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f4ef] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#c77700]">
                Watch More
              </p>
              <h2 className="mt-2 font-serif text-[30px] font-semibold text-[#003f26]">
                Patient & Family Video Testimonials
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#506158]">
              <ShieldCheck size={17} className="text-[#064834]" />
              Shared with care and respect
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {videoTestimonials.map((video) => (
              <article
                key={video.id}
                className={`group overflow-hidden rounded-[18px] border bg-white text-left shadow-[0_16px_38px_rgba(5,54,39,0.07)] transition hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(5,54,39,0.11)] ${
                  activeVideo.id === video.id ? "border-[#d8a33d]" : "border-[#e3ddd2]"
                }`}
              >
                <div className="overflow-hidden bg-[#08251d]">
                  <iframe
                    className="aspect-video h-full w-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3 inline-flex rounded-full bg-[#edf6ef] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#064834]">
                    {video.category}
                  </div>
                  <div className="mb-3 flex items-center gap-1 text-[#fbbc04]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} className="fill-current" />
                    ))}
                  </div>
                  <h3 className="text-[18px] font-bold leading-snug text-[#10251d]">
                    {video.title}
                  </h3>
                  <p className="mt-3 text-[14px] font-medium leading-[1.65] text-[#5b6962]">
                    {video.note}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[#064834] transition hover:text-[#0a7a5b]"
                  >
                    Show in featured player
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f4ef] px-4 pb-8 sm:px-6 lg:px-10">
        <div className="mx-auto grid gap-6 rounded-[22px] bg-[#003f26] p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div className="flex gap-4">
            <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 sm:flex">
              <Quote size={25} />
            </div>
            <div>
              <h2 className="font-serif text-[26px] font-semibold sm:text-[34px]">
                Start with a Clear First Conversation
              </h2>
              <p className="mt-3 max-w-[760px] text-[15px] font-medium leading-relaxed text-white/82 sm:text-[17px]">
                Share your concern with the team and understand the next step in a
                calm, structured way.
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpenPopup(true)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[7px] bg-[#e86f2d] px-6 text-[15px] font-semibold text-white transition hover:bg-[#d96122]"
          >
            Book Consultation
            <MessageCircleHeart size={18} />
          </button>
        </div>
      </section>

      <ConsultationPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} />
    </>
  );
}

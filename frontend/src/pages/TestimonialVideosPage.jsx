import React, { useState } from "react";
import { ArrowRight, MessageCircleHeart, Play, Quote, ShieldCheck, Star, Video, X } from "lucide-react";
import ConsultationPopup from "../components/ConsultationPopup";
import { GlobalSEO } from "../components/SEOProvider";

const videoTestimonials = [
  {
    id: "P1EzrOrCBaQ",
    title: "Patient Testimonial",
    category: "Patient Stories",
    note: "A patient shares their experience with the care and guidance received.",
  },
  {
    id: "T5COBNiZBPA",
    title: "Patient Review",
    category: "Patient Stories",
    note: "A real story of support, clarity, and step-by-step improvement.",
  },
  {
    id: "CFmxG7ag8aw",
    title: "Patient Testimonial",
    category: "Patient Stories",
    note: "A patient experience focused on trust and personalised guidance.",
  },
  {
    id: "yE5B2b6Nz-I",
    title: "Patient Review",
    category: "Patient Stories",
    note: "A family shares how structured care helped them move forward.",
  },
  {
    id: "zWGZu4FyvZk",
    title: "Patient Testimonial",
    category: "Patient Stories",
    note: "A real patient review about understanding the concern more clearly.",
  },
  {
    id: "kpLxO-rhE4Y",
    title: "Patient Review",
    category: "Patient Stories",
    note: "A testimonial about consistent care and practical direction.",
  },
  {
    id: "DB_20OKcSPU",
    title: "Patient Testimonial",
    category: "Patient Stories",
    note: "A patient story around confidence, listening, and treatment support.",
  },
  {
    id: "txI3ibnhYsQ",
    title: "Patient Review",
    category: "Patient Stories",
    note: "A real experience with calm guidance and continued support.",
  },
  {
    id: "qrbAJOdX3u0",
    title: "Patient Testimonial",
    category: "Patient Stories",
    note: "A testimonial sharing the journey toward better health and clarity.",
  },
  {
    id: "-qY0JodSp20",
    title: "Patient Review",
    category: "Patient Stories",
    note: "A patient review about helpful consultation and trusted care.",
  },
  {
    id: "IcJ6fd0rbME",
    title: "Patient Testimonial",
    category: "Patient Stories",
    note: "A patient shares their personal care experience and progress.",
  },
  {
    id: "L2awCtw7Z10",
    title: "Mental Health Testimonial",
    category: "Mental Health",
    note: "A mental health testimonial about support, comfort, and clear guidance.",
  },
  {
    id: "H1X9SBY8lYc",
    title: "Mental Health Review",
    category: "Mental Health",
    note: "A patient story around emotional wellness and structured support.",
  },
  {
    id: "ethPzmvNBZI",
    title: "Mental Health Testimonial",
    category: "Mental Health",
    note: "A mental wellness experience focused on trust and understanding.",
  },
  {
    id: "yHBcuzzd4Po",
    title: "Mental Health Review",
    category: "Mental Health",
    note: "A patient shares their mental health care journey and experience.",
  },
  {
    id: "pAx7KRw2pkA",
    title: "PCOD & Mental Stress Testimonial",
    category: "PCOD & Stress",
    note: "A testimonial related to PCOD, stress, and supportive care.",
  },
  {
    id: "GV24TNwFo_k",
    title: "Patient Testimonial",
    category: "Patient Stories",
    note: "A real patient video sharing their experience with care and support.",
  },
  {
    id: "8A-lM_CQ1XU",
    title: "Patient Review",
    category: "Patient Stories",
    note: "A testimonial about guidance, confidence, and treatment experience.",
  },
  {
    id: "fBpPDtd_Atw",
    title: "Patient Testimonial",
    category: "Patient Stories",
    note: "A patient video testimonial sharing their experience with consultation and care.",
  },
  {
    id: "bjjLj90eZB8",
    title: "Patient Review",
    category: "Patient Stories",
    note: "A patient review about trusted guidance and supportive treatment experience.",
  },
];

export default function TestimonialVideosPage() {
  const heroVideo = videoTestimonials[videoTestimonials.length - 1];
  const [popupVideo, setPopupVideo] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const openVideoPopup = (video) => {
    setPopupVideo(video);
  };

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
                  key={heroVideo.id}
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${heroVideo.id}?rel=0`}
                  title={heroVideo.title}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="grid gap-4 px-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#c77700]">
                  {heroVideo.category}
                </p>
                <h2 className="mt-1 text-[20px] font-bold text-[#08251d]">
                  {heroVideo.title}
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
                  heroVideo.id === video.id ? "border-[#d8a33d]" : "border-[#e3ddd2]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => openVideoPopup(video)}
                  className="relative block aspect-video w-full overflow-hidden bg-[#08251d] text-left"
                  aria-label={`Play ${video.title}`}
                >
                  <img
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                  <span className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#064834] shadow-[0_14px_32px_rgba(0,0,0,0.25)] transition group-hover:scale-105">
                    <Play size={24} className="ml-1 fill-current" />
                  </span>
                </button>
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
                    onClick={() => openVideoPopup(video)}
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[#064834] transition hover:text-[#0a7a5b]"
                  >
                    Watch video
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

      {popupVideo && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/72 px-4 py-24 sm:py-28">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close video popup"
            onClick={() => setPopupVideo(null)}
          />
          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[18px] bg-white shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#eee6d9] px-4 py-3 sm:px-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#c77700]">
                  {popupVideo.category}
                </p>
                <h2 className="text-[18px] font-bold text-[#08251d]">
                  {popupVideo.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPopupVideo(null)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4efe6] text-[#08251d] transition hover:bg-[#e8dccb]"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video w-full bg-[#061f17]">
              <iframe
                key={popupVideo.id}
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${popupVideo.id}?rel=0&autoplay=1`}
                title={popupVideo.title}
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <ConsultationPopup isOpen={openPopup} onClose={() => setOpenPopup(false)} />
    </>
  );
}

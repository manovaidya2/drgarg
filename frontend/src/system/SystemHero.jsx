import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  FileSearch,
  HeartHandshake,
  Leaf,
  Sparkles,
  Target,
} from "lucide-react";

const orbitItems = [
  { icon: Target, label: "Root Cause Focused", angle: -90 },
  { icon: Sparkles, label: "Holistic Healing", angle: -18 },
  { icon: FileSearch, label: "Evidence Informed", angle: 54 },
  { icon: Leaf, label: "Lifelong Wellness", angle: 126 },
  { icon: HeartHandshake, label: "Personalized Care", angle: 198 },
];

function HeadTreeIllustration() {
  return (
    <svg
      viewBox="-17 -10 240 300"
      className="h-[190px] w-[152px] sm:h-[260px] sm:w-[208px]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="headGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0b3d2b" />
          <stop offset="55%" stopColor="#4c7a5f" />
          <stop offset="100%" stopColor="#dce8df" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="140" r="105" fill="#eef4ee" />

      {/* canopy */}
      <circle cx="103" cy="35" r="23" fill="url(#headGrad)" opacity="0.85" />
      <circle cx="76" cy="49" r="18" fill="url(#headGrad)" opacity="0.85" />
      <circle cx="130" cy="49" r="18" fill="url(#headGrad)" opacity="0.85" />
      <circle cx="88" cy="17" r="15" fill="url(#headGrad)" opacity="0.85" />
      <circle cx="118" cy="17" r="15" fill="url(#headGrad)" opacity="0.85" />
      <circle cx="103" cy="6" r="12" fill="url(#headGrad)" opacity="0.85" />

      {/* trunk */}
      <rect x="100.5" y="40" width="5" height="40" rx="2.5" fill="url(#headGrad)" />

      {/* head + wider profile */}
      <ellipse cx="106" cy="128" rx="52" ry="58" fill="url(#headGrad)" />
      <ellipse cx="52" cy="150" rx="32" ry="38" fill="url(#headGrad)" />

      {/* neck + shoulders */}
      <rect x="83" y="162" width="48" height="42" rx="13" fill="url(#headGrad)" />
      <path
        d="M8,278 C8,222 42,190 85,185 L147,185 C180,190 198,222 198,278 L198,282 L8,282 Z"
        fill="url(#headGrad)"
      />

      {/* root lines */}
      <path
        d="M60,278 C52,286 42,288 32,288 M150,278 C158,286 168,288 178,288"
        stroke="#075640"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* leaf accent dots */}
      <circle cx="58" cy="20" r="3" fill="#d8b46a" opacity="0.7" />
      <circle cx="150" cy="26" r="3" fill="#d8b46a" opacity="0.7" />
      <circle cx="70" cy="-4" r="2" fill="#075640" opacity="0.4" />
      <circle cx="138" cy="0" r="2" fill="#075640" opacity="0.4" />
    </svg>
  );
}

function OrbitIllustration() {
  const mobileRadius = 36;
  const desktopRadius = 42;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:h-[420px] sm:w-[420px] sm:max-w-none">
      <div className="absolute inset-10 rounded-full border border-dashed border-[#cbd9cf]" />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-end justify-center">
        <HeadTreeIllustration />
      </div>

      {orbitItems.map((item) => {
        const Icon = item.icon;
        const { label, angle } = item;
        const rad = (angle * Math.PI) / 180;
        const xMobile = mobileRadius * Math.cos(rad);
        const yMobile = mobileRadius * Math.sin(rad);
        const xDesktop = desktopRadius * Math.cos(rad);
        const yDesktop = desktopRadius * Math.sin(rad);
        return (
          <div
            key={label}
            className="absolute left-[calc(50%+var(--x-mobile))] top-[calc(50%+var(--y-mobile))] flex w-[74px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center sm:left-[calc(50%+var(--x-desktop))] sm:top-[calc(50%+var(--y-desktop))] sm:w-[104px]"
            style={{
              "--x-mobile": `${xMobile}%`,
              "--y-mobile": `${yMobile}%`,
              "--x-desktop": `${xDesktop}%`,
              "--y-desktop": `${yDesktop}%`,
            }}
          >
            <div className="grid h-10 w-10 place-items-center rounded-full border border-[#e5e2d9] bg-white text-[#075640] shadow-[0_8px_18px_rgba(5,54,39,0.1)] sm:h-12 sm:w-12">
              <Icon size={19} strokeWidth={1.8} />
            </div>
            <p className="text-[9px] font-bold uppercase leading-[1.25] tracking-[0.03em] text-[#3f5049] sm:text-[10.5px]">
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function SystemHero() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://drankushgarg.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Neuro-Ayurveda Development System",
        item: "https://drankushgarg.in/neuro-ayurveda-system",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <nav className="w-full bg-[#fbfaf6] px-4 pt-3 md:px-10 md:pt-4" aria-label="Breadcrumb">
        <div className="mx-auto">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-[#6a7570]">
            <li className="flex items-center">
              <a href="/" className="font-medium transition-colors hover:text-[#075640]">
                Home
              </a>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight size={14} className="text-[#c9d3cb]" />
              <span className="font-semibold text-[#075640]">
                Neuro-Ayurveda Development System
              </span>
            </li>
          </ol>
        </div>
      </nav>

      <section className="w-full bg-[#fbfaf6] pb-8 pt-3 md:pb-12 md:pt-4">
        <div className="mx-auto grid grid-cols-1 items-center gap-10 px-4 md:px-10 lg:grid-cols-[1.35fr_minmax(400px,0.85fr)] lg:gap-8">
          <div>
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full bg-white px-4 py-1.5 text-left text-[11px] font-bold uppercase leading-[1.4] tracking-[0.14em] text-[#075640] shadow-sm">
              A Structured Framework For Development, Behaviour, And Emotional Wellbeing
            </div>

            <h1 className="max-w-2xl font-serif text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-[#075640] sm:text-[42px] md:text-[48px]">
              Neuro-Ayurveda Development System&trade;
            </h1>

            <p className="mt-5 max-w-xl text-[17px] font-semibold leading-[1.5] text-[#20332c] sm:text-[19px]">
              A Structured Framework for the Development, Behaviour, and Emotional Wellbeing
            </p>

            <div className="mt-5 max-w-xl space-y-4 text-[15px] font-medium leading-[1.85] text-[#45544e]">
              <p>
                Developed by Dr. Ankush Garg, the Neuro-Ayurveda Development
                System&trade; presents a structured framework to view
                developmental, behavioural, emotional, and wellbeing-related
                issues from a wider and more integrated lens.
              </p>
              <p>
                Concerns are often complex and cannot be captured through
                symptoms alone. For example, a child may have attention and
                behavioural issues with outbursts and delays in speech with
                sensory and emotional regulation issues. A young adult may have
                anxiety, stress and issues with thinking and sleep with
                mind-body symptoms.
              </p>
              <p>
                In many of these situations, the problems are multifactorial
                and are related to several interdependent causes.
              </p>
              <p>
                To address the problem of complexity, the Neuro-Ayurveda
                Development System&trade; was designed with the intention to
                bring greater clarity and understanding to the individuals and
                families that were previously experiencing confusion.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/appointment"
                className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#075640] px-7 text-[13px] font-bold uppercase tracking-[0.03em] text-white shadow-[0_14px_30px_rgba(5,54,39,0.22)] transition hover:bg-[#064834] sm:w-auto"
              >
                Book A 1:1 Consultation
              </Link>
              <a
                href="#five-pillars"
                className="inline-flex h-[50px] w-full items-center justify-center rounded-[6px] border border-[#a9c2b4] bg-white px-7 text-[13px] font-bold uppercase tracking-[0.03em] text-[#075640] transition hover:bg-[#edf6ef] sm:w-auto"
              >
                Explore The System
              </a>
            </div>
          </div>

          <div className="lg:-mt-10">
            <OrbitIllustration />
          </div>
        </div>
      </section>
    </>
  );
}

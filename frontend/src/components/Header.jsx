// import { Link, NavLink } from "react-router-dom";
// import { Plus, Menu, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import logo from "../images/dr-logo1.png";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [psyOpen, setPsyOpen] = useState(false);
//   const [neuroOpen, setNeuroOpen] = useState(false);
//   const [psychoOpen, setPsychoOpen] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//   }, [open]);

//   const psychologicalSubmenu = [
//     { name: "Depression Treatment", path: "https://manovaidya.in/depression-treatment.php" },
//     { name: "Anxiety Disorder", path: "https://manovaidya.in/anxiety-disorder-treatment.php" },
//     { name: "Stress Management", path: "https://manovaidya.in/stress-management-therapy.php" },
//     { name: "Mood Swings", path: "https://manovaidya.in/mood-swings.php" },
//     { name: "OCD", path: "https://manovaidya.in/ocd-treatment.php" },
//     { name: "Addiction", path: "https://manovaidya.in/addiction.php" },
//     { name: "Suicidal Thoughts", path: "https://manovaidya.in/suicidal-thoughts.php" },
//     { name: "ADHD", path: "https://manovaidya.in/adhd-in-children-treatment.php" },
//     { name: "Personality Disorder", path: "https://manovaidya.in/personality.php" },
//     { name: "PTSD", path: "https://manovaidya.in/ptsd-treatment.php" },
//     { name: "Dissociative Disorders", path: "https://manovaidya.in/dissociative.php" },
//     { name: "Eating Disorders", path: "https://manovaidya.in/eating-disorde.php" },
//     { name: "Bipolar Disorder", path: "https://manovaidya.in/bipolar-disorder-treatment.php" },
//   ];

//   const neurologicalSubmenu = [
//     { name: "Autism", path: "https://manovaidya.in/autism-treatment.php" },
//     { name: "Migraine", path: "https://manovaidya.in/migraine-treatment.php" },
//     { name: "Sleep Disorders", path: "https://manovaidya.in/sleep-disorder-treatment.php" },
//     { name: "Schizophrenia", path: "https://manovaidya.in/schizophrenia.php" },
//     { name: "Stroke / Paralysis", path: "https://manovaidya.in/stroke-paralysis.php" },
//     { name: "Parkinson’s", path: "https://manovaidya.in/parkinsons-disease-treatment.php" },
//     { name: "Epilepsy", path: "https://manovaidya.in/epilepsy.php" },
//     { name: "Multiple Sclerosis", path: "https://manovaidya.in/multiple-sclerosis.php" },
//     { name: "Neuropathy", path: "https://manovaidya.in/neuropathy-neuralgia.php" },
//     { name: "Dementia / Alzheimer’s", path: "https://manovaidya.in/dementia.php" },
//   ];

//   const psychosomaticSubmenu = [
//     { name: "PCOD", path: "https://manovaidya.in/pcod.php" },
//     { name: "Thyroid", path: "https://manovaidya.in/thyroid.php" },
//     { name: "IBS", path: "https://manovaidya.in/ibs.php" },
//     { name: "Gastro Issues", path: "https://manovaidya.in/gastrointestinal-issues.php" },
//     { name: "Asthma", path: "https://manovaidya.in/asthma.php" },
//     { name: "Heart Risk", path: "https://manovaidya.in/heart-risk.php" },
//     { name: "Fibromyalgia", path: "https://manovaidya.in/fibromyalgia.php" },
//     { name: "Blood Pressure", path: "https://manovaidya.in/blood-pressure.php" },
//   ];

//   return (
//     <>
//       {/* ================= HEADER ================= */}
//       <header className="sticky top-0 z-50 bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center justify-between h-20">
//             {/* LOGO */}
//             <Link to="/">
//               <img src={logo} alt="Dr Ankush Garg" className="h-10 w-44" />
//             </Link>

//             {/* DESKTOP NAV */}
//             <nav className="hidden lg:flex items-center gap-6 text-[15px] font-semibold">
//               <NavLink to="/" className="hover:text-[#8b43ba]">Home</NavLink>
//               <NavLink to="/about" className="hover:text-[#8b43ba]">About</NavLink>
//               <NavLink to="/blog" className="hover:text-[#8b43ba]">Blogs</NavLink>
//                <NavLink to="/media-coverage" className="hover:text-[#8b43ba]">Media Coverage</NavLink>

//               {[{
//                 title: "Psychological",
               
//                 data: psychologicalSubmenu
//               }, {
//                 title: "Neurological",
            
//                 data: neurologicalSubmenu
//               }, {
//                 title: "Psychosomatic",
                
//                 data: psychosomaticSubmenu
//               }].map(menu => (
//                 <div key={menu.title} className="relative group">
//                   <NavLink to={menu.base} className="hover:text-[#8b43ba]">{menu.title}</NavLink>
//                   <div className="absolute top-full left-0 pt-3 w-[340px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
//                     <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
//                       {menu.data.map(item => (
//                         <Link key={item.name} to={item.path} className="block px-6 py-2 text-[14px] hover:bg-purple-50 hover:text-[#8b43ba]">
//                           {item.name}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               <NavLink to="/case-study" className="hover:text-[#8b43ba]">Case Study</NavLink>
//             </nav>

//             {/* DESKTOP CTA */}
//             <Link to="/appointment" className="hidden md:flex items-center gap-3 bg-[#8b43ba] text-white px-6 py-3 rounded-2xl shadow-lg">
//               <span className="w-8 h-8 bg-white text-[#8b43ba] rounded-full flex items-center justify-center">
//                 <Plus size={18} />
//               </span>
//               Book Consultation
//             </Link>

//             {/* MOBILE HEADER BUTTONS */}
//             <div className="flex items-center gap-3 lg:hidden">
//               {/* + ICON */}
//               <Link to="/appointment" className="w-11 h-11 bg-[#8b43ba] rounded-xl flex items-center justify-center shadow-lg">
//                 <span className="w-6 h-6 bg-white text-[#8b43ba] rounded-full flex items-center justify-center">
//                   <Plus size={18} />
//                 </span>
//               </Link>
//               {/* MENU ICON */}
//               <button onClick={() => setOpen(true)} className="p-2 border rounded-md">
//                 <Menu size={26} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* OVERLAY */}
//       {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40" />}

//       {/* ================= MOBILE SIDEBAR ================= */}
//       <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
//         {/* ===== FIXED HEADER ===== */}
//         <div className="sticky top-0 bg-white z-10 border-b">
//           <div className="flex justify-between items-center p-5">
//             <span className="font-semibold text-[#8b43ba] text-lg">Dr. Ankush Garg</span>
//             <button onClick={() => setOpen(false)}><X /></button>
//           </div>
//         </div>

//         {/* ===== SCROLLABLE MENU ===== */}
//         <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto px-5 py-3 gap-2 text-[15px]">
//           <NavLink to="/" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-purple-50">Home</NavLink>
//           <NavLink to="/about" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-purple-50">About</NavLink>
//           <NavLink to="/blog" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-purple-50">Blogs</NavLink>
//           <NavLink
//   to="/media-coverage"
//   onClick={() => setOpen(false)}
//   className="block px-4 py-2 rounded-lg hover:bg-purple-50"
// >
//   Media Coverage
// </NavLink>


//           {/* PSYCHOLOGICAL */}
//           <button onClick={() => setPsyOpen(!psyOpen)} className="w-full flex justify-between px-4 py-2 rounded-lg hover:bg-purple-50">
//             Psychological <span>{psyOpen ? "−" : "+"}</span>
//           </button>
//           {psyOpen && psychologicalSubmenu.map(i => (
//             <Link key={i.name} to={i.path} onClick={() => setOpen(false)} className="block ml-4 px-2 py-1 hover:text-[#8b43ba]">{i.name}</Link>
//           ))}

//           {/* NEUROLOGICAL */}
//           <button onClick={() => setNeuroOpen(!neuroOpen)} className="w-full flex justify-between px-4 py-2 rounded-lg hover:bg-purple-50">
//             Neurological <span>{neuroOpen ? "−" : "+"}</span>
//           </button>
//           {neuroOpen && neurologicalSubmenu.map(i => (
//             <Link key={i.name} to={i.path} onClick={() => setOpen(false)} className="block ml-4 px-2 py-1 hover:text-[#8b43ba]">{i.name}</Link>
//           ))}

//           {/* PSYCHOSOMATIC */}
//           <button onClick={() => setPsychoOpen(!psychoOpen)} className="w-full flex justify-between px-4 py-2 rounded-lg hover:bg-purple-50">
//             Psychosomatic <span>{psychoOpen ? "−" : "+"}</span>
//           </button>
//           {psychoOpen && psychosomaticSubmenu.map(i => (
//             <Link key={i.name} to={i.path} onClick={() => setOpen(false)} className="block ml-4 px-2 py-1 hover:text-[#8b43ba]">{i.name}</Link>
//           ))}

//           <NavLink to="/case-study" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-purple-50">Case Study</NavLink>

//           {/* APPOINTMENT BUTTON AT BOTTOM */}
//           <div className="mt-4">
//             <Link to="/appointment" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 bg-[#8b43ba] text-white py-3 rounded-xl shadow">
//               <Plus size={18} /> Book Consultation
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import ConsultationPopup from "../components/ConsultationPopup";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileDrop, setMobileDrop] = useState(null);
  const menuRef = useRef(null);
  const [openPopup, setOpenPopup] = useState(false);

  const primaryNav = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/neuro-ayurveda-system", label: "The System" },
    {
      label: "Conditions",
      children: [
        { to: "/autism-adhd", label: "Autism & ADHD", description: "Children & developmental care" },
        { to: "/adult-mental-health", label: "Adult Mental Health", description: "Anxiety, OCD, depression" },
        { to: "/teenage-mental-health", label: "Teenage Mental Health", description: "Behaviour & focus" },
        { to: "/seniour-mental-health", label: "Senior Mental Health", description: "Memory, cognition, sleep" },
      ],
    },
    {
      label: "Results",
      children: [
        { to: "/case-study", label: "Case Studies", description: "Documented outcomes" },
        { to: "/testimonials", label: "Testimonials", description: "In their own words" },
        { to: "/media-coverage", label: "Media & Press", description: "Features & talks" },
      ],
    },
    { to: "/blog", label: "Insights" },
    { to: "/appointment", label: "Contact" },
  ];

  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-[999] w-full border-b border-[#ece8df] bg-[#fffdf8]/95 backdrop-blur-md">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between gap-2 py-2.5 sm:py-3">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
              <div className="h-[44px] w-[45px] sm:h-[54px] sm:w-[56px] rounded-[5px] bg-[#002b18] grid place-items-center font-serif text-[21px] sm:text-[24px] shadow-sm border border-[#c7902f]/30 shrink-0">
                <span className="text-[#d8a33d]">A</span>
              </div>

              <div className="leading-tight min-w-0">
                <div className="font-serif text-[18px] sm:text-[22px] xl:text-[24px] text-[#002b18] tracking-tight truncate">
                  Dr. Ankush Garg
                </div>
                <div className="mt-1 text-[8px] sm:text-[11px] xl:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.32em] text-[#c77700] font-medium truncate max-w-[210px] sm:max-w-none">
                  Manovaidya · Neuro-Ayurveda
                </div>
              </div>
            </Link>

            <nav
              ref={menuRef}
              className="hidden xl:flex items-center gap-4 2xl:gap-6 text-[16px] 2xl:text-[18px] shrink-0"
            >
              {primaryNav.map((item) => {
                if (item.children) {
                  const isOpen = openMenu === item.label;

                  return (
                    <div key={item.label} className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenMenu(isOpen ? null : item.label)}
                        className={`inline-flex items-center gap-1 px-1 py-2 transition-colors whitespace-nowrap ${
                          isOpen
                            ? "text-[#002b18] font-semibold"
                            : "text-[#5f6963] hover:text-[#002b18]"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={17}
                          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isOpen && (
                        <div className="absolute left-0 top-full mt-5 w-[300px] z-[99999] rounded-sm border border-[#ece8df] bg-[#fffdf8] shadow-2xl">
                          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#d8a33d] to-transparent" />

                          <div className="p-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.to}
                                to={child.to}
                                onClick={() => setOpenMenu(null)}
                                className="block rounded-sm px-4 py-3 hover:bg-[#f4ead7] transition-colors group"
                              >
                                <div className="font-medium text-[#002b18] text-[15px] group-hover:text-[#064f2e]">
                                  {child.label}
                                </div>
                                <div className="text-[13px] text-[#72776f] mt-1">
                                  {child.description}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `px-1 py-2 transition-colors whitespace-nowrap ${
                        isActive
                          ? "text-[#002b18] font-semibold"
                          : "text-[#5f6963] hover:text-[#002b18]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <a
                href="tel:07823838638"
                className="hidden 2xl:inline-flex items-center gap-2 text-[14px] text-[#656b66] hover:text-[#002b18] whitespace-nowrap"
              >
                <Phone size={16} className="text-[#c77700]" />
                078238 38638
              </a>

              <button
  onClick={() => setOpenPopup(true)}
  className="inline-flex items-center justify-center rounded-[5px] bg-[#002b18] px-5 xl:px-6 py-4 text-[15px] xl:text-[16px] font-bold text-white shadow-sm hover:bg-[#064f2e] transition border border-[#d8a33d]/20 whitespace-nowrap"
>
  Book Consultation
</button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="xl:hidden inline-flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-md border border-[#ece8df] text-[#002b18]"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="xl:hidden fixed inset-0 z-[9999] bg-black/40">
          <button
            type="button"
            className="absolute inset-0 w-full h-full"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />

          <div className="absolute right-0 top-0 h-full w-[88%] max-w-[380px] bg-[#fffdf8] shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#ece8df] px-4 py-4 sticky top-0 bg-[#fffdf8] z-10">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-[42px] w-[43px] rounded-[5px] bg-[#002b18] grid place-items-center font-serif text-[20px] border border-[#c7902f]/30 shrink-0">
                  <span className="text-[#d8a33d]">A</span>
                </div>
                <div className="min-w-0 leading-tight">
                  <div className="font-serif text-[17px] text-[#002b18] truncate">
                    Dr. Ankush Garg
                  </div>
                  <div className="text-[8px] uppercase tracking-[0.2em] text-[#c77700] truncate">
                    Manovaidya
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-10 w-10 shrink-0 rounded-md border border-[#ece8df] flex items-center justify-center text-[#002b18]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="px-4 py-4 grid gap-1">
              {primaryNav.map((item) => {
                if (item.children) {
                  const isDropOpen = mobileDrop === item.label;

                  return (
                    <div key={item.label} className="py-1">
                      <button
                        type="button"
                        onClick={() => setMobileDrop(isDropOpen ? null : item.label)}
                        className="w-full flex items-center justify-between rounded-sm px-3 py-3 text-[15px] font-medium text-[#002b18] hover:bg-[#f4ead7]"
                      >
                        {item.label}
                        <ChevronDown
                          size={17}
                          className={`transition-transform ${isDropOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isDropOpen && (
                        <div className="ml-3 mt-1 border-l border-[#e2d8c9] pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              onClick={() => setOpen(false)}
                              className="block rounded-sm px-3 py-2.5 text-[14px] text-[#4f5b54] hover:bg-[#f4ead7]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-sm px-3 py-3 text-[15px] ${
                        isActive
                          ? "bg-[#f4ead7] text-[#002b18] font-semibold"
                          : "text-[#4f5b54] hover:bg-[#f4ead7]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}

              <a
                href="tel:07823838638"
                className="mt-3 flex items-center justify-center gap-2 rounded-[5px] border border-[#ece8df] px-4 py-3 text-[14px] font-medium text-[#002b18]"
              >
                <Phone size={16} className="text-[#c77700]" />
                078238 38638
              </a>
<button
  onClick={() => {
    setOpen(false);
    setOpenPopup(true);
  }}
  className="mt-2 inline-flex items-center justify-center rounded-[5px] bg-[#002b18] px-5 py-4 text-[15px] font-semibold text-white"
>
  Book Consultation
</button>
            </div>
          </div>
        </div>
      )}
      <ConsultationPopup
  isOpen={openPopup}
  onClose={() => setOpenPopup(false)}
/>
    </>
  );
}
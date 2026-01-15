import { Link, NavLink } from "react-router-dom";
import { Plus, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../images/dr-logo1.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [psyOpen, setPsyOpen] = useState(false);
  const [neuroOpen, setNeuroOpen] = useState(false);
  const [psychoOpen, setPsychoOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const psychologicalSubmenu = [
    { name: "Depression Treatment", path: "https://manovaidya.in/depression-treatment.php" },
    { name: "Anxiety Disorder", path: "https://manovaidya.in/anxiety-disorder-treatment.php" },
    { name: "Stress Management", path: "https://manovaidya.in/stress-management-therapy.php" },
    { name: "Mood Swings", path: "https://manovaidya.in/mood-swings.php" },
    { name: "OCD", path: "https://manovaidya.in/ocd-treatment.php" },
    { name: "Addiction", path: "https://manovaidya.in/addiction.php" },
    { name: "Suicidal Thoughts", path: "https://manovaidya.in/suicidal-thoughts.php" },
    { name: "ADHD", path: "https://manovaidya.in/adhd-in-children-treatment.php" },
    { name: "Personality Disorder", path: "https://manovaidya.in/personality.php" },
    { name: "PTSD", path: "https://manovaidya.in/ptsd-treatment.php" },
    { name: "Dissociative Disorders", path: "https://manovaidya.in/dissociative.php" },
    { name: "Eating Disorders", path: "https://manovaidya.in/eating-disorde.php" },
    { name: "Bipolar Disorder", path: "https://manovaidya.in/bipolar-disorder-treatment.php" },
  ];

  const neurologicalSubmenu = [
    { name: "Autism", path: "https://manovaidya.in/autism-treatment.php" },
    { name: "Migraine", path: "https://manovaidya.in/migraine-treatment.php" },
    { name: "Sleep Disorders", path: "https://manovaidya.in/sleep-disorder-treatment.php" },
    { name: "Schizophrenia", path: "https://manovaidya.in/schizophrenia.php" },
    { name: "Stroke / Paralysis", path: "https://manovaidya.in/stroke-paralysis.php" },
    { name: "Parkinson’s", path: "https://manovaidya.in/parkinsons-disease-treatment.php" },
    { name: "Epilepsy", path: "https://manovaidya.in/epilepsy.php" },
    { name: "Multiple Sclerosis", path: "https://manovaidya.in/multiple-sclerosis.php" },
    { name: "Neuropathy", path: "https://manovaidya.in/neuropathy-neuralgia.php" },
    { name: "Dementia / Alzheimer’s", path: "https://manovaidya.in/dementia.php" },
  ];

  const psychosomaticSubmenu = [
    { name: "PCOD", path: "https://manovaidya.in/pcod.php" },
    { name: "Thyroid", path: "https://manovaidya.in/thyroid.php" },
    { name: "IBS", path: "https://manovaidya.in/ibs.php" },
    { name: "Gastro Issues", path: "https://manovaidya.in/gastrointestinal-issues.php" },
    { name: "Asthma", path: "https://manovaidya.in/asthma.php" },
    { name: "Heart Risk", path: "https://manovaidya.in/heart-risk.php" },
    { name: "Fibromyalgia", path: "https://manovaidya.in/fibromyalgia.php" },
    { name: "Blood Pressure", path: "https://manovaidya.in/blood-pressure.php" },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <Link to="/">
              <img src={logo} alt="Dr Ankush Garg" className="h-10 w-44" />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-6 text-[15px] font-semibold">
              <NavLink to="/" className="hover:text-[#8b43ba]">Home</NavLink>
              <NavLink to="/about" className="hover:text-[#8b43ba]">About</NavLink>
              <NavLink to="/blog" className="hover:text-[#8b43ba]">Blogs</NavLink>

              {[{
                title: "Psychological",
               
                data: psychologicalSubmenu
              }, {
                title: "Neurological",
            
                data: neurologicalSubmenu
              }, {
                title: "Psychosomatic",
                
                data: psychosomaticSubmenu
              }].map(menu => (
                <div key={menu.title} className="relative group">
                  <NavLink to={menu.base} className="hover:text-[#8b43ba]">{menu.title}</NavLink>
                  <div className="absolute top-full left-0 pt-3 w-[340px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
                      {menu.data.map(item => (
                        <Link key={item.name} to={item.path} className="block px-6 py-2 text-[14px] hover:bg-purple-50 hover:text-[#8b43ba]">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <NavLink to="/case-study" className="hover:text-[#8b43ba]">Case Study</NavLink>
            </nav>

            {/* DESKTOP CTA */}
            <Link to="/appointment" className="hidden md:flex items-center gap-3 bg-[#8b43ba] text-white px-6 py-3 rounded-2xl shadow-lg">
              <span className="w-8 h-8 bg-white text-[#8b43ba] rounded-full flex items-center justify-center">
                <Plus size={18} />
              </span>
              Book Consultation
            </Link>

            {/* MOBILE HEADER BUTTONS */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* + ICON */}
              <Link to="/appointment" className="w-11 h-11 bg-[#8b43ba] rounded-xl flex items-center justify-center shadow-lg">
                <span className="w-6 h-6 bg-white text-[#8b43ba] rounded-full flex items-center justify-center">
                  <Plus size={18} />
                </span>
              </Link>
              {/* MENU ICON */}
              <button onClick={() => setOpen(true)} className="p-2 border rounded-md">
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40" />}

      {/* ================= MOBILE SIDEBAR ================= */}
      <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        {/* ===== FIXED HEADER ===== */}
        <div className="sticky top-0 bg-white z-10 border-b">
          <div className="flex justify-between items-center p-5">
            <span className="font-semibold text-[#8b43ba] text-lg">Dr. Ankush Garg</span>
            <button onClick={() => setOpen(false)}><X /></button>
          </div>
        </div>

        {/* ===== SCROLLABLE MENU ===== */}
        <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto px-5 py-3 gap-2 text-[15px]">
          <NavLink to="/" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-purple-50">Home</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-purple-50">About</NavLink>
          <NavLink to="/blog" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-purple-50">Blogs</NavLink>

          {/* PSYCHOLOGICAL */}
          <button onClick={() => setPsyOpen(!psyOpen)} className="w-full flex justify-between px-4 py-2 rounded-lg hover:bg-purple-50">
            Psychological <span>{psyOpen ? "−" : "+"}</span>
          </button>
          {psyOpen && psychologicalSubmenu.map(i => (
            <Link key={i.name} to={i.path} onClick={() => setOpen(false)} className="block ml-4 px-2 py-1 hover:text-[#8b43ba]">{i.name}</Link>
          ))}

          {/* NEUROLOGICAL */}
          <button onClick={() => setNeuroOpen(!neuroOpen)} className="w-full flex justify-between px-4 py-2 rounded-lg hover:bg-purple-50">
            Neurological <span>{neuroOpen ? "−" : "+"}</span>
          </button>
          {neuroOpen && neurologicalSubmenu.map(i => (
            <Link key={i.name} to={i.path} onClick={() => setOpen(false)} className="block ml-4 px-2 py-1 hover:text-[#8b43ba]">{i.name}</Link>
          ))}

          {/* PSYCHOSOMATIC */}
          <button onClick={() => setPsychoOpen(!psychoOpen)} className="w-full flex justify-between px-4 py-2 rounded-lg hover:bg-purple-50">
            Psychosomatic <span>{psychoOpen ? "−" : "+"}</span>
          </button>
          {psychoOpen && psychosomaticSubmenu.map(i => (
            <Link key={i.name} to={i.path} onClick={() => setOpen(false)} className="block ml-4 px-2 py-1 hover:text-[#8b43ba]">{i.name}</Link>
          ))}

          <NavLink to="/case-study" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-purple-50">Case Study</NavLink>

          {/* APPOINTMENT BUTTON AT BOTTOM */}
          <div className="mt-4">
            <Link to="/appointment" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 bg-[#8b43ba] text-white py-3 rounded-xl shadow">
              <Plus size={18} /> Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

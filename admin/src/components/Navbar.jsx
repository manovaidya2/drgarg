import React, { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Navbar = ({ collapsed, onToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 border-b border-emerald-100 bg-white/90 backdrop-blur transition-all duration-300 ${
          collapsed ? "md:left-16" : "md:left-60"
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4 px-3 sm:px-4 lg:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-800 transition hover:bg-emerald-100 md:hidden"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <FaBars />
            </button>

            <button
              type="button"
              className="hidden h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 md:grid"
              onClick={onToggle}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FaBars />
            </button>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Admin Panel
              </p>
              <h2 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                Clinic Management
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-10 items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 text-emerald-900">
              <FaUserCircle className="h-5 w-5" />
              <span className="hidden text-sm font-semibold sm:inline">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <Sidebar isMobile onNavigate={() => setIsSidebarOpen(false)} />
          <button
            type="button"
            className="flex-1 bg-slate-950/45"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar backdrop"
          />
          <button
            type="button"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-700 shadow-lg"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;

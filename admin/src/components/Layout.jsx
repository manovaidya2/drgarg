import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#effcf6_48%,#f7fbff_100%)] text-slate-900">
      <div className="fixed inset-y-0 left-0 z-50 hidden md:block">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((current) => !current)}
        />
      </div>

      <Navbar
        collapsed={collapsed}
        onToggle={() => setCollapsed((current) => !current)}
      />

      <main
        className={`min-h-screen pt-16 transition-all duration-300 ${
          collapsed ? "md:ml-16" : "md:ml-60"
        }`}
      >
        <div className="mx-auto w-full max-w-none px-3 py-4 sm:px-4 lg:px-5">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

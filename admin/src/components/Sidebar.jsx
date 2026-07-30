import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaBrain,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
  FaPlusCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserEdit,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const navItems = [
  { to: "/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
  { to: "/blog-list", icon: FaBook, label: "Blogs" },
  { to: "/add-blog", icon: FaPlusCircle, label: "Add Blog" },
  { to: "/case-studies", icon: FaBrain, label: "Case Studies" },
  { to: "/add-casestudy", icon: FaPlusCircle, label: "Add Case Study" },
  { to: "/gallery", icon: FaImages, label: "Gallery" },
  { to: "/author-profile", icon: FaUserEdit, label: "Author Profile" },
  { to: "/appointments", icon: FaCalendarAlt, label: "Appointments" },
];

const Sidebar = ({ collapsed = false, onToggle, isMobile = false, onNavigate }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("rememberMe");
    navigate("/");
  };

  return (
    <aside
      className={`flex h-full flex-col border-r border-emerald-100 bg-white/95 text-slate-700 shadow-[0_20px_60px_rgba(15,118,110,0.12)] backdrop-blur transition-all duration-300 ${
        collapsed && !isMobile ? "w-16" : isMobile ? "w-64" : "w-60"
      }`}
    >
      <div className="flex h-16 items-center gap-3 border-b border-emerald-100 px-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200">
          <MdHealthAndSafety className="h-5 w-5" />
        </div>

        {(!collapsed || isMobile) && (
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-slate-900">
              Dr. Ankush Garg
            </h1>
            <p className="truncate text-xs font-medium text-emerald-700">
              Admin Workspace
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-2.5 py-4">
        {(!collapsed || isMobile) && (
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Management
          </p>
        )}

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                title={collapsed && !isMobile ? item.label : undefined}
                className={({ isActive }) =>
                  [
                    "group flex min-h-10 items-center rounded-xl px-2.5 text-sm font-semibold transition-all duration-200",
                    collapsed && !isMobile ? "justify-center" : "gap-3",
                    isActive
                      ? "bg-emerald-50 text-emerald-800 shadow-sm ring-1 ring-emerald-100"
                      : "text-slate-600 hover:bg-slate-50 hover:text-emerald-800",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                        isActive
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                          : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    {(!collapsed || isMobile) && <span className="truncate">{item.label}</span>}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-emerald-100 p-2.5">
        {!isMobile && (
          <button
            type="button"
            onClick={onToggle}
            className={`mb-2.5 flex h-10 w-full items-center rounded-xl bg-emerald-50 px-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 ${
              collapsed ? "justify-center" : "justify-between"
            }`}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <FaChevronRight className="h-4 w-4" />
            ) : (
              <>
                <span>Collapse</span>
                <FaChevronLeft className="h-4 w-4" />
              </>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className={`flex h-10 w-full items-center rounded-xl px-2.5 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600 ${
            collapsed && !isMobile ? "justify-center" : "gap-3"
          }`}
          title={collapsed && !isMobile ? "Logout" : undefined}
        >
          <FaSignOutAlt className="h-4 w-4" />
          {(!collapsed || isMobile) && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

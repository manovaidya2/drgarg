import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";

import api from '../api/axiosInstance';
import { clearCmsSession } from '../auth';

const highlights = [
  "Secure access for content and appointments",
  "Clean dashboard for daily clinic operations",
  "Built for fast updates and patient follow-ups",
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sampleAvailable, setSampleAvailable] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  useEffect(() => {
    let active = true;
    api.get('/cms-auth/options').then(({ data }) => {
      if (active) setSampleAvailable(data.demoLoginEnabled === true);
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  const finishLogin = (data) => {
    sessionStorage.setItem('cms-token', data.token);
    sessionStorage.setItem('cms-user', JSON.stringify(data.user));
    toast.success('Login successful');
    navigate(data.user.scopes.includes('clinic:admin') ? '/dashboard' : '/blog-list');
  };
  const handleSampleLogin = async () => {
    setErrors({ username: '', password: '' });
    setIsLoading(true);
    clearCmsSession();
    try { const { data } = await api.post('/cms-auth/demo-login'); finishLogin(data); }
    catch (error) {
      const message = error.response?.data?.message || 'Sample login is unavailable.';
      setErrors({ username: message, password: '' });
      toast.error(message);
    } finally { setIsLoading(false); }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    clearCmsSession();
    try {
      const { data } = await api.post('/cms-auth/login', { username: username.trim(), password });
      finishLogin(data);
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to sign in.';
      setErrors({ username: message, password: '' });
      toast.error(message);
    } finally { setIsLoading(false); }
  };

  const clearFieldError = (field) => {
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4fbf8] text-slate-900">
      <div className="relative isolate flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.20),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.18),transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-52 bg-gradient-to-b from-emerald-100/80 to-transparent" />

        <section className="grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_30px_90px_rgba(15,118,110,0.18)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden min-h-[650px] overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 p-10 text-white lg:block">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0,transparent_32%,rgba(16,185,129,0.18)_100%)]" />
            <div className="absolute -right-28 top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full border border-emerald-300/20" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-emerald-700 shadow-lg">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Dr. Ankush Garg</p>
                    <p className="text-xs font-medium text-emerald-100">Admin Workspace</p>
                  </div>
                </div>

                <div className="mt-16 max-w-lg">
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100 ring-1 ring-emerald-300/20">
                    <ShieldCheck className="h-4 w-4" />
                    Protected clinic management
                  </p>
                  <h1 className="text-5xl font-bold leading-tight tracking-normal">
                    Manage your digital clinic with clarity.
                  </h1>
                  <p className="mt-5 text-base leading-7 text-emerald-50/80">
                    Sign in to update blogs, case studies, appointments, gallery content, and daily admin work from one focused place.
                  </p>
                </div>
              </div>

              <div className="relative rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Workspace Status</p>
                    <p className="text-xs text-emerald-100/80">Ready for secure access</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-300/15 text-emerald-100">
                    <Activity className="h-5 w-5" />
                  </span>
                </div>

                <div className="space-y-3">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-200" />
                      <span className="text-sm font-medium text-emerald-50">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-h-[650px] items-center justify-center px-5 py-8 sm:px-10 lg:px-14">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <div className="mb-5 inline-flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 ring-1 ring-emerald-100">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-100">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Dr. Ankush Garg</p>
                    <p className="text-xs font-semibold text-emerald-700">Admin Workspace</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 ring-1 ring-emerald-100">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Admin Login
                </p>
                <h2 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
                  Welcome back
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Enter your credentials to continue to the management dashboard.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor="username" className="mb-2 block text-sm font-semibold text-slate-700">
                    Username or email
                  </label>
                  <div
                    className={`group flex h-13 items-center rounded-2xl border bg-white px-4 shadow-sm transition-all ${
                      errors.username
                        ? "border-red-300 ring-4 ring-red-50"
                        : "border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50"
                    }`}
                  >
                    <User className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-focus-within:text-emerald-600" />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        clearFieldError("username");
                      }}
                      className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                      placeholder="Enter username or email"
                      autoFocus
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-2 text-sm font-medium text-red-600">{errors.username}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div
                    className={`group flex h-13 items-center rounded-2xl border bg-white px-4 shadow-sm transition-all ${
                      errors.password
                        ? "border-red-300 ring-4 ring-red-50"
                        : "border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50"
                    }`}
                  >
                    <Lock className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-focus-within:text-emerald-600" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearFieldError("password");
                      }}
                      className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-emerald-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm font-medium text-red-600">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-13 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 text-sm font-bold text-white shadow-xl shadow-emerald-100 transition hover:-translate-y-0.5 hover:from-emerald-700 hover:to-teal-700 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Signing in
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                {sampleAvailable && <button id="sample-admin-login" type="button" disabled={isLoading} onClick={handleSampleLogin} className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-60"><ShieldCheck className="h-4 w-4" />Sample Admin Login</button>}
              </form>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;

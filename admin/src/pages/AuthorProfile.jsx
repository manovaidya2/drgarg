import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const defaultProfile = {
  name: "Dr. Ankush Garg",
  title: "Ayurvedacharya",
  credentials: "BAMS, MPH, PhD Research · Ayurvedacharya",
  biography:
    "Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and developer of the Neuro-Ayurveda Development System. He has 7+ years of focused experience in child development and mental wellness. His ongoing PhD research explores the relationship between the gut–brain axis, behaviour and emotional wellbeing.",
  profileUrl: "https://drankushgarg.in/about",
  image: "https://drankushgarg.in/images/dr-ankush-garg.webp",
  email: "contact@drankushgarg.in",
  phone: "",
};

export default function AuthorProfile() {
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/author-profile");
        setProfile({ ...defaultProfile, ...res.data });
      } catch (error) {
        setMessage("Could not load author profile. Default text is shown.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateField = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await axiosInstance.put("/author-profile", profile);
      setProfile({ ...defaultProfile, ...res.data });
      setMessage("Author profile updated. Published blog pages now use this biography.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not update author profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-600">Loading author profile...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Shared CMS Record
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Blog Author Profile
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          This single profile is used by every published blog article. Do not add
          separate author biographies inside individual blog posts.
        </p>
      </div>

      {message && (
        <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Name</span>
            <input
              value={profile.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Title</span>
            <input
              value={profile.title}
              onChange={(event) => updateField("title", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Credentials</span>
            <input
              value={profile.credentials}
              onChange={(event) => updateField("credentials", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Profile URL</span>
            <input
              value={profile.profileUrl}
              onChange={(event) => updateField("profileUrl", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Image URL</span>
            <input
              value={profile.image}
              onChange={(event) => updateField("image", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Email</span>
            <input
              value={profile.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700">Shared Author Biography</span>
          <textarea
            value={profile.biography}
            onChange={(event) => updateField("biography", event.target.value)}
            rows={7}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-emerald-500"
            required
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Shared Author Profile"}
        </button>
      </form>
    </div>
  );
}

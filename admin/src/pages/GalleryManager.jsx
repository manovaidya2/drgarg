import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaImages,
  FaMagic,
  FaPlus,
  FaSearch,
  FaTimes,
  FaTrash,
  FaUpload,
} from "react-icons/fa";

const initialForm = {
  title: "",
  description: "",
  category: "",
  altText: "",
  sortOrder: 0,
  isActive: true,
};

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [altTouched, setAltTouched] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const term = search.toLowerCase();
    return items.filter((item) =>
      [item.title, item.category, item.description, item.altText]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [items, search]);

  const visibleCount = useMemo(
    () => items.filter((item) => item.isActive !== false).length,
    [items]
  );

  const hiddenCount = items.length - visibleCount;

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const generateAltText = (title = form.title, category = form.category) => {
    const cleanTitle = title.trim();
    const cleanCategory = category.trim();

    if (cleanTitle && cleanCategory) {
      return `${cleanTitle} - ${cleanCategory} gallery image`;
    }

    if (cleanTitle) return `${cleanTitle} gallery image`;
    if (cleanCategory) return `${cleanCategory} gallery image`;
    return "";
  };

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/gallery?admin=true");
      setItems(res.data || []);
    } catch (error) {
      alert("Gallery fetch failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setAltTouched(false);
    setImageFile(null);
    setPreview("");
    setEditingItem(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "altText") setAltTouched(true);

    setForm((prev) => {
      const next = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if ((name === "title" || name === "category") && !altTouched) {
        next.altText = generateAltText(
          name === "title" ? value : prev.title,
          name === "category" ? value : prev.category
        );
      }

      return next;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setImageFile(file);
    setPreview(URL.createObjectURL(file));

    if (!form.title) {
      const fileTitle = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());

      setForm((prev) => ({
        ...prev,
        title: fileTitle,
        altText: altTouched ? prev.altText : generateAltText(fileTitle, prev.category),
      }));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "",
      altText: item.altText || "",
      sortOrder: item.sortOrder || 0,
      isActive: item.isActive !== false,
    });
    setAltTouched(Boolean(item.altText));
    setImageFile(null);
    setPreview(item.image || "");
    setIsModalOpen(true);
  };

  const handleAutoAlt = () => {
    setForm((prev) => ({
      ...prev,
      altText: generateAltText(prev.title, prev.category),
    }));
    setAltTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter title");
      return;
    }

    if (!editingItem && !imageFile) {
      alert("Please select image");
      return;
    }

    const normalizedForm = {
      ...form,
      altText: form.altText.trim() || generateAltText(form.title, form.category),
    };

    const payload = new FormData();
    Object.entries(normalizedForm).forEach(([key, value]) => payload.append(key, value));
    if (imageFile) payload.append("image", imageFile);

    try {
      setSaving(true);
      if (editingItem) {
        await axiosInstance.put(`/gallery/${editingItem._id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/gallery", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchGallery();
      closeModal();
      alert(editingItem ? "Gallery item updated" : "Gallery item added");
    } catch (error) {
      alert(error.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    try {
      await axiosInstance.delete(`/gallery/${item._id}`);
      setItems((prev) => prev.filter((galleryItem) => galleryItem._id !== item._id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <section className="min-h-screen w-full max-w-full overflow-hidden bg-[#f6f7fb]">
      <div className="mb-6 overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl">
        <div className="relative p-5 md:p-6">
          <div className="absolute right-[-80px] top-[-80px] h-56 w-56 rounded-full bg-purple-500/30 blur-3xl" />
          <div className="absolute bottom-[-90px] left-[40%] h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Admin Gallery</p>
              <h1 className="mt-2 text-3xl font-black md:text-4xl">Gallery Management</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Manage all gallery images from one table. Click Add Gallery to upload a new image.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-white/10 px-3 py-3 backdrop-blur">
                  <p className="text-xs text-slate-300">Total</p>
                  <p className="text-2xl font-black">{items.length}</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-3 backdrop-blur">
                  <p className="text-xs text-slate-300">Visible</p>
                  <p className="text-2xl font-black">{visibleCount}</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-3 backdrop-blur">
                  <p className="text-xs text-slate-300">Hidden</p>
                  <p className="text-2xl font-black">{hiddenCount}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={openAddModal}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white px-5 py-4 font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-50"
              >
                <FaPlus />
                Add Gallery
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 border-b border-slate-100 bg-white p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-black text-slate-900">
              <FaImages className="text-purple-600" /> Gallery Table View
            </h2>
            <p className="text-sm text-slate-500">
              Image preview, alt tag, status and actions in one table.
            </p>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 md:w-72"
              placeholder="Search title, category, alt tag..."
            />
          </div>
        </div>

        {loading ? (
          <div className="flex h-80 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px]">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="p-4">Preview</th>
                  <th className="p-4">Image Details</th>
                  <th className="p-4">Alt Tag</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Order</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item._id} className="border-t border-slate-100 align-middle hover:bg-slate-50">
                    <td className="p-4">
                      <div className="grid h-24 w-32 place-items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                        <img
                          src={item.image}
                          alt={item.altText || item.title}
                          className="max-h-full max-w-full rounded-lg object-contain"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="max-w-xs truncate text-sm text-slate-500">
                        {item.description || "No description added"}
                      </p>
                      <a
                        href={item.image}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex text-xs font-bold text-purple-600 hover:text-purple-700"
                      >
                        View image
                      </a>
                    </td>
                    <td className="p-4">
                      <p className="max-w-[260px] rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                        {item.altText || "Alt tag missing"}
                      </p>
                    </td>
                    <td className="p-4 text-slate-600">{item.category || "General"}</td>
                    <td className="p-4 text-slate-600">{item.sortOrder || 0}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                          item.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.isActive ? <FaEye /> : <FaEyeSlash />}
                        {item.isActive ? "Visible" : "Hidden"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded-lg bg-indigo-100 p-2 text-indigo-600 hover:bg-indigo-200"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-12 text-center text-slate-500">
                      No gallery images found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {editingItem ? "Edit Gallery" : "Add Gallery"}
                </h2>
                <p className="text-sm text-slate-500">
                  Upload image and details. Alt tag is auto generated.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl bg-slate-100 p-3 text-slate-700 hover:bg-slate-200"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 p-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center transition hover:border-purple-300 hover:bg-purple-50/40">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {preview ? (
                    <img
                      src={preview}
                      alt="Gallery preview"
                      className="mx-auto max-h-72 w-full rounded-xl object-contain"
                    />
                  ) : (
                    <div className="py-10">
                      <FaUpload className="mx-auto text-3xl text-purple-500" />
                      <p className="mt-3 font-bold text-slate-800">Upload gallery image</p>
                      <p className="mt-1 text-sm text-slate-500">PNG, JPG, WEBP supported</p>
                    </div>
                  )}
                </label>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  placeholder="Gallery image title"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  placeholder="Clinic, Events, Media..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  placeholder="Short detail for this image"
                />
              </div>

              <div className="md:col-span-2">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <label className="block text-sm font-semibold text-slate-700">Alt Tag</label>
                  <button
                    type="button"
                    onClick={handleAutoAlt}
                    className="inline-flex items-center gap-1 rounded-lg bg-purple-50 px-2 py-1 text-xs font-bold text-purple-700 hover:bg-purple-100"
                  >
                    <FaMagic /> Auto generate
                  </button>
                </div>
                <textarea
                  name="altText"
                  value={form.altText}
                  onChange={handleChange}
                  rows="2"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  placeholder="Auto generated SEO image alt tag"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Sort Order</label>
                <input
                  type="number"
                  name="sortOrder"
                  value={form.sortOrder}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              <label className="mt-7 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />
                Visible on website
              </label>

              <div className="flex gap-3 border-t border-slate-100 pt-5 md:col-span-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaPlus />
                  {saving ? "Saving..." : editingItem ? "Update Gallery" : "Add Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

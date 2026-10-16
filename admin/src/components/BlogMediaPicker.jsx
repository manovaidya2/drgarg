import React, { useEffect, useState } from "react";
import { Upload, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/axiosInstance";

export default function BlogMediaPicker({ onSelect, onClose }) {
  const [media, setMedia] = useState([]),
    [query, setQuery] = useState(""),
    [page, setPage] = useState(1);
  const [alt, setAlt] = useState(""),
    [caption, setCaption] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [total, setTotal] = useState(0);
  const load = async () => {
    try {
      const { data } = await api.get("/media", { params: { query, page } });
      setMedia(data.media);
      setTotal(data.total);
    } catch (err) {
      setError(err.response?.data?.message || "Media could not be loaded.");
    }
  };
  useEffect(() => {
    const timer = setTimeout(load, 200);
    return () => clearTimeout(timer);
  }, [query, page]);
  const upload = async (event) => {
    if (!event.target.files[0]) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("image", event.target.files[0]);
      body.append("alt", alt);
      body.append("caption", caption);
      const { data } = await api.post("/media", body, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });
      onSelect(data.media);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-3"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-heading"
    >
      <section className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white p-5">
        <header className="mb-4 flex items-center justify-between">
          <h2 id="media-heading" className="text-lg font-semibold">
            Blog Media
          </h2>
          <button
            id="close-media"
            type="button"
            onClick={onClose}
            aria-label="Close media"
            title="Close"
          >
            <X size={18} />
          </button>
        </header>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            Alt text
            <input
              id="media-alt"
              className="cms-input"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
            />
          </label>
          <label>
            Caption
            <input
              id="media-caption"
              className="cms-input"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </label>
        </div>
        <label className="my-4 flex items-center gap-2">
          <Upload size={18} />
          <input
            id="blog-media-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            disabled={busy}
            onChange={upload}
          />
        </label>
        {busy && <p role="status">Uploading...</p>}
        {error && (
          <p className="text-red-700" role="alert">
            {error}
          </p>
        )}
        <label className="mb-4 flex items-center gap-2">
          <Search size={18} />
          <input
            id="media-search"
            aria-label="Search media"
            className="cms-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {media.map((item) => (
            <button
              data-testid={`media-select-${item._id}`}
              type="button"
              key={item._id}
              onClick={() =>
                onSelect({
                  ...item,
                  alt: alt || item.alt,
                  caption: caption || item.caption,
                })
              }
              className="overflow-hidden rounded-lg border text-left"
            >
              <img
                src={item.url}
                alt={item.alt}
                className="aspect-[4/3] w-full object-contain"
              />
              <span className="block break-words p-2 text-xs">
                {item.originalFilename} ({item.width} x {item.height})
              </span>
            </button>
          ))}
        </div>
        <footer className="mt-4 flex items-center justify-between">
          <button
            id="media-previous"
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            title="Previous page"
          >
            <ChevronLeft />
          </button>
          <span>Page {page}</span>
          <button
            id="media-next"
            type="button"
            disabled={page * 30 >= total}
            onClick={() => setPage(page + 1)}
            title="Next page"
          >
            <ChevronRight />
          </button>
        </footer>
      </section>
    </div>
  );
}

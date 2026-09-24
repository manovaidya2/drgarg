// src/pages/BlogList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

let blogListCache = null;
const isDraftBlog = (blog) =>
  blog.published === false || String(blog.status).toLowerCase() === "draft";

const BlogList = () => {
  const [blogs, setBlogs] = useState(blogListCache || []);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(!blogListCache);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    blogId: null,
    blogTitle: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    fetchBlogs(controller.signal);
    return () => controller.abort();
  }, []);

  const fetchBlogs = async (signal) => {
    try {
      setError("");
      const res = await axiosInstance.get(
        "/blogs?admin=true&limit=50&page=1",
        { signal }
      );
      const nextBlogs = Array.isArray(res.data) ? res.data : res.data.blogs || [];
      blogListCache = nextBlogs;
      setBlogs(nextBlogs);
    } catch (err) {
      if (err.code === "ERR_CANCELED") return;
      console.error("Failed to fetch blogs", err);
      setError("Blogs could not be loaded. Please try again.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  };

  const handleDeleteClick = (blog) => {
    setDeleteModal({
      isOpen: true,
      blogId: blog._id,
      blogTitle: blog.title,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`/blogs/${deleteModal.blogId}`);
      const nextBlogs = blogs.filter((b) => b._id !== deleteModal.blogId);
      blogListCache = nextBlogs;
      setBlogs(nextBlogs);
      setDeleteModal({ isOpen: false, blogId: null, blogTitle: "" });
      toast.success("Blog deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-xl shadow mb-5 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-sm opacity-80">
            Manage and publish your blogs
          </p>
        </div>

        <Link
          to="/add-blog"
          className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
        >
          <PlusIcon className="h-5 w-5" />
          New Blog
        </Link>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <DocumentTextIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Blogs</p>
            <h2 className="text-2xl font-bold">{blogs.length}</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <DocumentTextIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Published</p>
            <h2 className="text-2xl font-bold">
              {blogs.filter((blog) => !isDraftBlog(blog)).length}
            </h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-lg">
            <DocumentTextIcon className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Drafts</p>
            <h2 className="text-2xl font-bold">
              {blogs.filter(isDraftBlog).length}
            </h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <DocumentTextIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Categories</p>
            <h2 className="text-2xl font-bold">
              {[...new Set(blogs.map((b) => b.category))].length}
            </h2>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow mb-5 flex items-center gap-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BLOG TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="p-4">Blog</th>
              <th className="p-4">Category</th>
              <th className="p-4">Date</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading && blogs.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  Loading blogs...
                </td>
              </tr>
            )}

            {!loading && error && blogs.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-red-600">
                  {error}
                </td>
              </tr>
            )}

            {filteredBlogs.map((blog) => (
              <tr
                key={blog._id}
                className="border-t hover:bg-indigo-50 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}

                  <div>
                    <p className="font-semibold">{blog.title}</p>
                    <p className="text-xs text-gray-500">{blog.slug}</p>
                  </div>
                </td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    {blog.category || "General"}
                  </span>
                </td>

                <td className="p-4 text-gray-600">
                  {formatDate(blog.date)}
                </td>

                <td className="p-4 text-sm text-gray-600 max-w-xs truncate">
                  {blog.shortDescription}
                </td>

                <td className="p-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isDraftBlog(blog)
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {isDraftBlog(blog) ? "Draft" : "Published"}
                  </span>
                </td>

                <td className="p-4 flex gap-3">
                  <Link
                    to={`/blogs/edit/${blog._id}`}
                    className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200"
                  >
                    <PencilIcon className="h-4 w-4 text-indigo-600" />
                  </Link>

                  <button
                    onClick={() => handleDeleteClick(blog)}
                    className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                  >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}

            {!loading && !error && filteredBlogs.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-8 text-gray-500">
                  No blogs found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center">

            <h2 className="text-xl font-bold mb-2">
              Delete Blog
            </h2>

            <p className="text-gray-500 mb-6">
              Delete "{deleteModal.blogTitle}" ?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() =>
                  setDeleteModal({ isOpen: false })
                }
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default BlogList;

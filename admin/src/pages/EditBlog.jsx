// src/pages/EditBlog.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import slugify from 'slugify';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    date: '',
    image: '',
    shortDescription: '',
    content: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/blogs/${id}`);
      const blog = response.data;
      
      // Format date for input
      if (blog.date) {
        blog.date = new Date(blog.date).toISOString().split('T')[0];
      }
      
      setFormData(blog);
      
      // Set editor content after blog is loaded
      setTimeout(() => {
        if (editorRef.current && blog.content) {
          editorRef.current.innerHTML = blog.content;
        }
      }, 100);
      
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch blog');
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-generate slug from title
      ...(name === 'title' && { slug: slugify(value, { lower: true, strict: true }) })
    }));
  };

  // Rich text editor formatting
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  // Editor image upload (insert into content)
  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      formatText('insertImage', base64);
    };
    reader.readAsDataURL(file);
  };

  // Main blog image upload with preview
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target.result });
    };
    reader.readAsDataURL(file);
  };

  // Submit updated blog to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const htmlContent = editorRef.current.innerHTML;
    const blogData = { ...formData, content: htmlContent };

    try {
      const response = await axiosInstance.put(`/blogs/${id}`, blogData);
      if (response.data.success) {
        alert('Blog updated successfully!');
        navigate('/blogs');
      } else {
        alert(response.data.message || 'Failed to update blog');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update blog');
      console.error('Error updating blog:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border shadow">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Blog</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Text Inputs */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
            required
            readOnly
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Short Description */}
          <textarea
            name="shortDescription"
            placeholder="Short Description"
            rows="3"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Main Blog Image Upload */}
          <div>
            <label className="block mb-2 font-medium">Blog Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageUpload}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-48 h-auto rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          {/* Editor Toolbar */}
          <div className="flex flex-wrap gap-2 border rounded-xl p-3 bg-gray-50">
            {/* Formatting */}
            <button type="button" onClick={() => formatText("bold")} className="editor-btn">Bold</button>
            <button type="button" onClick={() => formatText("italic")} className="editor-btn">Italic</button>
            <button type="button" onClick={() => formatText("underline")} className="editor-btn">Underline</button>
            <button type="button" onClick={() => formatText("strikeThrough")} className="editor-btn">Strike</button>

            {/* Alignment */}
            <button type="button" onClick={() => formatText("justifyLeft")} className="editor-btn">Left</button>
            <button type="button" onClick={() => formatText("justifyCenter")} className="editor-btn">Center</button>
            <button type="button" onClick={() => formatText("justifyRight")} className="editor-btn">Right</button>
            <button type="button" onClick={() => formatText("justifyFull")} className="editor-btn">Justify</button>

            {/* Lists */}
            <button type="button" onClick={() => formatText("insertUnorderedList")} className="editor-btn">• Bullet List</button>
            <button type="button" onClick={() => formatText("insertOrderedList")} className="editor-btn">1. Numbered List</button>

            {/* Font & Heading */}
            <select onChange={(e) => formatText("fontSize", e.target.value)} className="editor-select">
              <option value="">Font Size</option>
              <option value="2">Small</option>
              <option value="3">Normal</option>
              <option value="5">Large</option>
              <option value="6">X-Large</option>
            </select>

            <select onChange={(e) => formatText("formatBlock", e.target.value)} className="editor-select">
              <option value="">Heading</option>
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
              <option value="p">Paragraph</option>
            </select>

            {/* Colors */}
            <input type="color" title="Text Color" onChange={(e) => formatText("foreColor", e.target.value)} className="w-10 h-8 rounded border"/>
            <input type="color" title="Highlight" onChange={(e) => formatText("hiliteColor", e.target.value)} className="w-10 h-8 rounded border"/>

            {/* Links */}
            <button type="button" onClick={() => { const url = prompt("Enter link URL"); if(url) formatText("createLink", url); }} className="editor-btn">Insert Link</button>

            {/* Editor Image Upload */}
            <button type="button" onClick={() => editorFileRef.current.click()} className="editor-btn">Upload Image</button>
            <input
              type="file"
              accept="image/*"
              ref={editorFileRef}
              onChange={handleEditorImageUpload}
              className="hidden"
            />

            {/* Undo/Redo/Clear */}
            <button type="button" onClick={() => formatText("removeFormat")} className="editor-btn">Clear</button>
            <button type="button" onClick={() => formatText("undo")} className="editor-btn">Undo</button>
            <button type="button" onClick={() => formatText("redo")} className="editor-btn">Redo</button>
          </div>

          {/* Rich Text Editor */}
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[300px] border border-gray-300 rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 overflow-auto"
            suppressContentEditableWarning={true}
            style={{ whiteSpace: "pre-wrap" }}
          ></div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/blogs')}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Updating...' : 'Update Blog'}
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          .editor-btn {
            padding: 6px 10px;
            font-weight: 600;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s;
          }
          .editor-btn:hover { 
            background: #ecfdf5;
            border-color: #10b981;
          }
          .editor-select {
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            border: 1px solid #d1d5db;
            cursor: pointer;
            background: white;
            font-size: 0.875rem;
          }
          .editor-select:hover {
            border-color: #10b981;
          }
          div[contenteditable="true"] ul { 
            list-style-type: disc; 
            padding-left: 1.5rem; 
            margin: 0.5rem 0;
          }
          div[contenteditable="true"] ol { 
            list-style-type: decimal; 
            padding-left: 1.5rem;
            margin: 0.5rem 0;
          }
          div[contenteditable="true"] h1 {
            font-size: 2rem;
            font-weight: bold;
            margin: 1rem 0;
          }
          div[contenteditable="true"] h2 {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0.875rem 0;
          }
          div[contenteditable="true"] h3 {
            font-size: 1.25rem;
            font-weight: bold;
            margin: 0.75rem 0;
          }
          div[contenteditable="true"] p {
            margin: 0.5rem 0;
          }
          div[contenteditable="true"] img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1rem 0;
          }
          div[contenteditable="true"] a {
            color: #2563eb;
            text-decoration: underline;
          }
        `}
      </style>
    </section>
  );
};

export default EditBlog;
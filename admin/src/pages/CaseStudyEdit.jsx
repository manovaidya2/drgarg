import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

export default function AdminEditCaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    image: "",
    content: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  /* 🔹 Fetch case study data */
  useEffect(() => {
    fetchCaseStudy();
  }, [id]);

  /* 🔹 Auto slug generate from title */
  useEffect(() => {
    if (formData.title && !unsavedChanges) {
      setFormData((prev) => ({
        ...prev,
        slug:
          prev.slug ||
          prev.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
      }));
    }
  }, [formData.title]);

  /* 🔹 Fetch single case study */
  const fetchCaseStudy = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/case-studies');
      const caseStudy = response.data.find(cs => cs._id === id);
      
      if (!caseStudy) {
        toast.error('Case study not found');
        navigate('/admin/case-studies');
        return;
      }

      setFormData({
        title: caseStudy.title || "",
        slug: caseStudy.slug || "",
        shortDescription: caseStudy.shortDescription || "",
        image: caseStudy.image || "",
        content: caseStudy.content || "",
      });

      // Set editor content after data is loaded
      setTimeout(() => {
        if (editorRef.current && caseStudy.content) {
          editorRef.current.innerHTML = caseStudy.content;
        }
      }, 100);
      
    } catch (error) {
      toast.error('Failed to fetch case study');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Input change */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setUnsavedChanges(true);
  };

  /* 🔹 Editor command */
  const formatText = (command, value = null) => {
    editorRef.current.focus();
    document.execCommand(command, false, value);
    setUnsavedChanges(true);
  };

  /* 🔹 Insert link */
  const insertLink = () => {
    const url = prompt("Enter link URL");
    if (url) {
      formatText("createLink", url);
      setUnsavedChanges(true);
    }
  };

  /* 🔹 Upload image inside editor */
  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      formatText("insertImage", event.target.result);
      setUnsavedChanges(true);
    };
    reader.readAsDataURL(file);
  };

  /* 🔹 Featured image upload */
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target.result });
      setUnsavedChanges(true);
    };
    reader.readAsDataURL(file);
  };

  /* 🔹 Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      content: editorRef.current.innerHTML,
    };

    setSaving(true);
    
    try {
      await axiosInstance.put(`/case-studies/${id}`, payload);
      toast.success("✅ Case Study Updated Successfully");
      setUnsavedChanges(false);
      
      // Optional: Redirect after save
      setTimeout(() => navigate('/admin/case-studies'), 1500);
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "❌ Failed to update case study");
    } finally {
      setSaving(false);
    }
  };

  /* 🔹 Handle cancel */
  const handleCancel = () => {
    if (unsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/admin/case-studies');
      }
    } else {
      navigate('/admin/case-studies');
    }
  };

  /* 🔹 Handle delete */
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this case study? This action cannot be undone.')) {
      try {
        await axiosInstance.delete(`/case-studies/${id}`);
        toast.success('Case study deleted successfully');
        navigate('/admin/case-studies');
      } catch (error) {
        toast.error('Failed to delete case study');
        console.error('Delete error:', error);
      }
    }
  };

  if (loading) {
    return (
      <section className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading case study...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Header with actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-white rounded-xl transition-all"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              Edit Case Study
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-all"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Unsaved Changes Warning */}
        {unsavedChanges && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-700 flex items-center gap-2">
              <span>⚠️</span>
              You have unsaved changes. Don't forget to save your work!
            </p>
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 shadow border">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Case Study Title"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="url-friendly-slug"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                URL: /case-studies/{formData.slug}
              </p>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief description of the case study"
                rows="3"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="space-y-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleMainImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {formData.image && (
                  <div className="relative group">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full max-w-md h-48 object-cover rounded-xl shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, image: "" });
                        setUnsavedChanges(true);
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 🔹 EDITOR TOOLBAR */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 border rounded-xl p-3 bg-gray-50 mb-3">

                <button type="button" onClick={() => formatText("bold")} className="editor-btn">Bold</button>
                <button type="button" onClick={() => formatText("italic")} className="editor-btn">Italic</button>
                <button type="button" onClick={() => formatText("underline")} className="editor-btn">Underline</button>
                <button type="button" onClick={() => formatText("strikeThrough")} className="editor-btn">Strike</button>

                <button type="button" onClick={() => formatText("justifyLeft")} className="editor-btn">Left</button>
                <button type="button" onClick={() => formatText("justifyCenter")} className="editor-btn">Center</button>
                <button type="button" onClick={() => formatText("justifyRight")} className="editor-btn">Right</button>
                <button type="button" onClick={() => formatText("justifyFull")} className="editor-btn">Justify</button>

                <button type="button" onClick={() => formatText("insertUnorderedList")} className="editor-btn">• Bullet</button>
                <button type="button" onClick={() => formatText("insertOrderedList")} className="editor-btn">1. Number</button>

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

                {/* 🎨 Colors */}
                <input
                  type="color"
                  title="Text Color"
                  onChange={(e) => formatText("foreColor", e.target.value)}
                  className="w-10 h-8 border rounded cursor-pointer"
                />

                <input
                  type="color"
                  title="Highlight"
                  onChange={(e) => formatText("hiliteColor", e.target.value)}
                  className="w-10 h-8 border rounded cursor-pointer"
                />

                <button type="button" onClick={insertLink} className="editor-btn">Insert Link</button>

                <button
                  type="button"
                  onClick={() => editorFileRef.current.click()}
                  className="editor-btn"
                >
                  Upload Image
                </button>

                <button type="button" onClick={() => formatText("removeFormat")} className="editor-btn">Clear</button>
                <button type="button" onClick={() => formatText("undo")} className="editor-btn">Undo</button>
                <button type="button" onClick={() => formatText("redo")} className="editor-btn">Redo</button>

                <input
                  type="file"
                  accept="image/*"
                  ref={editorFileRef}
                  onChange={handleEditorImageUpload}
                  className="hidden"
                />
              </div>

              {/* 🔹 EDITOR */}
              <div
                ref={editorRef}
                contentEditable
                className="min-h-[300px] border rounded-xl p-4 focus:outline-none overflow-y-auto"
                suppressContentEditableWarning
                onInput={() => setUnsavedChanges(true)}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !unsavedChanges}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Saving...
                  </>
                ) : (
                  'Update Case Study'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Editor styles */}
      <style>
        {`
          .editor-btn {
            padding: 6px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
            transition: all 0.2s;
          }
          .editor-btn:hover {
            background: #ede9fe;
            border-color: #8b5cf6;
          }
          .editor-select {
            padding: 6px 8px;
            border-radius: 6px;
            border: 1px solid #d1d5db;
            background: white;
            cursor: pointer;
            font-size: 14px;
          }
          .editor-select:hover {
            border-color: #8b5cf6;
          }
          div[contenteditable="true"] {
            min-height: 300px;
            max-height: 500px;
            overflow-y: auto;
          }
          div[contenteditable="true"]:focus {
            border-color: #8b5cf6;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
          }
          div[contenteditable="true"] ul {
            list-style-type: disc;
            padding-left: 1.5rem;
          }
          div[contenteditable="true"] ol {
            list-style-type: decimal;
            padding-left: 1.5rem;
          }
          div[contenteditable="true"] img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 10px 0;
          }
          div[contenteditable="true"] h1 {
            font-size: 2em;
            font-weight: bold;
          }
          div[contenteditable="true"] h2 {
            font-size: 1.5em;
            font-weight: bold;
          }
          div[contenteditable="true"] h3 {
            font-size: 1.17em;
            font-weight: bold;
          }
        `}
      </style>
    </section>
  );
}
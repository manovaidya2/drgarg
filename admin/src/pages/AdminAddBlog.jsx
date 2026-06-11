import React, { useRef, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function AdminAddBlog() {
  const editorRef = useRef(null);
  const editorFileRef = useRef(null);
  const resizeRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    image: "",
    shortDescription: "",
    content: "",
    faq: [{ question: "", answer: "" }],
    // SEO Fields
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    canonicalUrl: "",
    publishedDate: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    noIndex: false,
    noFollow: false
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showSEOSection, setShowSEOSection] = useState(false);
  const [showAdvancedSEO, setShowAdvancedSEO] = useState(false);

  // Image resize states
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartY, setResizeStartY] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const [resizeStartHeight, setResizeStartHeight] = useState(0);
  const [resizeDirection, setResizeDirection] = useState('');

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Auto-generate meta title
  const generateMetaTitle = () => {
    const metaTitle = formData.metaTitle || formData.title;
    if (!formData.metaTitle && formData.title) {
      setFormData(prev => ({
        ...prev,
        metaTitle: prev.title
      }));
    }
  };

  // Auto-generate meta description from short description
  const generateMetaDescription = () => {
    if (!formData.metaDescription && formData.shortDescription) {
      const truncated = formData.shortDescription.length > 160 
        ? formData.shortDescription.substring(0, 157) + '...' 
        : formData.shortDescription;
      setFormData(prev => ({
        ...prev,
        metaDescription: truncated
      }));
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug when title changes
    if (name === 'title' && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }

    // Auto-generate meta title when title changes and no custom meta title
    if (name === 'title' && !formData.metaTitle) {
      setFormData(prev => ({
        ...prev,
        metaTitle: value
      }));
    }

    // Auto-generate meta description when short description changes
    if (name === 'shortDescription') {
      generateMetaDescription();
    }
  };

  // Handle SEO auto-generation
  const handleAutoGenerateSEO = () => {
    setFormData(prev => ({
      ...prev,
      metaTitle: prev.title,
      metaDescription: prev.shortDescription?.length > 160 
        ? prev.shortDescription.substring(0, 157) + '...' 
        : prev.shortDescription,
      canonicalUrl: `https://drankushgarg.in/blog/${prev.slug}`,
      ogTitle: prev.title,
      ogDescription: prev.shortDescription,
      ogImage: prev.image,
      twitterTitle: prev.title,
      twitterDescription: prev.shortDescription,
      twitterImage: prev.image
    }));
  };

  // SEO Validation
  const validateSEO = () => {
    const errors = [];
    
    if (formData.metaTitle && formData.metaTitle.length > 60) {
      errors.push("Meta title should be less than 60 characters (currently: " + formData.metaTitle.length + ")");
    }
    
    if (formData.metaDescription && formData.metaDescription.length > 160) {
      errors.push("Meta description should be less than 160 characters (currently: " + formData.metaDescription.length + ")");
    }
    
    if (!formData.metaTitle && formData.title) {
      errors.push("Meta title is recommended for better SEO");
    }
    
    if (!formData.metaDescription && formData.shortDescription) {
      errors.push("Meta description is recommended for better SEO");
    }
    
    return errors;
  };

  // FAQ handlers
  const handleFaqChange = (index, field, value) => {
    const updatedFaq = [...formData.faq];
    updatedFaq[index][field] = value;
    setFormData({ ...formData, faq: updatedFaq });
  };

  const addFaq = () => {
    setFormData({
      ...formData,
      faq: [...formData.faq, { question: "", answer: "" }],
    });
  };

  const removeFaq = (index) => {
    const updatedFaq = formData.faq.filter((_, i) => i !== index);
    setFormData({ ...formData, faq: updatedFaq });
  };

  useEffect(() => {
    // Add global mouse events for resizing
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing]);

  // Rich text editor formatting
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  // Handle image click in editor
  const handleImageClick = (e) => {
    const target = e.target;
    
    if (target.tagName === 'IMG') {
      e.preventDefault();
      e.stopPropagation();
      
      if (selectedImage) {
        selectedImage.classList.remove('selected-image');
        removeResizeHandles();
      }
      
      target.classList.add('selected-image');
      setSelectedImage(target);
      
      setTimeout(() => {
        addResizeHandles(target);
      }, 10);
    } else {
      if (selectedImage) {
        selectedImage.classList.remove('selected-image');
        removeResizeHandles();
        setSelectedImage(null);
      }
    }
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('click', handleImageClick);
      
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.tagName === 'IMG') {
              node.addEventListener('click', handleImageClick);
            }
          });
        });
      });
      
      observer.observe(editor, { childList: true, subtree: true });
      
      return () => {
        editor.removeEventListener('click', handleImageClick);
        observer.disconnect();
      };
    }
  }, [selectedImage]);

  // Add resize handles to image
  const addResizeHandles = (image) => {
    removeResizeHandles();
    
    let container = image.parentNode;
    if (!container.classList || !container.classList.contains('image-resize-container')) {
      container = document.createElement('div');
      container.className = 'image-resize-container';
      container.style.position = 'relative';
      container.style.display = 'inline-block';
      container.style.lineHeight = '0';
      
      image.parentNode.insertBefore(container, image);
      container.appendChild(image);
    }
    
    const positions = [
      { name: 'nw', style: 'top: -8px; left: -8px; cursor: nw-resize;' },
      { name: 'ne', style: 'top: -8px; right: -8px; cursor: ne-resize;' },
      { name: 'sw', style: 'bottom: -8px; left: -8px; cursor: sw-resize;' },
      { name: 'se', style: 'bottom: -8px; right: -8px; cursor: se-resize;' },
      { name: 'n', style: 'top: -8px; left: 50%; transform: translateX(-50%); cursor: n-resize;' },
      { name: 's', style: 'bottom: -8px; left: 50%; transform: translateX(-50%); cursor: s-resize;' },
      { name: 'e', style: 'top: 50%; right: -8px; transform: translateY(-50%); cursor: e-resize;' },
      { name: 'w', style: 'top: 50%; left: -8px; transform: translateY(-50%); cursor: w-resize;' }
    ];
    
    positions.forEach(pos => {
      const handle = document.createElement('div');
      handle.className = `resize-handle resize-handle-${pos.name}`;
      handle.style.cssText = `
        position: absolute;
        width: 16px;
        height: 16px;
        background: white;
        border: 2px solid #10b981;
        border-radius: 50%;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        ${pos.style}
      `;
      
      handle.setAttribute('data-direction', pos.name);
      handle.addEventListener('mousedown', startResize);
      handle.addEventListener('click', (e) => e.stopPropagation());
      
      container.appendChild(handle);
    });
  };

  const removeResizeHandles = () => {
    const handles = document.querySelectorAll('.resize-handle');
    handles.forEach(handle => handle.remove());
    
    const containers = document.querySelectorAll('.image-resize-container');
    containers.forEach(container => {
      const image = container.querySelector('img');
      if (image && container.parentNode) {
        container.parentNode.insertBefore(image, container);
        container.remove();
      }
    });
  };

  const startResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const handle = e.target;
    const direction = handle.getAttribute('data-direction');
    const container = handle.closest('.image-resize-container');
    
    if (!container) return;
    
    const image = container.querySelector('img');
    if (!image) return;
    
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStartX(e.clientX);
    setResizeStartY(e.clientY);
    setResizeStartWidth(image.offsetWidth);
    setResizeStartHeight(image.offsetHeight);
    
    resizeRef.current = {
      image,
      container,
      aspectRatio: image.offsetWidth / image.offsetHeight
    };
    
    document.body.style.userSelect = 'none';
  };

  const handleResize = (e) => {
    if (!isResizing || !resizeRef.current) return;
    
    e.preventDefault();
    
    const { image, aspectRatio } = resizeRef.current;
    const deltaX = e.clientX - resizeStartX;
    const deltaY = e.clientY - resizeStartY;
    
    let newWidth = resizeStartWidth;
    let newHeight = resizeStartHeight;
    
    switch(resizeDirection) {
      case 'se':
        newWidth = Math.max(50, resizeStartWidth + deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight + deltaY);
        break;
      case 'sw':
        newWidth = Math.max(50, resizeStartWidth - deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight + deltaY);
        break;
      case 'ne':
        newWidth = Math.max(50, resizeStartWidth + deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight - deltaY);
        break;
      case 'nw':
        newWidth = Math.max(50, resizeStartWidth - deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : Math.max(50, resizeStartHeight - deltaY);
        break;
      case 'e':
        newWidth = Math.max(50, resizeStartWidth + deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : resizeStartHeight;
        break;
      case 'w':
        newWidth = Math.max(50, resizeStartWidth - deltaX);
        newHeight = e.shiftKey ? newWidth / aspectRatio : resizeStartHeight;
        break;
      case 'n':
        newWidth = e.shiftKey ? Math.max(50, (resizeStartHeight - deltaY) * aspectRatio) : resizeStartWidth;
        newHeight = Math.max(50, resizeStartHeight - deltaY);
        break;
      case 's':
        newWidth = e.shiftKey ? Math.max(50, (resizeStartHeight + deltaY) * aspectRatio) : resizeStartWidth;
        newHeight = Math.max(50, resizeStartHeight + deltaY);
        break;
    }
    
    image.style.width = `${newWidth}px`;
    image.style.height = `${newHeight}px`;
    
    image.removeAttribute('width');
    image.removeAttribute('height');
  };

  const stopResize = () => {
    setIsResizing(false);
    resizeRef.current = null;
    document.body.style.userSelect = '';
  };

  const resetImageSize = () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }
    
    selectedImage.style.width = '';
    selectedImage.style.height = '';
    selectedImage.removeAttribute('width');
    selectedImage.removeAttribute('height');
  };

  const setImageSize = (width, height) => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }
    
    selectedImage.style.width = `${width}px`;
    selectedImage.style.height = `${height}px`;
  };

  const addLinkToSelectedImage = () => {
    if (!selectedImage) {
      alert("Please click on an image to select it first");
      return;
    }

    const parentAnchor = selectedImage.closest('a');
    if (parentAnchor) {
      setLinkUrl(parentAnchor.href || '');
    } else {
      setLinkUrl('');
    }
    
    setShowLinkDialog(true);
  };

  const handleLinkSubmit = () => {
    if (!selectedImage) {
      alert("No image selected");
      setShowLinkDialog(false);
      return;
    }

    if (!linkUrl) {
      alert("Please enter a URL");
      return;
    }

    try {
      let url = linkUrl;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }

      const parentAnchor = selectedImage.closest('a');
      
      if (parentAnchor) {
        parentAnchor.href = url;
        parentAnchor.target = '_blank';
        parentAnchor.rel = 'noopener noreferrer';
      } else {
        removeResizeHandles();
        
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.className = 'linked-image';
        
        selectedImage.parentNode.replaceChild(anchor, selectedImage);
        anchor.appendChild(selectedImage);
      }

      selectedImage.classList.add('selected-image');
      
      alert('Link added successfully!');
    } catch (error) {
      console.error('Error adding link:', error);
      alert('Error adding link. Please try again.');
    }

    setShowLinkDialog(false);
    setLinkUrl("");
  };

  const editImageLink = () => {
    if (!selectedImage) {
      alert("Please click on an image to select it first");
      return;
    }

    const parentAnchor = selectedImage.closest('a');
    if (parentAnchor) {
      setLinkUrl(parentAnchor.href || '');
      setShowLinkDialog(true);
    } else {
      alert("Selected image doesn't have a link. Use 'Add Link to Image' instead.");
    }
  };

  const removeImageLink = () => {
    if (!selectedImage) {
      alert("Please click on an image to select it first");
      return;
    }

    const parentAnchor = selectedImage.closest('a');
    if (parentAnchor) {
      removeResizeHandles();
      
      parentAnchor.parentNode.replaceChild(selectedImage, parentAnchor);
      
      selectedImage.classList.add('selected-image');
      
      alert('Link removed successfully!');
    } else {
      alert("Selected image doesn't have a link to remove");
    }
  };

  const handleEditorImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      
      formatText("insertImage", base64);
      
      setTimeout(() => {
        const images = editorRef.current.getElementsByTagName('img');
        if (images.length > 0) {
          const lastImage = images[images.length - 1];
          
          if (selectedImage) {
            selectedImage.classList.remove('selected-image');
            removeResizeHandles();
          }
          
          lastImage.classList.add('selected-image');
          setSelectedImage(lastImage);
          
          lastImage.addEventListener('click', handleImageClick);
          
          if (window.confirm("Do you want to add a link to this image?")) {
            setLinkUrl('');
            setShowLinkDialog(true);
          }
        }
      }, 200);
    };
    reader.readAsDataURL(file);
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({ ...formData, image: event.target.result });
      // Auto-generate OG and Twitter images
      setFormData(prev => ({
        ...prev,
        ogImage: event.target.result,
        twitterImage: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate SEO
    const seoErrors = validateSEO();
    if (seoErrors.length > 0) {
      if (!window.confirm(`SEO Recommendations:\n${seoErrors.join('\n')}\n\nDo you want to continue anyway?`)) {
        return;
      }
    }
    
    if (selectedImage) {
      selectedImage.classList.remove('selected-image');
      removeResizeHandles();
    }
    
    const htmlContent = editorRef.current.innerHTML;
    const blogData = { 
      ...formData, 
      content: htmlContent,
      publishedDate: formData.publishedDate || formData.date || new Date(),
      modifiedDate: new Date()
    };

    try {
      const response = await axiosInstance.post("/blogs", blogData);
      if (response.data.success) {
        alert("Blog saved successfully with SEO optimization!");

        setFormData({
          title: "",
          slug: "",
          category: "",
          date: "",
          image: "",
          shortDescription: "",
          content: "",
          faq: [{ question: "", answer: "" }],
          metaTitle: "",
          metaDescription: "",
          metaKeywords: "",
          canonicalUrl: "",
          publishedDate: "",
          ogTitle: "",
          ogDescription: "",
          ogImage: "",
          twitterTitle: "",
          twitterDescription: "",
          twitterImage: "",
          noIndex: false,
          noFollow: false
        });
        editorRef.current.innerHTML = "";
        setSelectedImage(null);
        setShowSEOSection(false);
        setShowAdvancedSEO(false);
      } else {
        alert(response.data.message || "Failed to save blog");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Check console.");
    }
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 border shadow">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Blog</h1>

        {/* Link Dialog Modal */}
        {showLinkDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">
                {selectedImage?.closest('a') ? 'Edit Image Link' : 'Add Link to Image'}
              </h3>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL (e.g., example.com or https://example.com)"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                autoFocus
              />
              <div className="text-sm text-gray-500 mb-4">
                Tip: You can enter URL with or without https://
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowLinkDialog(false);
                    setLinkUrl("");
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLinkSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Apply Link
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Text Inputs */}
          <input
            type="text"
            name="title"
            placeholder="Title *"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          
          <input
            type="text"
            name="slug"
            placeholder="Slug * (auto-generated from title)"
            value={formData.slug}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
            required
          />
          
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
            placeholder="Date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Short Description */}
          <textarea
            name="shortDescription"
            placeholder="Short Description (used for meta description if not specified)"
            rows="3"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* SEO Section Toggle */}
          <div className="border rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSEOSection(!showSEOSection)}
              className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 font-semibold text-left flex justify-between items-center"
            >
              <span>🔍 SEO Settings (Meta Tags & Social Media)</span>
              <span>{showSEOSection ? '▼' : '▶'}</span>
            </button>
            
            {showSEOSection && (
              <div className="p-4 space-y-4">
                {/* Auto-generate SEO Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAutoGenerateSEO}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    ✨ Auto-generate from content
                  </button>
                </div>
                
                {/* Basic SEO Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Title 
                      <span className="text-xs text-gray-500 ml-2">({formData.metaTitle?.length || 0}/60 chars)</span>
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleChange}
                      placeholder="SEO Title (leave blank to use blog title)"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                    {formData.metaTitle && formData.metaTitle.length > 60 && (
                      <p className="text-xs text-red-500 mt-1">Meta title is too long! Keep under 60 characters.</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Description
                      <span className="text-xs text-gray-500 ml-2">({formData.metaDescription?.length || 0}/160 chars)</span>
                    </label>
                    <textarea
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleChange}
                      placeholder="SEO Description (leave blank to use short description)"
                      rows="2"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                    {formData.metaDescription && formData.metaDescription.length > 160 && (
                      <p className="text-xs text-red-500 mt-1">Meta description is too long! Keep under 160 characters.</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                    placeholder="keyword1, keyword2, keyword3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                  <input
                    type="url"
                    name="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={handleChange}
                    placeholder="https://drankushgarg.in/blog/your-slug"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                  <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                
                {/* Advanced SEO Toggle */}
                <button
                  type="button"
                  onClick={() => setShowAdvancedSEO(!showAdvancedSEO)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showAdvancedSEO ? '▼ Hide' : '▶ Show'} Social Media & Advanced Settings
                </button>
                
                {showAdvancedSEO && (
                  <div className="space-y-4 pt-2">
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Open Graph (Facebook, LinkedIn)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
                          <input
                            type="text"
                            name="ogTitle"
                            value={formData.ogTitle}
                            onChange={handleChange}
                            placeholder="Social Media Title"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
                          <textarea
                            name="ogDescription"
                            value={formData.ogDescription}
                            onChange={handleChange}
                            placeholder="Social Media Description"
                            rows="2"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Twitter Card</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Title</label>
                          <input
                            type="text"
                            name="twitterTitle"
                            value={formData.twitterTitle}
                            onChange={handleChange}
                            placeholder="Twitter Card Title"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Twitter Description</label>
                          <textarea
                            name="twitterDescription"
                            value={formData.twitterDescription}
                            onChange={handleChange}
                            placeholder="Twitter Card Description"
                            rows="2"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Indexing Options</h4>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="noIndex"
                            checked={formData.noIndex}
                            onChange={handleChange}
                            className="rounded"
                          />
                          <span className="text-sm">No Index (hide from search engines)</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="noFollow"
                            checked={formData.noFollow}
                            onChange={handleChange}
                            className="rounded"
                          />
                          <span className="text-sm">No Follow (don't follow links)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* FAQ Section */}
          <div className="border rounded-xl p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-3">FAQ Section (Schema Markup Ready)</h2>

            {formData.faq.map((item, index) => (
              <div key={index} className="mb-4 border p-3 rounded-lg bg-white">
                <input
                  type="text"
                  placeholder="Question"
                  value={item.question}
                  onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                  className="w-full mb-2 border px-3 py-2 rounded"
                />
                <textarea
                  placeholder="Answer"
                  value={item.answer}
                  onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="mt-2 text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addFaq}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              + Add FAQ
            </button>
          </div>

          {/* Main Blog Image Upload */}
          <div>
            <label className="block mb-2 font-medium">Blog Image (used for OG and Twitter images)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageUpload}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 w-48 h-auto rounded-lg"
              />
            )}
          </div>

          {/* Selected Image Indicator */}
          {selectedImage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
              <span className="text-lg">✅</span>
              <strong className="ml-2">Image selected!</strong>
              <ul className="list-disc ml-6 mt-1">
                <li>Resize by dragging the circular handles</li>
                <li>Hold Shift key while resizing to maintain aspect ratio</li>
                <li>Use preset sizes below</li>
                <li>Use Image Link Tools to add/edit/remove links</li>
              </ul>
            </div>
          )}

          {/* Image Size Tools */}
          {selectedImage && (
            <div className="border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
              <h3 className="text-sm font-semibold text-purple-800 mb-3">📏 Image Size Tools</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={resetImageSize}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2"
                >
                  <span>🔄</span> Reset to Original
                </button>
                <button
                  type="button"
                  onClick={() => setImageSize(300, 200)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
                >
                  Small (300x200)
                </button>
                <button
                  type="button"
                  onClick={() => setImageSize(500, 350)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
                >
                  Medium (500x350)
                </button>
                <button
                  type="button"
                  onClick={() => setImageSize(800, 450)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
                >
                  Large (800x450)
                </button>
              </div>
              <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                <span className="text-lg">💡</span> Tip: Drag the green circular handles to resize manually. Hold Shift to maintain aspect ratio.
              </p>
            </div>
          )}

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

            {/* Text Links */}
            <button type="button" onClick={() => { const url = prompt("Enter link URL"); if(url) formatText("createLink", url); }} className="editor-btn">Insert Text Link</button>

            {/* Image Upload */}
            <button type="button" onClick={() => editorFileRef.current.click()} className="editor-btn bg-purple-100">📷 Upload Image</button>
            <input
              type="file"
              accept="image/*"
              ref={editorFileRef}
              onChange={handleEditorImageUpload}
              className="hidden"
            />

            {/* Image Link Tools */}
            <div className="w-full border-t-2 border-gray-200 my-2 pt-2">
              <span className="text-sm font-semibold text-gray-600 block mb-2">🔗 Image Link Tools:</span>
              <div className="flex flex-wrap gap-2">
                <button 
                  type="button" 
                  onClick={addLinkToSelectedImage} 
                  className="editor-btn bg-blue-500 text-white hover:bg-blue-600"
                  title="Click on an image first, then click here"
                >
                  🔗 Add Link
                </button>
                <button 
                  type="button" 
                  onClick={editImageLink} 
                  className="editor-btn bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  ✏️ Edit Link
                </button>
                <button 
                  type="button" 
                  onClick={removeImageLink} 
                  className="editor-btn bg-red-500 text-white hover:bg-red-600"
                >
                  🗑️ Remove Link
                </button>
              </div>
            </div>

            {/* Undo/Redo/Clear */}
            <button type="button" onClick={() => formatText("undo")} className="editor-btn">Undo</button>
            <button type="button" onClick={() => formatText("redo")} className="editor-btn">Redo</button>
            <button type="button" onClick={() => formatText("removeFormat")} className="editor-btn">Clear</button>
          </div>

          {/* Rich Text Editor */}
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[400px] border border-gray-300 rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400 prose max-w-none"
            suppressContentEditableWarning={true}
            style={{ whiteSpace: "pre-wrap" }}
          ></div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            Publish Blog with SEO
          </button>
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
            transition: all 0.2s;
          }
          .editor-btn:hover { 
            background: #ecfdf5;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .editor-select {
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            border: 1px solid #d1d5db;
            cursor: pointer;
            background: white;
          }
          
          div[contenteditable="true"] { 
            min-height: 400px;
            outline: none;
            cursor: text;
          }
          
          div[contenteditable="true"] ul, 
          div[contenteditable="true"] ol { 
            padding-left: 2rem; 
            margin: 0.5rem 0;
          }
          
          div[contenteditable="true"] ul { 
            list-style-type: disc; 
          }
          
          div[contenteditable="true"] ol { 
            list-style-type: decimal; 
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
          
          div[contenteditable="true"] a { 
            color: #2563eb; 
            text-decoration: underline; 
            cursor: pointer;
          }
          
          div[contenteditable="true"] a:hover {
            color: #1d4ed8;
          }
          
          div[contenteditable="true"] img { 
            max-width: 100%; 
            height: auto; 
            cursor: pointer;
            border: 3px solid transparent;
            border-radius: 8px;
            transition: all 0.2s;
            display: inline-block;
            margin: 0.5rem 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            user-select: none;
          }
          
          div[contenteditable="true"] img:hover {
            border: 3px solid #3b82f6;
            opacity: 0.9;
          }
          
          div[contenteditable="true"] img.selected-image {
            border: 3px solid #10b981;
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
          }
          
          .image-resize-container {
            position: relative;
            display: inline-block;
            line-height: 0;
            margin: 0.5rem 0;
          }
          
          .image-resize-container img {
            display: block;
            width: auto;
            height: auto;
            max-width: 100%;
            margin: 0;
          }
          
          .resize-handle {
            position: absolute;
            width: 16px;
            height: 16px;
            background: white;
            border: 2px solid #10b981;
            border-radius: 50%;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            transition: all 0.2s;
          }
          
          .resize-handle:hover {
            background: #10b981;
            transform: scale(1.2);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          }
          
          div[contenteditable="true"] a.linked-image {
            text-decoration: none;
            border: none;
            display: inline-block;
          }
          
          div[contenteditable="true"] a.linked-image img {
            border: 3px solid transparent;
          }
          
          div[contenteditable="true"] a.linked-image:hover img {
            border: 3px solid #2563eb;
            opacity: 0.8;
          }
        `}
      </style>
    </section>
  );
}
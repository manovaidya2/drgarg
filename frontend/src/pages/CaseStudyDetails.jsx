// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { Plus } from "lucide-react";
// import { Helmet } from "react-helmet-async";

// export default function CaseStudyDetails() {
//   const { slug } = useParams();
//   const [caseStudy, setCaseStudy] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCaseStudy = async () => {
//       try {
//         const res = await axiosInstance.get(`/case-studies/${slug}`);
//         setCaseStudy(res.data);
//       } catch (error) {
//         console.error("Error fetching case study", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaseStudy();
//   }, [slug]);

//   if (loading) {
//     return (
//       <p className="text-center py-20 text-gray-600 text-lg">
//         Loading case study...
//       </p>
//     );
//   }

//   if (!caseStudy) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
//         <h2 className="text-2xl font-bold text-[#8b43ba] mb-3">
//           Case Study Not Found
//         </h2>
//         <Link to="/case-study" className="underline text-[#8b43ba] font-medium">
//           Go Back
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* 🔥 SEO for Case Study */}
//       <Helmet>
//         <title>{caseStudy.title} | Dr. Ankush Garg</title>
//         <meta
//           name="description"
//           content={
//             caseStudy.metaDescription ||
//             caseStudy.excerpt ||
//             "Read detailed case study on mental wellness and Ayurvedic treatments by Dr. Ankush Garg."
//           }
//         />
//         <meta
//           name="keywords"
//           content={`Dr Ankush Garg, case study, Ayurvedic mental wellness, ${caseStudy.tags?.join(", ") || "mental health"}`}
//         />
//         <link
//           rel="canonical"
//           href={`https://drankushgarg.com/case-study/${slug}`}
//         />

//         {/* Open Graph */}
//         <meta property="og:title" content={caseStudy.title} />
//         <meta
//           property="og:description"
//           content={
//             caseStudy.excerpt ||
//             "Detailed Ayurvedic mental wellness case study by Dr. Ankush Garg."
//           }
//         />
//         <meta property="og:type" content="article" />
//         <meta
//           property="og:url"
//           content={`https://drankushgarg.com/case-study/${slug}`}
//         />
//         <meta property="og:image" content={caseStudy.image} />

//         {/* Twitter */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={caseStudy.title} />
//         <meta
//           name="twitter:description"
//           content={
//             caseStudy.excerpt ||
//             "Read this Ayurvedic mental wellness case study by Dr. Ankush Garg."
//           }
//         />
//         <meta name="twitter:image" content={caseStudy.image} />

//         {/* Article Meta */}
//         <meta property="article:published_time" content={caseStudy.createdAt} />
//         <meta property="article:author" content="Dr. Ankush Garg" />
//       </Helmet>

//       {/* PAGE CONTENT */}
//       <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
//         {/* Hero Image */}
//         <div className="w-full h-[220px] sm:h-[300px] md:h-[420px] relative">
//           <img
//             src={caseStudy.image}
//             alt={caseStudy.title}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Header Section */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-6 sm:mt-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#8b43ba] leading-snug">
//                 {caseStudy.title}
//               </h1>
//               <p className="text-gray-600 text-sm sm:text-base mt-1">
//                 {new Date(caseStudy.createdAt).toDateString()} · Case Study
//               </p>
//             </div>

//             {/* CTA */}
//             <Link
//               to="/appointment"
//               className="inline-flex items-center justify-center gap-2
//                          bg-[#8b43ba] text-white px-5 py-2.5 rounded-xl
//                          shadow hover:bg-[#7a38a6] transition
//                          text-sm sm:text-base w-full sm:w-auto"
//             >
//               <Plus size={18} />
//               Book Consultation
//             </Link>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-10 sm:mt-14 pb-16">
//           <div
//             className="prose prose-base sm:prose-lg max-w-none
//                        prose-headings:text-gray-800
//                        prose-p:text-gray-700
//                        prose-img:rounded-xl"
//             dangerouslySetInnerHTML={{ __html: caseStudy.content }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }


import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Plus } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function CaseStudyDetails() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const res = await axiosInstance.get(`/case-studies/${slug}`);
        console.log("✅ Fetched case study:", res.data);
        
        // Log the content to check if it contains links
        console.log("📝 Content HTML:", res.data.content);
        console.log("🔗 Contains links?", res.data.content.includes('<a '));
        console.log("🖼️ Contains linked images?", res.data.content.includes('<a') && res.data.content.includes('<img'));
        
        setCaseStudy(res.data);
      } catch (error) {
        console.error("❌ Error fetching case study", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  // Process content to ensure links open in new tab and have proper security attributes
  const processContent = (content) => {
    if (!content) return '';
    
    // Create a temporary div to parse the content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Find all anchor tags and add target="_blank" and rel="noopener noreferrer"
    const anchors = tempDiv.querySelectorAll('a');
    anchors.forEach(anchor => {
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noopener noreferrer');
      
      // Check if anchor contains an image
      if (anchor.querySelector('img')) {
        anchor.classList.add('linked-image');
        // Remove any selection classes that might have been added in the editor
        const img = anchor.querySelector('img');
        if (img) {
          img.classList.remove('selected-image');
          // Remove any resize container artifacts
          img.style.removeProperty('width');
          img.style.removeProperty('height');
        }
      } else {
        // Regular text link
        anchor.classList.add('external-link');
      }
    });
    
    // Also find any images that might not be wrapped in anchors
    const images = tempDiv.querySelectorAll('img:not(a img)');
    images.forEach(img => {
      img.classList.remove('selected-image');
      img.style.removeProperty('width');
      img.style.removeProperty('height');
    });
    
    // Remove any resize containers
    const containers = tempDiv.querySelectorAll('.image-resize-container');
    containers.forEach(container => {
      const img = container.querySelector('img');
      if (img && container.parentNode) {
        container.parentNode.insertBefore(img, container);
        container.remove();
      }
    });
    
    return tempDiv.innerHTML;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b43ba]"></div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
        <h2 className="text-2xl font-bold text-[#8b43ba] mb-3">
          Case Study Not Found
        </h2>
        <Link to="/case-study" className="underline text-[#8b43ba] font-medium">
          Go Back
        </Link>
      </div>
    );
  }

  // Process the content
  const processedContent = processContent(caseStudy.content);

  return (
    <>
      {/* 🔥 SEO for Case Study */}
      <Helmet>
        <title>{caseStudy.title} | Dr. Ankush Garg</title>
        <meta
          name="description"
          content={
            caseStudy.metaDescription ||
            caseStudy.shortDescription ||
            "Read detailed case study on mental wellness and Ayurvedic treatments by Dr. Ankush Garg."
          }
        />
        <meta
          name="keywords"
          content={`Dr Ankush Garg, case study, Ayurvedic mental wellness, ${caseStudy.category || "mental health"}`}
        />
        <link
          rel="canonical"
          href={`https://drankushgarg.com/case-study/${slug}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={caseStudy.title} />
        <meta
          property="og:description"
          content={
            caseStudy.shortDescription ||
            "Detailed Ayurvedic mental wellness case study by Dr. Ankush Garg."
          }
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://drankushgarg.com/case-study/${slug}`}
        />
        <meta property="og:image" content={caseStudy.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={caseStudy.title} />
        <meta
          name="twitter:description"
          content={
            caseStudy.shortDescription ||
            "Read this Ayurvedic mental wellness case study by Dr. Ankush Garg."
          }
        />
        <meta name="twitter:image" content={caseStudy.image} />

        {/* Article Meta */}
        <meta property="article:published_time" content={caseStudy.createdAt} />
        <meta property="article:author" content="Dr. Ankush Garg" />
      </Helmet>

      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Image */}
        {caseStudy.image && (
          <div className="w-full h-[220px] sm:h-[300px] md:h-[420px] relative overflow-hidden">
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header Section */}
        <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-10 mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#8b43ba] leading-snug">
                {caseStudy.title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {new Date(caseStudy.createdAt || caseStudy.date).toDateString()} · Case Study
              </p>
              {caseStudy.shortDescription && (
                <p className="text-gray-600 mt-2 italic border-l-4 border-[#8b43ba] pl-3">
                  {caseStudy.shortDescription}
                </p>
              )}
            </div>

            {/* CTA */}
            <Link
              to="/appointment"
              className="inline-flex items-center justify-center gap-2
                         bg-[#8b43ba] text-white px-5 py-2.5 rounded-xl
                         shadow hover:bg-[#7a38a6] transition
                         text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
            >
              <Plus size={18} />
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Content - Processed for linked images */}
        <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-10 mt-10 sm:mt-14 pb-16">
          <div
            className="prose prose-base sm:prose-lg max-w-none
                       prose-headings:text-gray-800 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                       prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4
                       prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto prose-img:my-8
                       prose-a:text-[#8b43ba] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-gray-800
                       prose-ul:list-disc prose-ol:list-decimal prose-ul:ml-6 prose-ol:ml-6 prose-ul:my-4 prose-ol:my-4
                       prose-li:my-1
                       prose-blockquote:border-l-4 prose-blockquote:border-[#8b43ba] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6
                       prose-hr:my-8"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>

        {/* Share Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 pb-16">
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-3">Share this case study:</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://drankushgarg.com/case-study/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877f2] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0e5fc7] transition-colors"
              >
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://drankushgarg.com/case-study/${slug}`)}&text=${encodeURIComponent(caseStudy.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1da1f2] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0c85d0] transition-colors"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://drankushgarg.com/case-study/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0a66c2] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#084e96] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${caseStudy.title} - https://drankushgarg.com/case-study/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25d366] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#1da851] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          /* Main container styles */
          .prose {
            max-width: 100%;
            color: #374151;
          }

          /* Linked image styles */
          .prose a.linked-image {
            display: inline-block;
            text-decoration: none;
            border: none;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            z-index: 10;
            margin: 1rem 0;
          }
          
          .prose a.linked-image:hover {
            transform: scale(1.02);
            opacity: 0.95;
          }
          
          .prose a.linked-image img {
            transition: all 0.3s ease;
            display: block;
            margin: 0 auto;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: 3px solid transparent;
          }
          
          .prose a.linked-image:hover img {
            box-shadow: 0 20px 30px -10px rgba(139, 67, 186, 0.4);
            border-color: #8b43ba;
          }
          
          /* Regular linked images without extra decoration */
          .prose a.linked-image::after {
            display: none;
          }
          
          /* Regular image styles */
          .prose img {
            max-width: 100%;
            height: auto;
            display: block;
            margin-left: auto;
            margin-right: auto;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          
          /* External link styles (for text links) */
          .prose a.external-link:not(.linked-image) {
            color: #8b43ba;
            text-decoration: none;
            font-weight: 500;
            position: relative;
            padding-right: 0.25rem;
          }
          
          .prose a.external-link:not(.linked-image):hover {
            text-decoration: underline;
            color: #6b2fa0;
          }
          
          .prose a.external-link:not(.linked-image)::after {
            content: "↗";
            display: inline-block;
            margin-left: 3px;
            font-size: 0.8rem;
            vertical-align: super;
            line-height: 1;
          }
          
          /* General link styles */
          .prose a {
            color: #8b43ba;
            transition: all 0.2s ease;
            cursor: pointer;
          }
          
          .prose a:hover {
            color: #6b2fa0;
          }
          
          /* Remove any editor-specific classes */
          .prose .selected-image {
            border: none !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          }
          
          /* Ensure images inside links don't have extra borders */
          .prose a img {
            border: none;
            outline: none;
          }
          
          /* Responsive images */
          @media (max-width: 640px) {
            .prose img {
              max-width: 100%;
              height: auto;
            }
            
            .prose a.linked-image:hover {
              transform: scale(1.01);
            }
          }
          
          /* Ensure linked images are clickable on mobile */
          @media (max-width: 768px) {
            .prose a.linked-image {
              display: block;
              text-align: center;
            }
          }
          
          /* Tables styling if any */
          .prose table {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
          }
          
          .prose th {
            background: #f3e8ff;
            color: #8b43ba;
            font-weight: 600;
            padding: 0.75rem;
            border: 1px solid #e2e8f0;
          }
          
          .prose td {
            padding: 0.75rem;
            border: 1px solid #e2e8f0;
          }
          
          /* Code blocks */
          .prose pre {
            background: #1e1e2e;
            color: #fff;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
          }
          
          .prose code {
            background: #f1f1f1;
            color: #e01e5a;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.9em;
          }
        `}
      </style>
    </>
  );
}
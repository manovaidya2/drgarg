// components/BlogCarousel.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

export default function BlogCarousel() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchCurrent, setTouchCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startTranslate, setStartTranslate] = useState(0);
  const autoplayRef = useRef(null);
  const trackRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 30;

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blogs?limit=10");
        setBlogs(res.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching blogs for carousel", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(5);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Reset current index when itemsPerView changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerView]);

  // Autoplay functionality
  useEffect(() => {
    if (blogs.length === 0 || isPaused || isDragging) return;

    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [blogs.length, isPaused, isDragging, currentIndex, itemsPerView]);

  // Next slide - moves exactly 1 blog card
  const nextSlide = () => {
    if (blogs.length === 0) return;
    const maxIndex = Math.max(0, blogs.length - itemsPerView);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Previous slide - moves exactly 1 blog card
  const prevSlide = () => {
    if (blogs.length === 0) return;
    const maxIndex = Math.max(0, blogs.length - itemsPerView);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const totalSlides = Math.max(0, blogs.length - itemsPerView + 1);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Get the current base translateX value (without drag offset)
  const getBaseTranslateX = () => {
    if (!trackRef.current) return 0;
    const cards = trackRef.current.children;
    if (cards.length === 0) return 0;
    
    let translateX = 0;
    for (let i = 0; i < currentIndex; i++) {
      const card = cards[i];
      if (card) {
        const cardWidth = card.offsetWidth;
        const style = window.getComputedStyle(card);
        const marginRight = parseFloat(style.marginRight) || 0;
        translateX += cardWidth + marginRight;
      }
    }
    return translateX;
  };

  // Get the maximum drag limit (prevent over-drag)
  const getMaxDragLimit = () => {
    if (!trackRef.current) return 0;
    const maxIndex = Math.max(0, blogs.length - itemsPerView);
    if (currentIndex >= maxIndex && dragOffset > 0) return 0;
    if (currentIndex <= 0 && dragOffset < 0) return 0;
    return Math.abs(dragOffset) * 0.5;
  };

  // Calculate final translateX with smooth drag
  const getTranslateX = () => {
    const baseX = getBaseTranslateX();
    let finalX = baseX;
    
    if (isDragging && dragOffset !== 0) {
      // Add drag offset with resistance at edges
      const maxIndex = Math.max(0, blogs.length - itemsPerView);
      let resistance = 1;
      
      if (currentIndex >= maxIndex && dragOffset > 0) {
        resistance = 0.3; // Resistance at end
      } else if (currentIndex <= 0 && dragOffset < 0) {
        resistance = 0.3; // Resistance at start
      }
      
      finalX = baseX + (dragOffset * resistance);
    }
    
    return -finalX;
  };

  // Touch handlers for smooth mobile swipe
  const onTouchStart = (e) => {
    const touchX = e.targetTouches[0].clientX;
    setTouchStart(touchX);
    setTouchCurrent(touchX);
    setStartTranslate(getBaseTranslateX());
    setIsDragging(true);
    setIsPaused(true);
    setDragOffset(0);
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchCurrent(currentTouch);
    
    // Calculate drag offset for smooth visual feedback
    let diff = currentTouch - touchStart;
    
    // Add resistance at edges
    const maxIndex = Math.max(0, blogs.length - itemsPerView);
    if (currentIndex >= maxIndex && diff > 0) {
      diff = diff * 0.3;
    } else if (currentIndex <= 0 && diff < 0) {
      diff = diff * 0.3;
    }
    
    setDragOffset(diff);
  };

  const onTouchEnd = () => {
    if (!isDragging) return;
    
    const distance = touchCurrent - touchStart;
    const isLeftSwipe = distance < -minSwipeDistance; // Swipe left = next
    const isRightSwipe = distance > minSwipeDistance; // Swipe right = previous
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    // Reset drag state
    setTouchStart(0);
    setTouchCurrent(0);
    setIsDragging(false);
    setDragOffset(0);
    
    // Resume autoplay after 3 seconds
    setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  if (loading) {
    return (
      <section className="w-full bg-[#f6f4ef] py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-3 border-[#003f26] border-t-transparent"></div>
            <p className="mt-4 text-[#3d4f4a]">Loading insights...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#f6f4ef] py-16 md:py-20 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#cfd6d2] bg-white px-4 py-1.5 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d8a63b]" />
            <span className="text-[#0b3b2e] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.25em]">
              LATEST INSIGHTS
            </span>
          </div>

          <h2 className="font-serif text-[#0b3b2e] text-[32px] sm:text-[38px] md:text-[44px] leading-[1.2] tracking-[-0.02em]">
            Expert Articles on Autism, ADHD & Mental Health
          </h2>

          <p className="mt-4 max-w-[700px] mx-auto text-[#4b5d57] text-[16px] md:text-[17px] leading-[1.7]">
            Plain-language, research-backed articles written or personally guided by Dr. Ankush Garg
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Desktop Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-5 z-20 w-10 h-10 rounded-full bg-white border border-[#e6e0d6] shadow-md items-center justify-center hover:bg-[#003f26] hover:text-white hover:border-[#003f26] transition-all duration-300"
                aria-label="Previous articles"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-5 z-20 w-10 h-10 rounded-full bg-white border border-[#e6e0d6] shadow-md items-center justify-center hover:bg-[#003f26] hover:text-white hover:border-[#003f26] transition-all duration-300"
                aria-label="Next articles"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Carousel Track with Touch Support */}
          <div className="overflow-hidden px-1">
            <div
              ref={trackRef}
              className="flex gap-5"
              style={{
                transform: `translateX(${getTranslateX()}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform'
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                  className="flex-shrink-0 group"
                  style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 20 / itemsPerView}px)` }}
                >
                  <article className="bg-white border border-[#e6e0d6] rounded-[16px] overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1">
                    {/* Image */}
                    {blog.image ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x250?text=Blog+Image";
                          }}
                        />
                        {/* Category Badge */}
                        {blog.category && (
                          <span className="absolute top-3 left-3 bg-[#d8a63b]/90 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded">
                            {blog.category}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[#003f26] to-[#0b5a3a] flex items-center justify-center">
                        <span className="text-white/60 text-sm">No image</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Meta Info */}
                      <div className="flex items-center gap-3 text-[11px] text-[#6b7c76] mb-3">
                        {blog.createdAt && (
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{Math.max(1, Math.ceil((blog.content?.length || 600) / 700))} min read</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-[#061f18] text-[18px] sm:text-[19px] leading-[1.4] group-hover:text-[#003f26] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-[#40514d] text-[13px] leading-[1.65] line-clamp-3 flex-grow">
                        {blog.metaDescription || blog.shortDescription}
                      </p>

                      {/* Read More */}
                      <div className="mt-4 inline-flex items-center gap-2 text-[#003f26] text-[13px] font-medium group-hover:gap-3 transition-all">
                        Read Article
                        <span className="text-[18px]">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Arrows - Below the carousel */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white border border-[#e6e0d6] shadow-md flex items-center justify-center hover:bg-[#003f26] hover:text-white hover:border-[#003f26] transition-all duration-300 active:scale-95"
              aria-label="Previous articles"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white border border-[#e6e0d6] shadow-md flex items-center justify-center hover:bg-[#003f26] hover:text-white hover:border-[#003f26] transition-all duration-300 active:scale-95"
              aria-label="Next articles"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-8 bg-[#003f26]"
                    : "w-2 bg-[#c8d5cf] hover:bg-[#003f26]/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All Blog Link */}
        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#003f26] text-white text-[14px] font-semibold hover:bg-[#002f1c] transition-all duration-300 hover:gap-3"
          >
            View All Articles
            <ChevronRight size={18} />
          </Link>
        </div>

        {/* Swipe Instruction for Mobile */}
        <div className="text-center mt-4 md:hidden">
          <p className="text-[#6b7c76] text-[10px]">
            👆 Swipe on cards or tap arrows to browse
          </p>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
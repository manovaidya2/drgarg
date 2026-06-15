import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Camera, ChevronDown, Grid3X3, Image, Layers3, X } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const cardHeights = [
  "h-[360px]",
  "h-[260px]",
  "h-[300px]",
  "h-[420px]",
  "h-[280px]",
  "h-[340px]",
  "h-[300px]",
  "h-[390px]",
  "h-[270px]",
];

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [heroRatios, setHeroRatios] = useState({});
  const [gridRatios, setGridRatios] = useState({});

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axiosInstance.get("/gallery");
      setGalleryItems(res.data || []);
    } catch (error) {
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const values = galleryItems
      .map((item) => item.category)
      .filter(Boolean)
      .filter((value, index, array) => array.indexOf(value) === index);

    return ["All", ...values];
  }, [galleryItems]);

  const sortedGalleryItems = useMemo(() => {
    return [...galleryItems].sort((a, b) => {
      const aTime = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const bTime = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return bTime - aTime;
    });
  }, [galleryItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return sortedGalleryItems;
    return sortedGalleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, sortedGalleryItems]);

  const heroImages = sortedGalleryItems.slice(0, 4);

  const getHeroKey = (item, index) => item?._id || item?.image || `hero-${index}`;

  const getHeroRatio = (item, index) => heroRatios[getHeroKey(item, index)] || 4 / 3;

  const getImageSrc = (item) => {
    if (!item?.image) return "";

    const version = item.updatedAt || item.createdAt || item._id || Date.now();
    const separator = item.image.includes("?") ? "&" : "?";
    return `${item.image}${separator}v=${encodeURIComponent(version)}`;
  };

  const handleHeroImageLoad = (item, index, event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (!naturalWidth || !naturalHeight) return;

    setHeroRatios((prev) => ({
      ...prev,
      [getHeroKey(item, index)]: naturalWidth / naturalHeight,
    }));
  };

  const getGridKey = (item, index) => item?._id || item?.image || `grid-${index}`;

  const getGridRatio = (item, index) => gridRatios[getGridKey(item, index)] || 4 / 3;

  const handleGridImageLoad = (item, index, event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (!naturalWidth || !naturalHeight) return;

    setGridRatios((prev) => ({
      ...prev,
      [getGridKey(item, index)]: naturalWidth / naturalHeight,
    }));
  };

  const scrollToGallery = () => {
    document.getElementById("gallery-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Gallery | Dr. Ankush Garg</title>
        <meta
          name="description"
          content="Explore Dr. Ankush Garg's clinic, events, media moments and wellness gallery."
        />
        <link rel="canonical" href="https://drankushgarg.in/gallery" />
      </Helmet>

      <section className="min-h-screen bg-[#fbfaf7] text-[#111b16]">
        <div className="border-b border-[#ebe4d8] bg-[radial-gradient(circle_at_78%_18%,rgba(216,163,61,0.14),transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:px-10 md:py-16 lg:min-h-[520px] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.34em] text-[#6f7c74]">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-[#ded5c7] bg-white text-[#002b18] shadow-sm">
                  <Camera size={14} />
                </span>
                Gallery
              </div>

              <h1 className="mt-7 max-w-[560px] font-serif text-[42px] leading-[1.02] tracking-[-0.05em] text-[#101713] sm:text-[58px] md:text-[72px]">
                Moments Worth Remembering
              </h1>

              <p className="mt-5 max-w-[430px] text-[15px] leading-[1.75] text-[#5f6963] md:text-[16px]">
                A collection of moments captured across clinic life, awareness
                sessions, learning spaces and patient education.
              </p>

              <button
                type="button"
                onClick={scrollToGallery}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#101713] px-6 py-3 text-[13px] font-bold text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-[#002b18]"
              >
                <Grid3X3 size={15} />
                View Collections
              </button>
            </div>

            <div className="relative mx-auto h-[360px] w-full max-w-[620px] sm:h-[440px]">
              {heroImages.length > 0 ? (
                <>
                  {heroImages[0] && (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(heroImages[0])}
                      style={{ aspectRatio: getHeroRatio(heroImages[0], 0) }}
                      className="absolute left-[26%] top-0 z-30 w-[210px] overflow-hidden rounded-[12px] bg-white shadow-[0_28px_60px_rgba(0,43,24,0.22)] ring-1 ring-white/70 transition hover:-translate-y-1 sm:w-[250px]"
                    >
                      <img
                        src={getImageSrc(heroImages[0])}
                        alt={heroImages[0].altText || heroImages[0].title}
                        onLoad={(event) => handleHeroImageLoad(heroImages[0], 0, event)}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  )}
                  {heroImages[1] && (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(heroImages[1])}
                      style={{ aspectRatio: getHeroRatio(heroImages[1], 1) }}
                      className="absolute left-[5%] top-[105px] z-20 w-[220px] rotate-[-3deg] overflow-hidden rounded-[12px] bg-white shadow-[0_24px_48px_rgba(0,43,24,0.18)] ring-1 ring-white/70 transition hover:-translate-y-1 sm:w-[260px]"
                    >
                      <img
                        src={getImageSrc(heroImages[1])}
                        alt={heroImages[1].altText || heroImages[1].title}
                        onLoad={(event) => handleHeroImageLoad(heroImages[1], 1, event)}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  )}
                  {heroImages[2] && (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(heroImages[2])}
                      style={{ aspectRatio: getHeroRatio(heroImages[2], 2) }}
                      className="absolute right-[4%] top-[76px] z-10 w-[210px] rotate-[8deg] overflow-hidden rounded-[12px] bg-white shadow-[0_24px_48px_rgba(0,43,24,0.16)] ring-1 ring-white/70 transition hover:-translate-y-1 sm:w-[240px]"
                    >
                      <img
                        src={getImageSrc(heroImages[2])}
                        alt={heroImages[2].altText || heroImages[2].title}
                        onLoad={(event) => handleHeroImageLoad(heroImages[2], 2, event)}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  )}
                  {heroImages[3] && (
                    <button
                      type="button"
                      onClick={() => setSelectedItem(heroImages[3])}
                      style={{ aspectRatio: getHeroRatio(heroImages[3], 3) }}
                      className="absolute bottom-0 left-[34%] z-40 w-[220px] rotate-[2deg] overflow-hidden rounded-[12px] bg-white shadow-[0_22px_46px_rgba(0,43,24,0.2)] ring-1 ring-white/70 transition hover:-translate-y-1 sm:w-[280px]"
                    >
                      <img
                        src={getImageSrc(heroImages[3])}
                        alt={heroImages[3].altText || heroImages[3].title}
                        onLoad={(event) => handleHeroImageLoad(heroImages[3], 3, event)}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  )}
                </>
              ) : (
                <div className="grid h-full place-items-center rounded-[16px] border border-dashed border-[#d8c8ae] bg-white/70 text-center shadow-sm">
                  <div>
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#002b18] text-[#d8a33d]">
                      <Image size={28} />
                    </div>
                    <p className="mt-4 font-serif text-[28px] text-[#002b18]">
                      Add gallery images
                    </p>
                    <p className="mt-2 text-sm text-[#657069]">
                      Upload photos from admin to fill this collage.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 py-7 md:px-10">
          <div className="flex flex-col gap-4 border-b border-[#ebe4d8] pb-5 lg:flex-row lg:items-center lg:justify-between">
            {categories.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold transition ${
                      activeCategory === category
                        ? "bg-[#101713] text-white shadow-[0_10px_22px_rgba(0,0,0,0.16)]"
                        : "bg-white text-[#4f5b54] ring-1 ring-[#ebe4d8] hover:text-[#002b18] hover:ring-[#d8a33d]"
                    }`}
                  >
                    {category === "All" ? <Grid3X3 size={14} /> : <Layers3 size={14} />}
                    {category}
                  </button>
                ))}
              </div>
            ) : (
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold text-[#002b18] ring-1 ring-[#ebe4d8]">
                <Grid3X3 size={14} />
                All
              </div>
            )}

            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold text-[#4f5b54] ring-1 ring-[#ebe4d8]"
            >
              Latest
              <ChevronDown size={14} />
            </button>
          </div>

          <div id="gallery-grid" className="pt-7">
            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div
                    key={item}
                    className="h-[310px] animate-pulse rounded-[12px] bg-[#eee6d8]"
                  />
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {filteredItems.map((item, index) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    style={{ aspectRatio: getGridRatio(item, index) }}
                    className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[12px] bg-white text-left shadow-sm ring-1 ring-[#ebe4d8] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,43,24,0.18)] hover:ring-[#d8a33d]"
                  >
                    <img
                      src={getImageSrc(item)}
                      alt={item.altText || item.title}
                      onLoad={(event) => handleGridImageLoad(item, index, event)}
                      className="h-full w-full object-contain transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {item.category && (
                        <span className="mb-2 inline-flex rounded-full bg-[#d8a33d] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#002b18]">
                          {item.category}
                        </span>
                      )}
                      <h3 className="font-serif text-[24px] leading-tight">{item.title}</h3>
                      {item.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/84">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-[16px] border border-dashed border-[#d8c8ae] bg-white py-16 text-center">
                <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#002b18] text-[#d8a33d]">
                  <Image size={28} />
                </div>
                <h3 className="font-serif text-[30px] text-[#002b18]">
                  Gallery images coming soon
                </h3>
                <p className="mx-auto mt-3 max-w-md text-[#657069]">
                  Add images from the admin gallery panel and they will appear here automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedItem && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#00180d]/90 p-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setSelectedItem(null)}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#002b18] shadow-lg transition hover:scale-105"
            aria-label="Close gallery preview"
          >
            <X size={22} />
          </button>

          <div className="grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[12px] bg-[#fffdf8] shadow-2xl lg:grid-cols-[1fr_360px]">
            <div className="grid bg-black">
              <img
                src={getImageSrc(selectedItem)}
                alt={selectedItem.altText || selectedItem.title}
                className="max-h-[92vh] w-full self-center object-contain"
              />
            </div>
            <div className="border-l border-[#eadfce] p-6">
              <p className="inline-flex rounded-full bg-[#f3e4c5] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-[#8a561d]">
                {selectedItem.category || "Gallery"}
              </p>
              <h3 className="mt-5 font-serif text-[34px] leading-tight text-[#002b18]">
                {selectedItem.title}
              </h3>
              {selectedItem.description ? (
                <p className="mt-4 leading-7 text-[#526057]">{selectedItem.description}</p>
              ) : (
                <p className="mt-4 leading-7 text-[#7a827c]">
                  A captured moment from the gallery collection.
                </p>
              )}
              <div className="mt-8 rounded-[8px] bg-[#f7f0e5] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#b7742c]">
                  Manovaidya Gallery
                </p>
                <p className="mt-2 text-sm leading-6 text-[#526057]">
                  Uploaded and managed through the admin gallery panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

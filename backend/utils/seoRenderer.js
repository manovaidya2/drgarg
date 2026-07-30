const SITE_URL = "https://drankushgarg.in";
const DEFAULT_IMAGE = `${SITE_URL}/sirimg.webp`;

const defaultSeo = {
  title: "Dr Ankush Garg | Ayurvedic Neurologist & Mental Health Expert",
  description:
    "Dr Ankush Garg is an Ayurvedic Neurologist and Mental Health Expert offering holistic Neuro-Ayurveda care for autism, ADHD, anxiety, depression, stress and neurological disorders.",
  keywords:
    "Dr Ankush Garg, Ayurvedic Neurologist, Neuro Ayurveda Doctor, Mental Health Ayurveda, Autism Ayurvedic Treatment, ADHD Ayurveda, Anxiety Treatment Ayurveda, Depression Ayurveda",
  canonical: `${SITE_URL}/`,
  image: DEFAULT_IMAGE,
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  type: "website",
};

export const staticSeo = {
  "/": defaultSeo,
  "/about": {
    title: "About Dr Ankush Garg | Ayurvedic Neurologist",
    description:
      "Learn about Dr Ankush Garg, founder of Manovaidya Neuro-Ayurveda Clinic, and his holistic approach to mental health, autism, ADHD and neurological care.",
    keywords:
      "About Dr Ankush Garg, Ayurvedic Neurologist, Manovaidya Clinic, Neuro Ayurveda specialist",
    canonical: `${SITE_URL}/about`,
  },
  "/blog": {
    title: "Neuro-Ayurveda & Mental Wellness Blog | Dr Ankush Garg",
    description:
      "Read expert insights from Dr Ankush Garg on Neuro-Ayurveda, mental wellness, autism, ADHD, anxiety, depression and holistic brain health.",
    keywords:
      "Neuro Ayurveda blog, mental wellness blog, autism Ayurveda, ADHD Ayurveda, anxiety Ayurveda, Dr Ankush Garg blog",
    canonical: `${SITE_URL}/blog`,
  },
  "/treatments": {
    title: "Ayurvedic Treatments | Dr Ankush Garg",
    description:
      "Explore Ayurvedic treatments by Dr Ankush Garg for stress, anxiety, digestive issues, skin disorders, arthritis, weight management and holistic wellness.",
    keywords:
      "Ayurvedic treatments, Dr Ankush Garg treatments, anxiety treatment, stress management, arthritis Ayurveda, digestive issues Ayurveda",
    canonical: `${SITE_URL}/treatments`,
  },
  "/appointment": {
    title: "Book Appointment | Dr Ankush Garg",
    description:
      "Book an appointment with Dr Ankush Garg for Ayurvedic neurology, mental wellness, autism, ADHD, stress, anxiety and holistic Neuro-Ayurveda care.",
    keywords:
      "Book appointment Dr Ankush Garg, Ayurvedacharya appointment, Neuro Ayurveda consultation",
    canonical: `${SITE_URL}/appointment`,
  },
  "/mindwellness": {
    title: "Mind Wellness Program | Dr Ankush Garg",
    description:
      "Discover Dr Ankush Garg's mind wellness approach for stress, anxiety, emotional balance, sleep, focus and holistic mental health through Ayurveda.",
    keywords:
      "mind wellness, Ayurvedic mental health, stress relief, anxiety care, emotional balance, Dr Ankush Garg",
    canonical: `${SITE_URL}/mindwellness`,
  },
  "/case-study": {
    title: "Patient Case Studies | Dr Ankush Garg",
    description:
      "Explore Neuro-Ayurveda case studies from Dr Ankush Garg covering holistic care for mental health, autism, ADHD and neurological concerns.",
    keywords:
      "Dr Ankush Garg case studies, Neuro Ayurveda case study, Ayurveda patient stories",
    canonical: `${SITE_URL}/case-study`,
  },
  "/media-coverage": {
    title: "Media Coverage | Dr Ankush Garg",
    description:
      "View media coverage, press mentions and public appearances of Dr Ankush Garg and Manovaidya Neuro-Ayurveda Clinic.",
    keywords:
      "Dr Ankush Garg media coverage, Manovaidya Clinic news, Ayurveda doctor press",
    canonical: `${SITE_URL}/media-coverage`,
  },
  "/gallery": {
    title: "Gallery | Dr Ankush Garg",
    description:
      "View images from Dr Ankush Garg's clinic, events, patient awareness programs and Neuro-Ayurveda wellness work.",
    keywords: "Dr Ankush Garg gallery, Manovaidya Clinic photos, Neuro Ayurveda clinic",
    canonical: `${SITE_URL}/gallery`,
  },
  "/neuro-ayurveda-system": {
    title: "Neuro-Ayurveda System | Dr Ankush Garg",
    description:
      "Understand Dr Ankush Garg's Neuro-Ayurveda system for brain, nervous system and mental wellness using holistic Ayurvedic principles.",
    keywords:
      "Neuro Ayurveda system, Ayurvedic neurology, brain health Ayurveda, Dr Ankush Garg",
    canonical: `${SITE_URL}/neuro-ayurveda-system`,
  },
  "/autism-adhd": {
    title: "Autism & ADHD Ayurvedic Care | Dr Ankush Garg",
    description:
      "Learn about Dr Ankush Garg's holistic Neuro-Ayurveda approach for autism, ADHD, child development, behavior, focus and family support.",
    keywords:
      "autism Ayurvedic treatment, ADHD Ayurveda, child development Ayurveda, Dr Ankush Garg autism ADHD",
    canonical: `${SITE_URL}/autism-adhd`,
  },
  "/child-development-care": {
    title: "Child Development Care | Dr Ankush Garg",
    description:
      "Holistic child development care by Dr Ankush Garg for focus, speech, behavior, learning, sensory needs, autism and ADHD support.",
    keywords:
      "child development care, autism support Ayurveda, ADHD child care, Dr Ankush Garg child development",
    canonical: `${SITE_URL}/child-development-care`,
  },
  "/adult-mental-health": {
    title: "Adult Mental Health Care | Dr Ankush Garg",
    description:
      "Ayurvedic mental health support for adults dealing with anxiety, stress, sleep issues, depression, burnout and emotional imbalance.",
    keywords:
      "adult mental health Ayurveda, anxiety Ayurveda, stress treatment, depression Ayurveda, Dr Ankush Garg",
    canonical: `${SITE_URL}/adult-mental-health`,
  },
  "/teenage-mental-health": {
    title: "Teenage Mental Health Care | Dr Ankush Garg",
    description:
      "Holistic Ayurvedic support for teenage mental health, stress, anxiety, focus, mood, emotional balance and behavioral concerns.",
    keywords:
      "teenage mental health Ayurveda, teen anxiety care, adolescent mental health, Dr Ankush Garg",
    canonical: `${SITE_URL}/teenage-mental-health`,
  },
  "/seniour-mental-health": {
    title: "Senior Mental Health Care | Dr Ankush Garg",
    description:
      "Ayurvedic mental health and neurological support for seniors, including sleep, memory, mood, anxiety and age-related wellness concerns.",
    keywords:
      "senior mental health Ayurveda, elderly mental wellness, memory care Ayurveda, Dr Ankush Garg",
    canonical: `${SITE_URL}/seniour-mental-health`,
  },
  "/testimonials": {
    title: "Patient Testimonials | Dr Ankush Garg",
    description:
      "Read patient testimonials and experiences from families who consulted Dr Ankush Garg for Neuro-Ayurveda and mental wellness care.",
    keywords:
      "Dr Ankush Garg testimonials, Manovaidya Clinic reviews, Neuro Ayurveda patient reviews",
    canonical: `${SITE_URL}/testimonials`,
  },
  "/testimonial-videos": {
    title: "Video Testimonials | Dr Ankush Garg",
    description:
      "Watch patient and family video testimonials about their experience with Dr Ankush Garg's Neuro-Ayurveda and mental wellness care.",
    keywords:
      "Dr Ankush Garg video testimonials, Manovaidya Clinic videos, patient experience Neuro Ayurveda",
    canonical: `${SITE_URL}/testimonial-videos`,
  },
  "/thank-you": {
    title: "Thank You | Dr Ankush Garg",
    description: "Thank you for contacting Dr Ankush Garg's clinic.",
    keywords: "Dr Ankush Garg thank you",
    canonical: `${SITE_URL}/thank-you`,
    robots: "noindex, nofollow",
  },
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const normalizePath = (path = "/") => {
  if (!path || path === "/") return "/";
  return path.replace(/\/$/, "");
};

const normalizeImage = (image) => {
  if (!image || String(image).startsWith("data:")) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(image)) return image;
  return `${SITE_URL}${String(image).startsWith("/") ? "" : "/"}${image}`;
};

export const mergeSeo = (seo = {}) => ({
  ...defaultSeo,
  ...seo,
  image: normalizeImage(seo.image || defaultSeo.image),
});

export const getStaticSeo = (path) => mergeSeo(staticSeo[normalizePath(path)] || {
  title: "Page Not Found | Dr Ankush Garg",
  description: "The requested page could not be found on Dr Ankush Garg's website.",
  canonical: `${SITE_URL}${normalizePath(path)}`,
  robots: "noindex, nofollow",
});

export const renderHtmlWithSeo = (html, seoInput) => {
  const seo = mergeSeo(seoInput);
  const headTags = `
  <title>${escapeHtml(seo.title)}</title>
  <meta name="description" content="${escapeHtml(seo.description)}" />
  <meta name="keywords" content="${escapeHtml(seo.keywords)}" />
  <meta name="robots" content="${escapeHtml(seo.robots)}" />
  <link rel="canonical" href="${escapeHtml(seo.canonical)}" />
  <meta property="og:title" content="${escapeHtml(seo.title)}" />
  <meta property="og:description" content="${escapeHtml(seo.description)}" />
  <meta property="og:type" content="${escapeHtml(seo.type)}" />
  <meta property="og:url" content="${escapeHtml(seo.canonical)}" />
  <meta property="og:image" content="${escapeHtml(seo.image)}" />
  <meta property="og:image:secure_url" content="${escapeHtml(seo.image)}" />
  <meta property="og:image:alt" content="${escapeHtml(seo.title)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${escapeHtml(seo.canonical)}" />
  <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
  <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
  <meta name="twitter:image" content="${escapeHtml(seo.image)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(seo.title)}" />
`;

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']keywords["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:(title|description|type|url|image|image:secure_url|image:alt)["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:(card|url|title|description|image|image:src|image:alt)["'][^>]*>\s*/gi, "")
    .replace(/<head>/i, `<head>${headTags}`);
};

const cleanStaticSeoTags = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']keywords["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:(title|description|type|url|image|image:secure_url|image:alt)["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:(card|url|title|description|image|image:src|image:alt)["'][^>]*>\s*/gi, "");

const serializeJson = (value = {}) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

export const renderHtmlWithSsr = (html, { appHtml, head, initialData }) =>
  cleanStaticSeoTags(html)
    .replace(/<head>/i, `<head>\n${head || ""}`)
    .replace(
      /<div\s+id=["']root["']\s*><\/div>/i,
      `<div id="root">${appHtml || ""}</div>`
    )
    .replace(
      "</body>",
      `<script>window.__INITIAL_DATA__=${serializeJson(initialData)};</script>\n</body>`
    );

export const siteUrl = SITE_URL;

import CaseStudy from "../models/CaseStudy.js";

const getImageUrl = (req, slug) =>
  `${req.protocol}://${req.get("host")}/api/case-studies/${encodeURIComponent(
    slug
  )}/image`;

/* ✅ CREATE CASE STUDY */
export const createCaseStudy = async (req, res) => {
  try {
    const { title, slug, shortDescription, image, content, faqs } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await CaseStudy.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    const caseStudy = await CaseStudy.create({
      title,
      slug,
      shortDescription,
      image,
      content,
      faqs: faqs || [],
    });

    res.status(201).json({
      success: true,
      message: "Case Study created successfully",
      data: caseStudy,
    });
  } catch (error) {
    console.error("Create CaseStudy Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ✅ GET ALL CASE STUDIES */
export const getAllCaseStudies = async (req, res) => {
  try {
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    const data = await CaseStudy.find()
      .select("title slug shortDescription createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();
    const rowsWithImages = await CaseStudy.find({
      image: { $type: "string", $ne: "" },
    })
      .select("_id")
      .lean();
    const imageIds = new Set(rowsWithImages.map((item) => String(item._id)));

    res.json(
      data.map((caseStudy) => ({
        ...caseStudy,
        hasImage: imageIds.has(String(caseStudy._id)),
        image: imageIds.has(String(caseStudy._id))
          ? getImageUrl(req, caseStudy.slug)
          : null,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCaseStudyImage = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug })
      .select("image")
      .lean();
    const image = caseStudy?.image;

    if (!image) {
      return res.status(404).end();
    }

    if (/^https?:\/\//i.test(image)) {
      return res.redirect(image);
    }

    const dataImage = image.match(/^data:([^;]+);base64,(.+)$/s);
    if (dataImage) {
      res.set("Cache-Control", "public, max-age=2592000, immutable");
      res.type(dataImage[1]);
      return res.send(Buffer.from(dataImage[2], "base64"));
    }

    return res.redirect(image.startsWith("/") ? image : `/${image}`);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ✅ GET SINGLE CASE STUDY BY SLUG */
export const getCaseStudyBySlug = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    const caseStudy = await CaseStudy.findOne({ slug })
      .select("title slug shortDescription faqs createdAt updatedAt")
      .lean();
    if (!caseStudy) {
      return res.status(404).json({ message: "Case Study not found" });
    }
    const hasImage = Boolean(
      await CaseStudy.exists({ slug, image: { $type: "string", $ne: "" } })
    );
    res.set("Cache-Control", "public, max-age=120, stale-while-revalidate=600");
    res.json({
      ...caseStudy,
      hasImage,
      image: hasImage ? getImageUrl(req, caseStudy.slug) : null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCaseStudyContent = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({
      slug: req.params.slug.toLowerCase(),
    })
      .select("content")
      .lean();
    if (!caseStudy) {
      return res.status(404).json({ message: "Case Study not found" });
    }
    res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=1800");
    return res.json({ content: caseStudy.content || "" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCaseStudyById = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id).lean();
    if (!caseStudy) {
      return res.status(404).json({ message: "Case Study not found" });
    }
    return res.json(caseStudy);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* ✅ DELETE CASE STUDY */
export const deleteCaseStudy = async (req, res) => {
  try {
    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Case Study deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ✅ UPDATE CASE STUDY */
export const updateCaseStudy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, shortDescription, image, content, faqs } = req.body;

    // Check if case study exists
    const caseStudy = await CaseStudy.findById(id);
    if (!caseStudy) {
      return res.status(404).json({ message: "Case Study not found" });
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== caseStudy.slug) {
      const exists = await CaseStudy.findOne({ slug, _id: { $ne: id } });
      if (exists) {
        return res.status(400).json({ message: "Slug already exists" });
      }
    }

    // Update case study
    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        shortDescription,
        image,
        content,
        faqs: faqs || [],
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Case Study updated successfully",
      data: updatedCaseStudy,
    });
  } catch (error) {
    console.error("Update CaseStudy Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

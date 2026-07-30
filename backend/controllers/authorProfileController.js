import AuthorProfile from "../models/AuthorProfile.js";

export const DEFAULT_AUTHOR_PROFILE = {
  key: "dr-ankush-garg",
  name: "Dr. Ankush Garg",
  title: "Ayurvedacharya",
  credentials: "BAMS, MPH, PhD Research · Ayurvedacharya",
  biography:
    "Dr. Ankush Garg is an Ayurvedacharya, Founder of Manovaidya and developer of the Neuro-Ayurveda Development System. He has 7+ years of focused experience in child development and mental wellness. His ongoing PhD research explores the relationship between the gut–brain axis, behaviour and emotional wellbeing.",
  profileUrl: "https://drankushgarg.in/about",
  image: "https://drankushgarg.in/images/dr-ankush-garg.webp",
  email: "contact@drankushgarg.in",
  phone: "",
};

export const getCentralAuthorProfile = async () => {
  const profile = await AuthorProfile.findOneAndUpdate(
    { key: DEFAULT_AUTHOR_PROFILE.key },
    { $setOnInsert: DEFAULT_AUTHOR_PROFILE },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();

  return profile || DEFAULT_AUTHOR_PROFILE;
};

export const getAuthorProfile = async (req, res) => {
  try {
    const profile = await getCentralAuthorProfile();
    res.json(profile);
  } catch (error) {
    console.error("getAuthorProfile error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAuthorProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "title",
      "credentials",
      "biography",
      "profileUrl",
      "image",
      "email",
      "phone",
    ];

    const update = allowedFields.reduce((fields, key) => {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        fields[key] = req.body[key];
      }
      return fields;
    }, {});

    const profile = await AuthorProfile.findOneAndUpdate(
      { key: DEFAULT_AUTHOR_PROFILE.key },
      {
        $set: {
          ...update,
          key: DEFAULT_AUTHOR_PROFILE.key,
        },
        $setOnInsert: DEFAULT_AUTHOR_PROFILE,
      },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();

    res.json(profile);
  } catch (error) {
    console.error("updateAuthorProfile error:", error);
    res.status(500).json({ message: error.message });
  }
};

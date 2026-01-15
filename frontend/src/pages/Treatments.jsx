const treatments = [
  "Skin Disorders",
  "Digestive Issues",
  "Joint Pain & Arthritis",
  "Stress & Anxiety",
  "Weight Management",
];

export default function Treatments() {
  return (
    <div className="bg-secondary py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 text-primary">
          Our Treatments
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {treatments.map((t, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold">{t}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

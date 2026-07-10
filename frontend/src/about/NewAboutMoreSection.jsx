import React from "react";
import { BookOpen, Heart, Leaf, Sprout, UserRound, UsersRound } from "lucide-react";

const items = [
  { icon: Leaf, title: "Holistic Healer", text: "Believes in treating the root cause, not just the symptoms." },
  { icon: UserRound, title: "Patient-Centric Care", text: "Every treatment plan is personalized for each individual." },
  { icon: BookOpen, title: "Lifelong Learner", text: "Continuously updates knowledge and integrates modern insights." },
  { icon: Sprout, title: "Ayurveda Advocate", text: "Works towards reviving authentic Ayurveda for modern times." },
  { icon: UsersRound, title: "Empowering Communities", text: "Committed to spreading awareness and building healthier communities." },
  { icon: Heart, title: "Driven by Purpose", text: "Passionate about transforming lives through natural healing." },
];

export default function NewAboutMoreSection() {
  return (
    <section className="bg-white px-5 pb-14 pt-5 sm:px-8 lg:px-12">
      <div className="mx-auto ">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-[27px] font-semibold text-[#075640]">
            More About Dr. Ankush Garg
          </h2>
          <span className="mx-auto mt-3 block h-px w-20 bg-[#075640]" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex min-h-[132px] items-center gap-6 rounded-[8px] border border-[#e4e3da] bg-white p-6 shadow-sm"
              >
                <Icon className="shrink-0 text-[#075640]" size={42} strokeWidth={1.5} />
                <div>
                  <h3 className="text-[16px] font-bold text-[#075640]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] font-medium leading-[1.65] text-[#4c5b55]">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

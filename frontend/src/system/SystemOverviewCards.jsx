import React from "react";
import { Compass, HelpCircle, ShieldAlert } from "lucide-react";
import familyImg from "../images/family-consultation-neuro-ayurveda.png";

const whySystemPoints = [
  "Different children with autism can have various needs for support with their development.",
  "Children with Attention Deficit Hyperactivity Disorder may show a variety of behavioural and emotional self-regulation concerns.",
  "Adults with anxiety may have different symptoms of stress, sleep issues, and a variety of emotional concerns.",
  "Behavioural issues in a child can be associated with sensory, communication, and emotional self-regulation challenges.",
];

const impressionPoints = [
  {
    label: "Symptoms Only Approach",
    text: "This is where the focus is solely on the child or individual's behavior, attention, anxiety, or speech and ignores the overall development and the picture of their wellbeing.",
  },
  {
    label: "Uneven Support",
    text: "This is when parents receive a variety of supports and instructions but with no clear direction.",
  },
  {
    label: "Generalized Support",
    text: "This is when no attempt is made to ensure that the child's specific needs are addressed due to a generalized approach.",
  },
  {
    label: "Limited Family Guidance",
    text: "Families need a lot more support and practical information beyond the theory.",
  },
  {
    label: "Short-Term Focus",
    text: "The majority of concerns need long-term support and the focus of development and emotions should not be based on a time-limited frame.",
  },
];

const confusionPoints = [
  "A more structured and focused system",
  "An approach that understands the individual",
  "Support that is not based only on apparent symptoms",
  "Clarity for families who feel confused by labels and reports",
  "A framework that is not a generalized approach",
];

export default function SystemOverviewCards() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-[16px] border border-[#e5e2d9] bg-[#fbfaf6] p-6 shadow-[0_10px_28px_rgba(5,54,39,0.05)] md:p-7">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[#edf6ef] text-[#075640]">
              <Compass size={20} />
            </div>
            <h2 className="mb-3 text-[18px] font-bold leading-snug text-[#075640]">
              Why The System Was Created
            </h2>
            <p className="mb-4 text-[14px] font-medium leading-[1.7] text-[#45544e]">
              Based on his experience working with children, adults, and
              families, Dr. Ankush Garg noticed how many people received
              labels, reports, or generalized recommendations, but how few
              understood what was the cause of their concern.
            </p>
            <p className="mb-3 text-[13.5px] font-bold leading-[1.6] text-[#075640]">
              For example:
            </p>
            <ul className="space-y-2.5">
              {whySystemPoints.map((point) => (
                <li key={point} className="flex gap-2.5 text-[13.5px] font-semibold leading-[1.55] text-[#273931]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8b46a]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-[#e9e5dc] pt-4 text-[13.5px] font-medium italic leading-[1.6] text-[#5b6962]">
              These examples highlight the need for a more complex and
              structured approach to understand the individual, not just the
              symptoms that are apparent.
            </p>
          </div>

          <div className="rounded-[16px] border border-[#e5e2d9] bg-[#fbfaf6] p-6 shadow-[0_10px_28px_rgba(5,54,39,0.05)] md:p-7">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[#eef5fb] text-[#3b7491]">
              <HelpCircle size={20} />
            </div>
            <h2 className="mb-3 text-[18px] font-bold leading-snug text-[#075640]">
              Problems with Common Approaches
            </h2>
            <p className="mb-4 text-[14px] font-medium leading-[1.7] text-[#45544e]">
              Many families feel frustrated because they are only informed of
              the child or individual's diagnosis without any information as to
              why they feel the child or individual struggles in daily life.
            </p>
            <p className="mb-3 text-[13.5px] font-bold leading-[1.6] text-[#075640]">
              This often leads to missed opportunities like:
            </p>
            <ul className="space-y-3">
              {impressionPoints.map((item) => (
                <li key={item.label} className="text-[13.5px] leading-[1.6]">
                  <span className="font-bold text-[#075640]">{item.label}: </span>
                  <span className="font-medium text-[#45544e]">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[16px] border border-[#e5e2d9] bg-[#fbfaf6] p-6 shadow-[0_10px_28px_rgba(5,54,39,0.05)] md:p-7">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[#fbf3e6] text-[#b27728]">
              <ShieldAlert size={20} />
            </div>
            <h2 className="mb-3 max-w-none text-[18px] font-bold leading-snug text-[#075640] lg:max-w-[220px]">
              What The System Seeks To Provide
            </h2>
            <p className="mb-4 max-w-none text-[14px] font-medium leading-[1.7] text-[#45544e] lg:max-w-[230px]">
              The Neuro-Ayurveda Development System&trade; was designed to
              incorporate this approach.
            </p>
            <ul className="max-w-none space-y-2.5 lg:max-w-[230px]">
              {confusionPoints.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[#273931]">
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#b27728]/15 text-[10px] text-[#b27728]">
                    !
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-none border-t border-[#eadfcd] pt-4 text-[13.5px] font-medium italic leading-[1.6] text-[#5b6962] lg:max-w-[230px]">
              Neuro-Ayurveda Development System&trade; seeks to provide the
              opposite of the above, a more structured and focused system that
              is not a generalized approach.
            </p>

            <img
              src={familyImg}
              alt="Family seeking guidance"
              className="pointer-events-none absolute -bottom-4 -right-8 hidden h-[190px] w-[190px] rounded-full object-cover opacity-90 sm:block"
              style={{ maskImage: "radial-gradient(circle, black 55%, transparent 78%)", WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 78%)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

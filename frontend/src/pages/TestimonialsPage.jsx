import React from "react";
import { Helmet } from "react-helmet-async";
import { Quote, ArrowRight, Star } from "lucide-react";
import ConsultationPopup from "../components/ConsultationPopup";
import { useState } from "react";
import { GlobalSEO } from "../components/SEOProvider";

export default function TestimonialsPage() {
  const [openPopup, setOpenPopup] = useState(false);
  
  const testimonials = [
    {
      message:
        "Mere child mein eye contact ki problem thi aur behaviour bhi kaafi different tha. Humne kaafi doctors aur therapies try ki, lekin long-term growth nahi ho rahi thi. Manovaidya mein holistic approach ke saath treatment start hua, aur kuch months mein eye contact, behaviour aur engagement mein noticeable improvement dikhi.",
      name: "Rajivkumar Raut",
      role: "Autism Care",
    },
    {
      message:
        "Meri cousin ko jerking movements aur seizures hote the, jiske baad wo confused aur thaki hui feel karti thi. Daily routine, school aur ghar ke kaam manage karna mushkil ho gaya tha. Manovaidya ke guidance se hume condition ko samajhne aur treatment direction milne mein help hui.",
      name: "Bulbul Singh",
      role: "Seizure Support",
    },
    {
      message:
        "Meri beti bahut hyperactive thi aur hume bataya gaya tha ki usse ADHD hai. Pehle treatment se zyada improvement nahi aa rahi thi. Manovaidya se treatment start karne ke baad dheere-dheere behaviour balanced hua, wo shant baith kar activities karne lagi.",
      name: "Jatin Kumar Sanjowa",
      role: "ADHD Care",
    },
    {
      message:
        "Mera beta 15 saal ka hai aur usse sleep disorder tha. Raat mein sone mein problem, din mein irritability aur thakan hoti thi. Manovaidya ke treatment se 2-3 months mein improvement dikhne lagi, ab beta calm aur confident feel karta hai.",
      name: "Vikash Pandey",
      role: "Sleep Disorder",
    },
    {
      message:
        "My 17 year old daughter was suffering from anxiety, mood swings and overthinking. As parents, hum samajh nahi pa rahe the ki problem kya hai. We tried many things and consulted doctors, but Manovaidya ne hume better direction aur support diya.",
      name: "Monu Singh",
      role: "Teen Mental Health",
    },
    {
      message:
        "Hamara beta pehle na achhe se eye contact karta tha aur na respond karta tha. School mein teachers bhi bolte the ki baccha participate nahi karta. Kaafi therapies try ki, but result zero tha. Manovaidya se treatment start karne ke baad positive changes dikhne lage.",
      name: "Pushkarnath Patel",
      role: "Child Development",
    },
    {
      message:
        "Humein pata chala ki hamare 4 saal ke bete ko autism spectrum hai, aur eye contact aur response ka issue badh raha tha. Social media ke through Manovaidya ke baare mein pata chala aur treatment start karne ke baad progress dikhne lagi.",
      name: "Pawan Kumar Chaubey",
      role: "Autism Spectrum",
    },
    {
      message:
        "Autism ka samna karna aasaan nahi tha. Har din ek struggle tha. Yahan aane ke baad pehli baar laga ki koi hume samajhta hai. Doctor treatment ke saath parents ko mentally support bhi karte hain. Eye contact, behaviour aur understanding mein jo badlaav aaye, wo priceless hain.",
      name: "Rinkiii",
      role: "Autism Care",
    },
    {
      message:
        "Overthinking aur low motivation meri life ka part ban gaye the. Manovaidya ke personalized plan se ab main zyada productive aur positive feel karta hoon. Therapy aur Ayurveda ka combination meri life kaafi better bana diya hai.",
      name: "Manisha Bhatia",
      role: "Mental Wellness",
    },
    {
      message:
        "Meri beti loud sounds aur bright lights se easily disturb ho jati thi aur social interaction mein problem hoti thi. Pehle kaafi therapies try ki, lekin khaas result nahi mila. Manovaidya mein treatment shuru karne ke baad improvement dikhna start hua.",
      name: "Prem Sha",
      role: "Sensory Concerns",
    },
    {
      message:
        "Dr. Ankush Garg is a good mind growth doctor. Treatment phase by phase hota hai according to child, aur consultation style bhi achha hai. Unhone hume samjhaya ki apne child ke liye kya karna chahiye.",
      name: "Soman Sharma",
      role: "Child Growth",
    },
    {
      message:
        "I had a great experience taking treatment from Manovaidya. Mere bacche ke behaviour mein kaafi improvement dikhi hai. Thanks to Doctor Ankush Garg.",
      name: "Rohit Raikwar",
      role: "Behaviour Support",
    },
    {
      message:
        "Maine Dr. Ankush Garg ji ki video online dekhi thi aur phir mere hyperactive bacche ke liye consult kiya. Consultation mein meri baat properly suni gayi aur solution ko clearly explain kiya gaya.",
      name: "Khalida Khan",
      role: "Hyperactivity Support",
    },
    {
      message:
        "Autism ke liye treatment dhoondhna easy nahi tha, lekin yahan aane ke baad direction clear ho gayi. 6 months mein bacche mein speech, understanding aur behaviour mein solid progress dikhi. Doctor ka caring behaviour aur positive approach helpful raha.",
      name: "Mani Ram",
      role: "Autism Care",
    },
    {
      message:
        "Doctor ne hamesha patience se hamari baatein suni aur step by step guide diya. Bacche ki behaviour problems pehle se bahut kam ho gayi hain. Humko lagta hai ab baccha ek better track pe hai.",
      name: "Prenshu Singh",
      role: "Behaviour Support",
    },
    {
      message:
        "Whole team is very good in their response. They always support us whenever we need. Understanding and focus improved a lot in my child within a very short span of time. Thanks to the whole Manovaidya team for responding humbly and clearing all our doubts.",
      name: "Avipsa Mohanty",
      role: "Focus & Understanding",
    },
    {
      message:
        "Hamare bacche ko autism ke symptoms the aur hum bohot pareshaan the. Dr. Garg ne calmly har cheez explain ki, har question patiently suna. 2 months ki treatment ke baad baccha zyada eye contact karta hai aur respond bhi karta hai.",
      name: "Dinesh Arya",
      role: "Autism Care",
    },
    {
      message:
        "Jab humne treatment start kiya tha to hume pata nahi tha kya expect karein. Baccha na baithta tha na respond karta tha. Dheere-dheere routine aur therapies ne cheezein badli. 1 saal baad confidence, speech aur understanding ka level dekhkar dil khush ho jata hai.",
      name: "Kajal Rawat",
      role: "Child Development",
    },
    {
      message:
        "It was a wonderful experience with Dr. Ankush Garg. Before visiting his clinic I had many doubts about my child, but after meeting him he diagnosed my child appropriately and advised according to his mental condition.",
      name: "Dishita Mishra",
      role: "Child Consultation",
    },
    {
      message:
        "Mujhe Manovaidya ke baare mein Facebook ke through pata chala tha. Sir se consultation lekar bahut achha feel hua. Unhone bahut calmly hamari problem suni aur solution bataya.",
      name: "Vijay Kumar Maurya",
      role: "Consultation",
    },
    {
      message:
        "Before I started treatment here with Dr. Ankush, I used to believe that nothing could be done in autism after so many wasted efforts. The Ayurvedic treatment at Manovaidya changed my belief and showed remarkable improvements in my autistic child.",
      name: "Indu Bala",
      role: "Autism Care",
    },
    {
      message:
        "Dr. Ankush Garg's deep knowledge of Ayurveda and personalized approach to treatment have made a significant positive impact on my health and well-being. His attentive listening and thoughtful guidance helped me understand and manage my health better.",
      name: "Nitin Bansal",
      role: "Ayurvedic Care",
    },
    {
      message:
        "I had migraine pain, and after taking Ayurvedic medicines for migraine and headache I am much more relieved now. I also had acidity related issues, which are also better now. Thanks to Dr. Ankush Garg for personalized care.",
      name: "Seema Seema",
      role: "Migraine & Acidity",
    },
  ];

  // Breadcrumb Schema Data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://drankushgarg.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Testimonials",
        "item": "https://drankushgarg.in/testimonials"
      }
    ]
  };

  // Review Schema for Testimonials (Aggregate Rating)
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Dr. Ankush Garg - Neuro-Ayurveda System",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500+",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map((item, index) => ({
      "@type": "Review",
      "datePublished": "2024",
      "reviewBody": item.message,
      "author": {
        "@type": "Person",
        "name": item.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Google Business Profile"
/*  */      }
    }))
  };

  return (
    <>
      <GlobalSEO
        seo={{
          title: "Patient Testimonials | Dr. Ankush Garg",
          description:
            "Read patient and family testimonials about Dr. Ankush Garg's Neuro-Ayurveda approach for autism, anxiety, emotional health, and long-term mental wellness.",
          keywords:
            "Dr Ankush Garg reviews, patient testimonials, autism care testimonials, Neuro Ayurveda reviews, Manovaidya testimonials",
          canonical: "https://drankushgarg.in/testimonials",
          image: "https://drankushgarg.in/og-image.jpg",
        }}
      />

      {/* Breadcrumb Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(aggregateRatingSchema)}
        </script>
      </Helmet>

      {/* Visible Breadcrumb Navigation */}
      <nav className="w-full bg-[#fbfaf6] pt-6 px-4 sm:px-6 lg:px-10" aria-label="Breadcrumb">
        <div className="mx-auto">
          <ol className="flex flex-wrap items-center gap-2 text-[#5d625b] text-sm">
            <li className="flex items-center">
              <a href="/" className="hover:text-[#d98923] transition-colors">
                Home
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#b9cac1]">/</span>
              <span className="text-[#002b18] font-medium">Testimonials</span>
            </li>
          </ol>
        </div>
      </nav>

      <div className="bg-white">
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden bg-[#fbfaf6]">
          <div className="absolute -top-20 -right-20 h-[220px] w-[220px] rounded-full bg-[#eadfca]/40 blur-2xl" />

          <div className="mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 md:pt-12 pb-10 sm:pb-12 md:pb-14">
            <div className="max-w-[850px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c8d5cf] bg-white/70 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d8a63b]" />
                <span className="text-[#003f26] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.25em]">
                  Testimonials
                </span>
              </div>

              <h1 className="mt-5 font-serif text-[#003f26] text-[30px] sm:text-[38px] md:text-[44px] lg:text-[50px] leading-[1.05] tracking-[-0.025em]">
                Stories of Clarity, Progress & Trust
              </h1>

              <p className="mt-4 max-w-[720px] text-[#36454f] text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65]">
                What families and patients say after experiencing the
                Neuro-Ayurveda System.
              </p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="w-full bg-[#f6f4ef] py-10 sm:py-12 md:py-10">
          <div className="mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9">
              {testimonials.map((item, index) => (
                <article
                  key={index}
                  className="group bg-[#fffefa] border border-[#ddd8ce] rounded-[22px] px-7 sm:px-9 md:px-7 lg:px-8 py-5 sm:py-11 md:py-5 min-h-[250px] shadow-[0_18px_45px_rgba(20,35,28,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(20,35,28,0.10)]"
                >
                  <Quote
                    size={36}
                    strokeWidth={2.3}
                    className="text-[#dda63b] fill-none mb-7"
                  />

                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2" aria-label="4.9 out of 5 star rating">
                      <span className="text-[14px] font-bold text-[#1f3f38]">4.9</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className="fill-[#fbbc04] text-[#fbbc04]"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="rounded-full border border-[#dfe5f2] bg-white px-3 py-1 text-[11px] font-bold shadow-sm">
                      <span className="text-[#4285f4]">G</span>
                      <span className="text-[#ea4335]">o</span>
                      <span className="text-[#fbbc04]">o</span>
                      <span className="text-[#4285f4]">g</span>
                      <span className="text-[#34a853]">l</span>
                      <span className="text-[#ea4335]">e</span>
                      <span className="ml-1 text-[#4b5563]">Review</span>
                    </span>
                  </div>

                  <p className="font-serif text-[#071f1b] text-[18px] sm:text-[20px] lg:text-[16px] leading-[1.65] tracking-[-0.018em]">
                    “{item.message}”
                  </p>

                  <p className="mt-8 text-[#1f3f38] text-[16px] sm:text-[16px] leading-relaxed font-medium">
                    — {item.name}
                    {item.role ? `, ${item.role}` : ""}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="w-full bg-[#f6f4ef] px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <div className="mx-auto max-w-[1600px] rounded-[22px] bg-gradient-to-r from-[#004225] via-[#053f24] to-[#1f5027] px-6 sm:px-10 lg:px-16 py-10 sm:py-12 lg:py-14">
            <div className="max-w-[700px]">
              <h2 className="font-serif text-white text-[26px] sm:text-[32px] lg:text-[36px] leading-[1.2] tracking-[-0.02em]">
                Talk to Our Team
              </h2>

              <p className="mt-4 text-white/90 text-[15px] sm:text-[17px] lg:text-[18px] leading-relaxed font-medium">
                Begin your own story of clarity with a structured first consultation.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setOpenPopup(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e86f2d] px-6 py-3 text-white text-[14px] sm:text-[15px] font-semibold transition-all duration-300 hover:bg-[#d96122]"
                >
                  Talk to Our Team
                  <ArrowRight size={18} strokeWidth={2.2} />
                </button>

                <a
                  href="/system"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-white text-[14px] sm:text-[15px] font-semibold transition-all duration-300 hover:bg-white/10"
                >
                  Explore the System
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <ConsultationPopup
          isOpen={openPopup}
          onClose={() => setOpenPopup(false)}
        />
      </div>
    </>
  );
}

import { ExternalLink, Newspaper } from "lucide-react";

const mediaLinks = [
  { name: "DailyHunt", url: "http://m.dailyhunt.in/news/india/english/r+news+india-epaper-dhfacc36dfce9c4bb68db0e89d033c921b/how+dr+ankush+garg+is+redefining+autism+care+in+india+through+ayurveda-newsid-dhfacc36dfce9c4bb68db0e89d033c921b_41ad9760abf811f0bf6f3a0cab15bd8f?sm=Y" },
  { name: "Republic News India", url: "https://republicnewsindia.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Flipboard", url: "https://flipboard.com/@republicnewsind/-how-dr-ankush-garg-is-redefining-autism/a-i80hUB8RRhGSXe5ySX5QOA%3Aa%3A3544623556-0097b8ce16%2Frepublicnewsindia.com" },
  { name: "The Indian Bulletin", url: "https://theindianbulletin.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "RD Times", url: "https://rdtimes.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Abhyuday Times", url: "https://abhyudaytimes.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Hindustan Saga", url: "https://hindustansaga.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Let India Shine", url: "https://letindiashine.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Indian Scoops", url: "https://indianscoops.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "News Outlook", url: "https://news-outlook.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Times Bulletin", url: "https://times-bulletin.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Indian Sentinel", url: "https://indiansentinel.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "National Age", url: "https://nationalage.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "India Thrive", url: "https://indiathrive.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Prevalent India", url: "https://prevalentindia.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "The Fortune India", url: "https://thefortuneindia.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Pioneer News", url: "https://pioneernews.co.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "India Influencive", url: "https://indiainfluencive.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Bharat Herald", url: "https://bharatherald.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Youth News Express", url: "https://youthnewsexpress.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "The Telegraph News", url: "https://thetelegraphnews.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "News Mint 24", url: "https://newsmint24.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Press Journal", url: "https://press-journal.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "News Head", url: "https://newshead.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "India News 24", url: "https://indianews24.co/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "RKD Live", url: "https://rkdlive.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "The National Reader", url: "https://thenationalreader.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Scroll News", url: "https://scrollnews.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Country First", url: "https://countryfirst.co.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "News Streamline", url: "https://newsstreamline.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Metro City News", url: "https://metrocitynews.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Gujarat Journal", url: "https://gujaratjournal.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "My Maharashtra", url: "https://mymaharashtra.co.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Telangana Post", url: "https://telanganapost.co.in/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" },
  { name: "Bharat Mirror", url: "https://english.bharatmirror.com/how-dr-ankush-garg-is-redefining-autism-care-in-india-through-ayurveda/" }
];

export default function MediaCoverage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#8b43ba] mb-4">
            Media Coverage
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            How Dr. Ankush Garg is redefining autism care in India through Ayurveda,
            featured across leading national and digital media platforms.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaLinks.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-6 shadow border
                         hover:shadow-xl transition flex flex-col justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 text-[#8b43ba] p-3 rounded-xl shrink-0">
                  <Newspaper />
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-800 group-hover:text-[#8b43ba] transition">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Published feature on autism care through Ayurveda
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end mt-4 text-sm font-medium text-[#8b43ba]">
                Read Article <ExternalLink size={16} className="ml-1" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Want to consult or know more about our holistic autism care approach?
          </p>
          <a
            href="/appointment"
            className="inline-block bg-[#8b43ba] text-white px-8 py-3 rounded-xl shadow hover:bg-[#7a38a6] transition"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </section>
  );
}

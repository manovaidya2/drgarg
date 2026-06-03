import { Helmet } from "react-helmet-async";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <>
      <Helmet>
        <title>Thank You | Dr. Ankush Garg</title>
        <meta
          name="description"
          content="Thank you for reaching out to Dr. Ankush Garg. Your request has been received and our team will contact you shortly."
        />
      </Helmet>

      <section className="min-h-[calc(100vh-260px)] bg-[radial-gradient(circle_at_top,_rgba(216,137,35,0.14),_transparent_45%),_linear-gradient(180deg,_#f8f6f1,_#ffffff)] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-[#d7d1c7] bg-white/95 p-10 shadow-[0_30px_90px_rgba(38,55,43,0.08)] sm:p-14">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#d8a63b]/15 text-[#d98923] shadow-md">
                <CheckCircle className="h-12 w-12" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-[#7c6d55]">Thank you</p>
                <h1 className="mt-4 text-4xl font-serif tracking-tight text-[#0b3b2e] sm:text-5xl">
                  Your request is on its way.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#4d5f55] sm:text-lg">
                  We have received your consultation request and our team will contact you soon to confirm the next steps. Meanwhile, you can explore our services or book another consultation.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 w-full">
                <div className="rounded-3xl border border-[#e4ded2] bg-[#f9f7f1] p-5 text-left">
                  <p className="text-sm font-semibold text-[#2b3b2e]">What happens next</p>
                  <p className="mt-3 text-sm leading-6 text-[#5f6f63]">
                    Our care team reviews your details and reaches out within 24 hours.
                  </p>
                </div>
                <div className="rounded-3xl border border-[#e4ded2] bg-[#f9f7f1] p-5 text-left">
                  <p className="text-sm font-semibold text-[#2b3b2e]">Prepare for the call</p>
                  <p className="mt-3 text-sm leading-6 text-[#5f6f63]">
                    Please keep your preferred consultation time and any medical questions ready.
                  </p>
                </div>
                <div className="rounded-3xl border border-[#e4ded2] bg-[#f9f7f1] p-5 text-left">
                  <p className="text-sm font-semibold text-[#2b3b2e]">Need support now?</p>
                  <p className="mt-3 text-sm leading-6 text-[#5f6f63]">
                    Call us at <a href="tel:+917823838638" className="font-medium text-[#d98923]">07823 838638</a> for urgent assistance.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full border border-[#d98923] bg-white px-8 py-3 text-sm font-semibold text-[#0b3b2e] transition hover:bg-[#faf4e8]"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center rounded-full bg-[#d98923] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#c77b1d]"
                >
                  Book another consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

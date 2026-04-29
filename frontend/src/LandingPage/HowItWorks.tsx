import { useNavigate } from "react-router-dom";
import Navbar from "../components/nav/Navbar";
import ScrollToTop from "../components/ScrollToTop";

interface Props {
  number?: string;
  title: string;
  desc?: string;
}

function Step({ number, title, desc }: Props) {
  return (
    <div className="text-center shadow-sm shadow-gray-700/70 p-6 rounded-xl">
      <div className="w-10 h-10 mx-auto rounded-full font-[ClashDisplay] text-xl bg-[#16A34A] flex items-center justify-center font-bold">
        {number}
      </div>
      <h3 className="mt-4 font-semibold text-lg font-[Montserrat]">{title}</h3>
      <p className="mt-2 text-xs text-gray-600 font-[Onest]">{desc}</p>
    </div>
  );
}

function FlowBox({ title }: Props) {
  return (
    <div className="bg-white font-[Montserrat] shadow-sm shadow-green-700 px-6 py-4 rounded-lg text-center w-full md:w-auto">
      {title}
    </div>
  );
}

function Arrow() {
  return (
    <div className="text-[#16A34A] text-2xl font-bold hidden md:block">→</div>
  );
}

function InfoCard({ title, desc }: Props) {
  return (
    <div className="bg-gray-300 border border-white/10 p-6 rounded-xl">
      <h3 className="font-semibold text-lg font-[Montserrat]">{title}</h3>
      <p className="mt-2 text-gray-700 text-sm font-[Onest]">{desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  // Imported the function from ScrollToTop Component
  ScrollToTop();

  const navigate = useNavigate();
  // bg-[#0B1F3A]
  // text-white
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-20 md:pt-30 p-6 md:p-4" data-aos="zoom-in">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-[Nunito]">How It Works</h1>
          <p className="mt-4 text-gray-700 font-[Unbounded] text-sm">
            From BN/RC number to ready-to-submit CAC Annual Return Form in under 4 minutes.
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-16 grid md:grid-cols-4 gap-8">
          <Step
            number="1"
            title="Enter BN/RC Number"
            desc="We securely fetch your business & company details directly from CAC records."
          />
          <Step
            number="2"
            title="Answer Simple Questions"
            desc="No legal jargon. Just plain English prompts anyone can understand."
          />
          <Step
            number="3"
            title="Smart Verification"
            desc="Our system checks for missing or incorrect information automatically."
          />
          <Step
            number="4"
            title="Download & Submit"
            desc="Get a fully formatted BN/07 or BN/06 PDF ready for submission instantly."
          />
        </div>

        {/* PROCESS FLOW VISUAL */}
        <section className="mt-20 bg-gray-300 rounded-xl p-10">
          <h2 className="text-2xl font-semibold text-center font-[Nunito]">
            The Simple Flow
          </h2>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
            <FlowBox title="Start" />
            <Arrow />
            <FlowBox title="Data Fetch" />
            <Arrow />
            <FlowBox title="Validation" />
            <Arrow />
            <FlowBox title="PDF Ready" />
          </div>
        </section>

        {/* WHY IT WORKS */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-semibold font-[Nunito]">
            Why This Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <InfoCard
              title="Automation"
              desc="We remove manual paperwork and automate repetitive steps."
            />
            <InfoCard
              title="Clarity"
              desc="Everything is explained in simple language anyone can follow."
            />
            <InfoCard
              title="Speed"
              desc="What normally takes hours or days now takes minutes."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-18 text-center  bg-green-950 border border-white/10 text-white p-10 rounded-xl">
          <h2 className="text-3xl font-bold font-[Nunito]">Ready to Try It?</h2>
          <p className="mt-3 font-[Onest] text-gray-300">
            Complete your filing in under 4 minutes.
          </p>

          <button
            className="mt-6 bg-[#15c054d5] text-white px-6 py-3 rounded-lg font-[ClashDisplay] tracking-wider"
            onClick={() => navigate("/authentication")}
          >
            Start Filing Now
          </button>
        </section>

        {/* FOOTER NOTE */}
        <p className="text-center text-gray-500 mt-12 text-sm">
          No stress. No lawyers. Just compliance made simple.
        </p>
      </div>
    </div>
  );
}

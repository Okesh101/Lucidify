import {FiX} from "react-icons/fi"
import {motion} from "framer-motion"
import Navbar from "../components/nav/Navbar"
import ScrollToTop from "../components/ScrollToTop"
import { useNavigate } from "react-router-dom"
type CardProps = {
    title: string,
    children: string
}
type ProbsData= {
    text: string
}

function Card({ title, children }: CardProps) {
  return (
    <div className="border border-green-900 p-6 rounded-xl">
      <h3 className="font-semibold text-lg font-[Montserrat]">{title}</h3>
      <p className="mt-2 text-gray-300 text-sm font-[Onest]">{children}</p>
    </div>
  );
}

const problem_data:ProbsData[] = [
    {text: "Many SMEs miss deadlines due to confusion"},
    {text: "Filing requires navigating complex CAC portals"},
    {text: "Legal assistance is expensive and slow"},
    {text: "Errors lead to penalties and delays"},

]


export default function About() {
  const navigate = useNavigate()
  // Imported the function from ScrollToTop Component
  ScrollToTop();


  return (
    <div className="min-h-screen bg-white ">

      <Navbar/>
      <div className="max-w-5xl mx-auto pt-30" data-aos="zoom-in">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-[Nunito]">About SME Compliance Fast-Track</h1>
          <p className="mt-4 text-gray-500 font-[Unbounded] text-sm">
            We make CAC compliance simple, fast, and stress-free for Nigerian SMEs.
          </p>
        </div>

        {/* MISSION */}
        <motion.section className="mt-16" 
          initial={{ x: 120, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <h2 className="text-2xl font-semibold font-[Nunito]">Our Mission</h2>
          <p className="mt-4 text-gray-500 leading-relaxed font-[ClashDisplay] tracking-wider">
            Filling your CAC Annual Return shouldn’t require lawyers, long queues, or confusing paperwork.
            Our mission is to eliminate friction in compliance by turning complex legal processes into
            simple, guided experiences that any business owner can complete in minutes.
          </p>
        </motion.section>

        {/* PROBLEM */}
        <motion.section className="mt-12"  
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3  }}
          viewport={{ once: false }}
        >
          <h2 className="text-2xl font-semibold font-[Nunito]">The Problem</h2>
          <ul className="mt-4 space-y-3 text-gray-500">
           {problem_data.map((item, index) => (
             <li className="flex items-center spcae-x-9" key={index}>
                <FiX size={30} className="text-red-400"/> 
                <span className="font-[ClashDisplay] tracking-wider">{item.text}</span>
            </li>
           ))}
          </ul>
        </motion.section>

        {/* SOLUTION */}
        <motion.section className="mt-12" 
          initial={{ x: 120, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3  }}
          viewport={{ once: false }}
        >
          <h2 className="text-2xl font-semibold font-[Nunito]">Our Solution</h2>
          <p className="mt-4 text-gray-500 leading-relaxed font-[Unbounded]">
            SME Compliance Fast-Track simplifies the entire process into a guided workflow:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card title="Auto Fetch">
              Enter your RC number and we pre-fill your company details instantly.
            </Card>
            <Card title="Guided Questions">
              Answer simple questions in plain English — no legal jargon.
            </Card>
            <Card title="Verified Output">
              Our system checks your data and generates a ready-to-submit PDF.
            </Card>
          </div>
        </motion.section>

        {/* WHY US */}
       <motion.section 
          className="rounded-xl shadow-sm shadow-green-950 mt-12 overflow-hidden" 
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3  }}
          viewport={{ once: false }}
        >
          <div className="border-b border-gray-800">
            <div className="p-6">
              <h2 className="text-2xl font-semibold font-[Nunito]">Why This Matters</h2>
              <p className="mt-4 text-gray-300 leading-relaxed font-[Onest]">
                Compliance is not optional — but it shouldn’t slow down your business.
                By removing complexity, we help SMEs stay compliant, avoid penalties,
                and focus on growth instead of paperwork.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <section className="flex-1 p-6">
              <div className=" text-gray-300">
              <h3 className="text-lg font-semibold mb-3 font-[Nunito]">
                Anti-Hallucination Guarantee
              </h3>

              <p className="mb-3 font-[Onest]">
                This tool NEVER generates legal text. All content comes from:
              </p>

              <ul className="list-disc pl-5 space-y-2 font-[Onest] ">
                <li>Pre-approved BN/06 PDF template (CAC official format)</li>
                <li>Validated field values from static legal dictionaries</li>
                <li>User-provided answers (converted to structured output)</li>
              </ul>
            </div>
            </section>

            {/* DIVIDER (only shows on desktop) */}
            <div className="hidden md:block w-px bg-gray-800"></div>

            <section className="flex-1 p-6">
            <div className=" text-gray-300">
              <h3 className="text-lg font-semibold mb-3 font-[Nunito]">Disclaimer</h3>

              <p className="font-[Onest]">
                This tool assists with form completion only. It does not provide
                legal advice. Users remain responsible for accuracy and timely
                submission to the Corporate Affairs Commission.
              </p>
            </div>
            </section>

          </div>

        </motion.section>
       

        {/* CTA */}
        <motion.section className="mt-16 text-center p-10" 
          initial={{ x: 120, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <h2 className="text-3xl font-bold font-[Nunito]">Ready to File Your Annual Return?</h2>
          <p className="mt-3 font-[Onest] text-gray-500">
            Start now and complete your filing in under 4 minutes.
          </p>

          <button className="mt-6 bg-[#16A34A] font-[ClashDisplay] tracking-wider text-white px-6 py-3 rounded-lg" onClick={() => navigate("/authentication")}>
            Start Filing
          </button>
        </motion.section>

        {/* FOOTER NOTE */}
        <p className="text-center text-gray-500 mt-12 text-sm">
          Built for Nigerian SMEs • Simplifying compliance, one form at a time
        </p>
      </div>
    </div>
  );
}

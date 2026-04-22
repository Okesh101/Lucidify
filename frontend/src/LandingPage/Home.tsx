// import Hero from "./assets/heroIMg.png"
import {motion} from 'framer-motion'

export default function LandingPage() {





  return (
    <div className="min-h-screen bg-linear-90 from-[#1250a1] via-[#013272] to-[#02326d] text-white font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-bold text-xl font-[Nunito] tracking-wider">
          ⚡ SME Compliance
        </div>
        <div className="flex gap-4 font-[ClashDisplay] tracking-wider">
          <button className="bg-[#15c054d5] px-8 py-2 rounded-lg cursor-pointer">Start Filing</button>
          <button className="border border-white/50 px-6 cursor-pointer py-2 rounded-lg">About</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid grid-cols-2 items-center min-h-screen px-10 w-full">
        <div className="flex-1">
            <h1 className="text-5xl font-bold font-[Unbounded] leading-tight">
            ONE FORM.<br />
            <span className="text-[#16A34A]">FOUR MINUTES.</span><br />
            ZERO LAWYERS.
            </h1>
            <p className="mt-7 text-gray-300 font-[Onest] max-w-2xl">File your CAC Annual Return in minutes — whether you’re a small business or a large organisation.</p>


            {/* INPUT */}
            <button className="mt-8 bg-[#15c054d5] px-8 py-2 rounded-lg cursor-pointer text-md font-[ClashDisplay]">
                Get Started →
            </button>
        </div>
        <motion.div 
            animate={{ y: [0, -10, 0], x: [-4, -20, 4] }}
            transition={{
                duration: 9,
                repeat: Infinity,
                // ease: "easeInOut"
                damping: 4,
                mass: 5
            }}
        >
            <img 
            src="../heroImg.png" 
            // className="w-full max-w-3xl h-3/3" 
            alt="hero" 
            />
        </motion.div>
            
      </section>

      {/* HOW IT WORKS */}
      {/* <section className="bg-white text-black py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <Step
              number="1"
              title="Enter RC Number"
              desc="We fetch your company data instantly"
            />
            <Step
              number="2"
              title="Answer Questions"
              desc="Simple, plain English questions"
            />
            <Step
              number="3"
              title="We Verify"
              desc="AI checks everything for accuracy"
            />
            <Step
              number="4"
              title="Download"
              desc="Get ready-to-submit PDF"
            />
          </div>
        </div>
      </section>

      TRUST SECTION
      <section className="py-16 text-center">
        <p className="text-gray-400">Trusted. Compliant. Built for SMEs.</p>

        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
          <span className="bg-white/10 px-4 py-2 rounded-lg">CAC Ready</span>
          <span className="bg-white/10 px-4 py-2 rounded-lg">Bank-grade Security</span>
          <span className="bg-white/10 px-4 py-2 rounded-lg">Hackathon Built</span>
          <span className="bg-white/10 px-4 py-2 rounded-lg">100% SME Focused</span>
        </div>
      </section>

      CTA FOOTER
      <section className="bg-[#16A34A] text-black text-center py-16 px-6">
        <h2 className="text-3xl font-bold">Done in Under 4 Minutes</h2>
        <p className="mt-4">No lawyers. No stress. Just compliance.</p>

        <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg">
          Start Filing Now
        </button>
      </section>

      FOOTER
      <footer className="text-center py-6 text-gray-500 text-sm">
        Built with ❤️ for Nigerian SMEs
      </footer> */}
    </div>
  );
}



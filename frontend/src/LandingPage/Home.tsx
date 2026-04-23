import {motion} from 'framer-motion'
import Navbar from '../components/nav/Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-90 from-[#1250a1] via-[#013272] to-[#02326d] text-white font-sans">
      {/* NAVBAR */}
     <Navbar/>

      {/* HERO */}
      <section className="grid grid-cols-2 items-center min-h-screen pt-18 px-10 w-full" data-aos= 'zoom-in'>
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
      </section> */}
    </div>
  );
}



import {motion} from 'framer-motion'
import Navbar from '../components/nav/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import { useNavigate } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';

export default function LandingPage() {

  // Imported the function from ScrollToTop Component
  ScrollToTop();

  const navigate = useNavigate()

//  bg-linear-90 from-[#1250a1] via-[#013272] to-[#02326d]
// text-gray-300
  return (
    <div className="min-h-screen bg-white font-sans">
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
            <p className="mt-7 text-black font-[Onest] max-w-2xl">File your CAC Annual Return in minutes — whether you’re a small business or a large organisation.</p>


            {/* INPUT */}
            <button className="mt-8 bg-[#15c054d5] px-8 py-2 rounded-lg cursor-pointer text-md font-[ClashDisplay]" onClick={() => navigate('/authentication')}>
                Get Started →
            </button>
        </div>
        {/* <motion.div 
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
        </motion.div> */}
        {/* <motion.div 
              className="absolute -right-6 top-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3"
              animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="bg-green-500 p-2 rounded-lg text-white">
                <FiShield size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Security</p>
                <p className="text-sm font-bold text-slate-800">Bank-level Encryption</p>
              </div>
            </motion.div>
             */}
             <motion.div 
              className="relative z-10"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                width="520"
                height="520"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl"
              >
                <defs>
                  <linearGradient id="mainGreen" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22C55E" />
                    <stop offset="100%" stopColor="#15803D" />
                  </linearGradient>

                  <linearGradient id="softBg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ECFDF5" />
                    <stop offset="100%" stopColor="#DCFCE7" />
                  </linearGradient>

                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#16A34A" floodOpacity="0.15"/>
                  </filter>
                </defs>

                {/* Background blob */}
                <circle cx="100" cy="100" r="80" fill="url(#softBg)" />

                {/* Document */}
                <rect x="60" y="40" width="80" height="110" rx="10" fill="white" filter="url(#shadow)" />
                
                {/* Fold */}
                <path d="M120 40L140 60H120V40Z" fill="#DCFCE7" />

                {/* Lines */}
                <rect x="70" y="70" width="60" height="4" rx="2" fill="#BBF7D0" />
                <rect x="70" y="85" width="50" height="4" rx="2" fill="#86EFAC" />
                <rect x="70" y="100" width="55" height="4" rx="2" fill="#4ADE80" />

                {/* Check badge */}
                <circle cx="140" cy="130" r="18" fill="url(#mainGreen)" />
                <path
                  d="M133 130L138 135L148 123"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Floating dot accents */}
                <circle cx="50" cy="60" r="3" fill="#22C55E" opacity="0.4" />
                <circle cx="160" cy="80" r="4" fill="#16A34A" opacity="0.3" />
                <circle cx="40" cy="140" r="2.5" fill="#15803D" opacity="0.4" />
              </svg>
            </motion.div>
      </section>
    </div>
  );
}



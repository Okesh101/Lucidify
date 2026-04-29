import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import useWindowSize from "../../hooks/useWindowSize";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  // bg-[#013272]
  const isMobile = width <= 780;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (isMobile) {
    console.log("nice");
  }
  return (
    <nav className="flex items-center  justify-between px-6 py-4 bg-white shadow-[#061e3b]/30 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2 font-bold text-xl font-[Nunito] tracking-wider">
        ⚡ SME Compliance
      </div>
      {/* Nav Links */}
      {!isMobile ? (
        <>
          <div className="flex space-x-9 font-[TypoHoop]">
            {/* NavItem for home */}
            <NavItem pathname="" linkname="Home" />

            {/* NavItem for how it works */}
            <NavItem pathname="how_it_works" linkname="How It Works" />

            {/* NavItem for about us */}
            <NavItem pathname="about" linkname="About Us" />
          </div>
          <button
            className="bg-[#15c054d5] text-white font-bold font-[ClashDisplay] tracking-wider  px-8 py-2 rounded-lg cursor-pointer"
            onClick={() => navigate("/authentication")}
          >
            Start Filling
          </button>
        </>
      ) : (
        <button onClick={() => setIsOpen(true)} className="cursor-pointer">
          <FiMenu size={30} />
        </button>
      )}

      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            exit={{ opacity: 0, x: -300 }}
            className="absolute top-0 right-0 w-70 bg-green-700 min-h-screen p-4"
          >
            <FiX
              onClick={() => setIsOpen(false)}
              size={30}
              className="absolute top-2 right-3"
            />
            <div className="flex flex-col space-y-5 pt-15 font-[TypoHoop]">
              {/* NavItem for home */}
              <NavItem pathname="" linkname="Home" />

              {/* NavItem for how it works */}
              <NavItem pathname="how_it_works" linkname="How It Works" />

              {/* NavItem for about us */}
              <NavItem pathname="about" linkname="About Us" />
            </div>
            <button
              className="bg-[#15c054d5] text-white font-bold mt-6 font-[ClashDisplay] tracking-wider w-full px-8 py-2 rounded-lg cursor-pointer"
              onClick={() => navigate("/authentication")}
            >
              Start Filling
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

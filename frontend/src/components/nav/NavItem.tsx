import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";

interface LinkProp {
  pathname: string;
  linkname: string;
}
export default function NavItem({ pathname, linkname }: LinkProp) {
  const location = useLocation();
  const { width } = useWindowSize();

  const isMobile = width >= 780;

  const isActive = location.pathname === `/${pathname}`;

  return (
    <motion.div
      whileHover={{
        scale: 1.1,
      }}
      transition={{ duration: 0.2 }}
      className="inline-block relative"
    >
      {/* <button
        // className={`${}`}
      > */}
        <Link to={`/${pathname}`} className={`cursor-pointer px-2 ${isMobile ? "text-gray-600": "w-full bg-white text-green-700 flex items-start px-1 py-2 rounded-lg"}`}>
          {linkname}
        </Link>
      {/* </button> */}

      {isActive && (
        <motion.span
          layoutId="underline"
          className={`absolute left-0 right-0 bottom-0 h-0.5 w-10 mx-auto ${isMobile ? "bg-green-500" : ""}`}
        />
      )}
    </motion.div>
  );
}

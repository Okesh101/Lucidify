import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface LinkProp {
    pathname: string,
    linkname: string
}
export default function NavItem({pathname, linkname}: LinkProp) {

  const location = useLocation()

  const isActive = location.pathname === `/${pathname}`
  
  return (
    <motion.div whileHover={{
        scale: 1.1,
        }}
        transition={{ duration: 0.2 }}
        className='inline-block relative'
    >
      <Link to={`/${pathname}`} className="px-2 py-1">
        {linkname}
      </Link>

      {isActive && (
        <motion.span
          layoutId="underline"
          className="absolute left-0 bottom-0 h-0.5 w-full bg-gray-700"
        />
  )}
    </motion.div>
  )
}

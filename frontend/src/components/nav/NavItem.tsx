import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface LinkProp {
    pathname: string,
    linkname: string
}
export default function NavItem({pathname, linkname}: LinkProp) {
  return (
    <motion.div whileHover={{
        scale: 1.1,
        borderBottom: '2px solid blue',
        }}
        transition={{ duration: 0.2 }}
    >
        <Link to={`/${pathname}`} >{linkname}</Link>
    </motion.div>
  )
}

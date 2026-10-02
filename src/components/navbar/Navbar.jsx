import "./navbar.scss"
import { motion } from "framer-motion"
import Sidebar from "../sidebar/Sidebar"

const Navbar = () => {
  return (
    <div className="navbar">
        {/* sidebar */}
        <Sidebar />
        <div className="wrapper">
            <motion.span initial={{ opacity: 0, scale:0.5 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.5 }} >Ahmad Fernando</motion.span>
            <div className="social">
            <a href="https://www.linkedin.com/in/ahmadfernando99/" target="_blank" rel="noreferrer"><img src="/linkedin.png" alt="LinkedIn" /></a>
            <a href="https://github.com/ahmadfrnando/" target="_blank" rel="noreferrer"><img src="/github.png" alt="GitHub" /></a>
            </div>
        </div>
    </div>
  )
}

export default Navbar
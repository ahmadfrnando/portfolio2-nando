import "./navbar.scss"
import { motion } from "framer-motion"
import Sidebar from "../sidebar/Sidebar"

const Navbar = () => {
  return (
    <div className="navbar">
        {/* sidebar */}
        <Sidebar />
        <div className="wrapper">
            <motion.span initial={{ opacity: 0, scale:0.5 }} animate={{ opacity:1, scale:1 }} taransition={{ duraiton:0.5 }} >Ahmad Fernando</motion.span>
            <div className="social">
            <a href="https://www.facebook.com/fernando4599/?locale=id_ID" target="_blank" rel="noreferrer"><img src="/facebook.png" alt="" /></a>
            <a href="https://www.instagram.com/_ahmadfernando/" target="_blank" rel="noreferrer"><img src="/instagram.png" alt="" /></a>
            <a href="https://www.linkedin.com/in/ahmadfernando99/" target="_blank" rel="noreferrer"><img src="/linkedin.png" alt="" /></a>
            <a href="https://github.com/ahmadfrnando/" target="_blank" rel="noreferrer"><img src="/github.png" alt="" /></a>
            </div>
        </div>
    </div>
  )
}

export default Navbar
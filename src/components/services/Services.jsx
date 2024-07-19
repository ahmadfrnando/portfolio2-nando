import './services.scss';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Services = () => {

    const ref = useRef()
    const isInView = useInView(ref, {margin:"-100px"})
  return (
    <motion.div ref={ref} className="services" variants={variants} initial="initial" animate={"animate"}>
      <motion.div className="textContainer" variants={variants}>
        <p>
          I focus on make websites that are fast, easy to use, <br /> and beautiful.
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/people.webp" alt="" />
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Unique</motion.b> Ideas
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{ color: "orange" }}>For Your</motion.b> Business.
          </h1>
          <button>WHAT I DO?</button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>User-Centric Frontend Design</h1>
          <p>
          I prioritize user experience by designing intuitive and responsive interfaces. With a mobile-first approach and modern design principles, I ensure your website looks and functions flawlessly across all devices.
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>Efficient and Scalable Web Development</h1>
          <p>
          I build websites that are not only visually appealing but also efficient and scalable. Utilizing the latest technologies, I ensure your site performs well under varying traffic conditions and is ready for future growth.
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>Seamless Integration of Cutting-Edge Technologies</h1>
          <p>
          I incorporate the latest technologies and frameworks to create dynamic and interactive web applications. My expertise in React, Laravel, and other modern tools ensures your website remains competitive and up-to-date.
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>Continuous Improvement and Optimization</h1>
          <p>
          I believe in continuous improvement and regularly optimize websites for better performance, security, and SEO. By analyzing user data and feedback, I make informed decisions to enhance your site`s functionality and user engagement
          </p>
          <button>Go</button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Services;

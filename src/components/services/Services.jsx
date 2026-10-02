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
    <motion.div ref={ref} className="services" variants={variants} initial="initial" animate={isInView && "animate"}>
      <motion.div className="textContainer" variants={variants}>
        <p>
          I build web applications that are fast, reliable, <br /> and easy to use.
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/people.webp" alt="People collaborating" />
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Unique</motion.b> Ideas
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{ color: "orange" }}>For Your</motion.b> Business.
          </h1>
          <a href="#Portfolio"><button>SEE MY WORK</button></a>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>Fullstack Web Applications</h1>
          <p>
            I build complete web applications from database to interface, with Laravel on the backend and React, Next.js, or Vue.js on the frontend, designed around the real workflows of the people who use them.
          </p>
        </motion.div>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>Backend & API Development</h1>
          <p>
            I design clean RESTful APIs and reliable data models with MySQL and PostgreSQL, including role-based access control, payment gateway integration with Xendit, and file storage with MinIO.
          </p>
        </motion.div>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>Deployment & Infrastructure</h1>
          <p>
            I containerize applications with Docker and deploy them on Linux VPS environments, so every project ships with a setup that is reproducible, secure, and easy to maintain.
          </p>
        </motion.div>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>Maintenance & Optimization</h1>
          <p>
            I keep systems healthy after launch by tuning database queries, improving performance, and adding features as business needs grow, from government services to POS and HR systems.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Services;

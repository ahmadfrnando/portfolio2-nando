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
          <button>WHAT WE DO?</button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>branding</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo a inventore accusamus fuga asperiores mollitia. Consequatur excepturi, accusamus asperiores tenetur eos quisquam eius esse, vitae sapiente
            reprehenderit fugit sed deleniti!
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>branding</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo a inventore accusamus fuga asperiores mollitia. Consequatur excepturi, accusamus asperiores tenetur eos quisquam eius esse, vitae sapiente
            reprehenderit fugit sed deleniti!
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>branding</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo a inventore accusamus fuga asperiores mollitia. Consequatur excepturi, accusamus asperiores tenetur eos quisquam eius esse, vitae sapiente
            reprehenderit fugit sed deleniti!
          </p>
          <button>Go</button>
        </motion.div>
        <motion.div className="box" whileHover={{ background: 'lightgray', color: 'black' }}>
          <h1>branding</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo a inventore accusamus fuga asperiores mollitia. Consequatur excepturi, accusamus asperiores tenetur eos quisquam eius esse, vitae sapiente
            reprehenderit fugit sed deleniti!
          </p>
          <button>Go</button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Services;

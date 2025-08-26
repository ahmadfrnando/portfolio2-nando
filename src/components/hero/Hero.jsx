import './hero.scss';

import { motion } from 'framer-motion';

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton : {
    y: 10,
    opacity: 0,
    transition:{
      duration: 2,
      repeat: Infinity,
    }
  }
};

const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "220%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 20,
    },
  },
};

export const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div className="textContainer" variants={textVariants} initial="initial" animate="animate">
          <motion.h2 variants={textVariants}>AHMAD FERNANDO</motion.h2>
          <motion.h1 variants={textVariants}>Software Engineer</motion.h1>
          <motion.div variants={textVariants} className="buttons">
            <a href="https://drive.google.com/file/d/1Jv0VBmMMw50K53pTGRKi6doJgPGG0MQa/view?usp=drive_link" target='_blank' rel="noreferrer"><motion.button variants={textVariants}>See My CV</motion.button></a>
            <a href="mailto:ahmadfernando1999@gmail.com?subject=Judul%20Email&body=Isi%20email%20di%20sini"><motion.button variants={textVariants}>Contact Me</motion.button></a>
          </motion.div>
          <motion.img variants={textVariants} animate="scrollButton" src="/scroll.png" alt="" />
        </motion.div>
      </div>
      <motion.div className="slidingTextContainer" variants={sliderVariants} initial="initial" animate="animate">Software Engineer Product Developer UX/UI Specialist</motion.div>
      <div className="imageContainer">
        <img src="/hero.png" alt="" />
      </div>
    </div>
  );
};



import './portfolio.scss';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const items = [
  {
    id: 1,
    title: 'E-PPID Online',
    img: './projects/project1.png',
    desc: 'The E-PPID Online application makes it easier for the public to access public information transparently and quickly.',
    link: '#',
  },
  {
    id: 2,
    title: 'Application for Cooperations',
    img: './projects/project2.jpeg',
    desc: 'This application is designed to facilitate the process of applying for and receiving cooperation efficiently.',
    link: '#',
  },
  {
    id: 3,
    title: 'Website Admin Portal IMAKOM',
    img: './projects/project3.png',
    desc: 'Website Admin Portal is a comprehensive solution for more effective administration management.',
    link: '#',
  },
  {
    id: 4,
    title: 'Aplication of E-ARCHIEVE ONLINE',
    img: './projects/project4.png',
    desc: ' The E-ARCHIEVE ONLINE application offers a digital solution for efficient document archiving.',
    link: '#',
  },
  {
    id: 5,
    title: 'Application of E-ADMISSION ONLINE',
    img: './projects/project5.png',
    desc: 'This system is specifically designed to facilitate the process of accepting new students at the school.',
    link: '#',
  },
  {
    id: 6,
    title: 'E-Commerce Nanshop',
    img: './projects/project6.png',
    desc: 'This application is designed to sell products online in an efficient way.',
    link: 'https://ahmadfrnando.github.io/ecommerce/',
  },
  {
    id: 7,
    title: 'Neighborgood',
    img: './projects/project7.png',
    desc: 'This application is designed to make profile company.',
    link: 'https://ahmadfrnando.github.io/landing-page/',
  },
  {
    id: 8,
    title: 'PUSKESMAS ONLINE',
    img: './projects/project8.png',
    desc: 'I developed an online health center website for immunization data and reporting, specifically designed for Sumber Mulyorejo Binjai Health Sub-Center..',
    link: '#',
  },
];

const Single = ({ item }) => {
    const ref = useRef();
    const { scrollYProgress } = useScroll({
        target:ref, 
        // offset:["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  return <section >
    <div className="container">
        <div className="wrapper">
            <div className="imageContainer" ref={ref}>
                <img src={item.img} alt="" />
                </div>
            <motion.div className="textContainer" style={{ y }}>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
                <button>See Demo</button>
            </motion.div>
        </div>
    </div>
    </section>;
};

const Portfolio = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({target:ref, offset:["end end", "start start"]});

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Feature Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;

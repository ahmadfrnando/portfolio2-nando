import './portfolio.scss';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const items = [
  {
    id: 1,
    title: 'E-PPID Online',
    img: './projects/project1.png',
    desc: 'Developed a fullstack web application to streamline public information requests and documentation workflows. Designed system architecture, implemented real-time request tracking, and deployed the application on a Linux VPS, reducing processing time and increasing transparency for government stakeholders',
    link: '#',
    stack: ['Laravel', 'React.js', 'MySQL'],
  },
  {
    id: 2,
    title: 'Application for Cooperations',
    img: './projects/project2.png',
    desc: 'This application is designed to facilitate the process of applying for and receiving cooperation efficiently.',
    link: '#',
    stack: ['Laravel', 'MySQL'],
  },
  {
    id: 3,
    title: 'Website IMAKOM',
    img: './projects/project3.png',
    desc: 'Website Imakom is a comprehensive solution for more effective administration management and communication.',
    link: '#',
    stack: ['Laravel', 'MySQL'],
  },
  {
    id: 4,
    title: 'Aplication of E-ARCHIEVE ONLINE',
    img: './projects/project4.png',
    desc: ' The E-ARCHIEVE ONLINE application offers a digital solution for efficient document archiving.',
    link: '#',
    stack: ['Laravel', 'MySQL'],
  },
  {
    id: 5,
    title: 'Application of E-ADMISSION ONLINE',
    img: './projects/project5.png',
    desc: 'This system is specifically designed to facilitate the process of accepting new students at the school.',
    link: '#',
    stack: ['Laravel', 'Vue.js'],
  },
  {
    id: 6,
    title: 'E-Commerce Nanshop',
    img: './projects/project6.png',
    desc: 'This application is designed to sell products online in an efficient way.',
    link: 'https://ahmadfrnando.github.io/ecommerce/',
    stack: ['Next.js', 'MySQL'],
  },
  {
    id: 7,
    title: 'Neighborgood',
    img: './projects/project7.png',
    desc: 'This application is designed to make profile company.',
    link: 'https://ahmadfrnando.github.io/landing-page/',
    stack: ['React.js'],
  },
  {
    id: 8,
    title: 'PUSKESMAS ONLINE',
    img: './projects/project8.png',
    desc: 'I developed an online health center website for immunization data and reporting, specifically designed for Sumber Mulyorejo Binjai Health Sub-Center..',
    link: '#',
    stack: ['Laravel', 'Vue.js', 'Docker'],
  },
  {
    id: 9,
    title: 'Point of Sale (POS) & ERP System',
    img: './projects/project9.png',
    desc: 'Developed a POS and ERP system to manage sales transactions, inventory, and reporting. Responsible for backend development using Laravel and MySQL, API integration with React.js, and deployment on VPS environments, improving operational efficiency and data accuracy for business users',
    link: '#',
    stack: ['Next.js', 'Laravel', 'MySQL', 'MinIO', 'Xendit', 'Docker'],
  },
  {
    id: 10,
    title: 'Human Resources Management System (HRMS)',
    img: './projects/project10.png',
    desc: 'Built a web-based HR management system covering attendance, payroll, and performance evaluation modules. Implemented RESTful APIs, integrated biometric attendance devices, and optimized database performance using PostgreSQL, reducing manual data errors and improving payroll accuracy.',
    link: '#',
    stack: ['Laravel', 'Next.js', 'PostgreSQL', 'MinIO', 'Docker'],
  },
  {
    id: 11,
    title: 'SiPangan',
    img: './projects/project11.png',
    desc: 'Designed and developed a public-facing web platform to provide real-time food price information. Implemented role-based access control, automated updates, and responsive dashboards, supporting open-data initiatives and reducing manual data management',
    link: '#',
    stack: ['Laravel', 'MySQL', 'Docker'],
  },
  {
    id: 12,
    title: 'Snapora',
    img: './projects/project12.png',
    desc: 'Built a photo booth application with real-time image processing and social media sharing capabilities. Implemented a user-friendly interface, integrated camera APIs, and optimized image rendering for various devices, enhancing user engagement at events.',
    link: '#',
    stack: ['Next.js', 'Laravel', 'MySQL', 'Xendit', 'MinIO', 'Docker'],
  },
];

const Single = ({ item, onPreview }) => {
    const ref = useRef();
    const { scrollYProgress } = useScroll({
        target:ref, 
        // offset:["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  return <section >
    <div className="container">
        <div className="wrapper">
            <div className="imageContainer" ref={ref} onClick={() => onPreview(item)}>
                <img src={item.img} alt={item.title} />
                <span className="zoomHint">Click to enlarge</span>
                </div>
            <motion.div className="textContainer" style={{ y }}>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
                <div className="stack">
                  {item.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                {item.link !== '#' && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <button>Live Demo</button>
                  </a>
                )}
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

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!preview) return;
    const onKey = (e) => e.key === 'Escape' && setPreview(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [preview]);

  return (
    <div className="portfolio" ref={ref}>
      <div className="progress">
        <h1>Feature Works</h1>
        <motion.div style={{ scaleX }} className="progressBar"></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} onPreview={setPreview} />
      ))}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="lightbox"
            onClick={() => setPreview(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={preview.img}
              alt={preview.title}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            />
            <p>{preview.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;

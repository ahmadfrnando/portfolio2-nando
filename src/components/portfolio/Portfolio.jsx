import './portfolio.scss';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { fallbackProjects } from '../../data/projects';

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
                <img src={item.img} alt={item.title} loading="lazy" />
                <span className="zoomHint">Click to enlarge</span>
                </div>
            <motion.div className="textContainer" style={{ y }}>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
                <div className="stack">
                  {(item.stack ?? []).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                {item.link && item.link !== '#' && (
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
  const [items, setItems] = useState(supabase ? [] : fallbackProjects);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (error) console.error('Gagal memuat projects:', error.message);
        setItems(error || !data?.length ? fallbackProjects : data);
      });
  }, []);

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

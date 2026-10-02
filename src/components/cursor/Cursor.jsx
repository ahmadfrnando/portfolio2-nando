import './cursor.scss';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  // motion values update the DOM directly, so mouse movement doesn't re-render React
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const mouseMove = (e) => {
      x.set(e.clientX + 10);
      y.set(e.clientY + 10);
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [x, y]);
  return <motion.div className="cursor" style={{ x: springX, y: springY }}></motion.div>;
};

export default Cursor;

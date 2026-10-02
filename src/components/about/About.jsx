import './about.scss';
import { motion } from 'framer-motion';

const variants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
    },
  },
};

const stats = [
  { value: '12+', label: 'Projects delivered' },
  { value: 'Gov & Business', label: 'Clients served' },
  { value: 'End-to-end', label: 'Database to deployment' },
];

const skills = [
  { group: 'Backend', items: ['Laravel', 'REST API', 'MySQL', 'PostgreSQL'] },
  { group: 'Frontend', items: ['Next.js', 'React.js', 'Vue.js'] },
  { group: 'DevOps', items: ['Docker', 'Linux VPS', 'MinIO'] },
  { group: 'Integrations', items: ['Xendit', 'Biometric Devices'] },
];

const About = () => {
  return (
    <motion.div className="about" variants={variants} initial="initial" whileInView="animate" viewport={{ once: true }}>
      <motion.div className="textContainer" variants={variants}>
        <h1>
          About <span>Me</span>
        </h1>
        <p>
          I&apos;m a software engineer based in Medan, Indonesia, building fullstack web applications for government institutions and businesses, from public information services and food price platforms to POS, ERP, and HR systems.
        </p>
        <p>
          I work mostly with Laravel and modern JavaScript frameworks, and I take projects from database design all the way to deployment on production servers.
        </p>
        <div className="stats">
          {stats.map((stat) => (
            <motion.div className="stat" key={stat.label} variants={variants}>
              <h2>{stat.value}</h2>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div className="skillsContainer" variants={variants}>
        {skills.map((skill) => (
          <motion.div className="skillGroup" key={skill.group} variants={variants}>
            <h3>{skill.group}</h3>
            <div className="items">
              {skill.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default About;

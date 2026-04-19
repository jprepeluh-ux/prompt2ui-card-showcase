import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import './MolecularGastronomy.css'

interface DishProps {
  index: string
  title: string
  technique: string
  description: string
  imageSrc: string
  numberColor: string
}

const ease = [0.23, 1, 0.32, 1] as const

// Entry: single whileInView root — no own animation, just orchestrates children
const entryVariants = {
  hidden: {},
  visible: {},
}

// Image: enters immediately when entry is triggered
const imageVariants = {
  hidden: { opacity: 0, transform: 'translateY(48px)' },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { duration: 0.85, ease },
  },
}

// Text col: waits 0.65s before starting its children — creates the clear visual offset
const textColVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.65,
      staggerChildren: 0.16,
    },
  },
}

const numberVariants = {
  hidden: { opacity: 0, transform: 'scale(1.06)' },
  visible: {
    opacity: 1,
    transform: 'scale(1)',
    transition: { duration: 1.2, ease },
  },
}

// Text lines: slow and smooth — 1.1s per line, cascading 0.16s apart
const lineVariants = {
  hidden: { opacity: 0, transform: 'translateY(108%)' },
  visible: {
    opacity: 1,
    transform: 'translateY(0%)',
    transition: { duration: 1.1, ease },
  },
}

function CourseEntry({ index, title, technique, description, imageSrc, numberColor }: DishProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  // Scroll progress: 0 = entry enters bottom of viewport, 1 = exits top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallax: text lags 80px behind image in both scroll directions
  const rawScrollY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const textY = useSpring(rawScrollY, { stiffness: 22, damping: 11, mass: 1.1 })

  // Accessibility: if reduced motion is preferred, render without animation
  if (reduceMotion) {
    return (
      <article className="mol-entry">
        <div className="mol-entry__image-col">
          <div className="mol-entry__image-wrap">
            <img className="mol-entry__image" src={imageSrc} alt={title} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="mol-entry__text-col">
          <span className="mol-entry__number" aria-hidden="true" style={{ color: numberColor }}>{index}</span>
          <div className="mol-clip"><h3 className="mol-entry__name">{title}</h3></div>
          <div className="mol-clip"><p className="mol-entry__technique">{technique}</p></div>
          <div className="mol-clip"><p className="mol-entry__desc">{description}</p></div>
        </div>
      </article>
    )
  }

  return (
    <motion.article
      ref={ref}
      className="mol-entry"
      variants={entryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* Image: first child — animates immediately on trigger */}
      <motion.div className="mol-entry__image-col" variants={imageVariants}>
        <div className="mol-entry__image-wrap">
          <img
            className="mol-entry__image"
            src={imageSrc}
            alt={title}
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>

      {/* Text: parallax y offset + delayed entrance animation */}
      <motion.div
        className="mol-entry__text-col"
        style={{ y: textY }}
        variants={textColVariants}
      >
        <motion.span
          className="mol-entry__number"
          aria-hidden="true"
          style={{ color: numberColor }}
          variants={numberVariants}
        >
          {index}
        </motion.span>

        <div className="mol-clip">
          <motion.h3 className="mol-entry__name" variants={lineVariants}>
            {title}
          </motion.h3>
        </div>

        <div className="mol-clip">
          <motion.p className="mol-entry__technique" variants={lineVariants}>
            {technique}
          </motion.p>
        </div>

        <div className="mol-clip">
          <motion.p className="mol-entry__desc" variants={lineVariants}>
            {description}
          </motion.p>
        </div>
      </motion.div>
    </motion.article>
  )
}

const dishes: DishProps[] = [
  {
    index: '01',
    title: 'Compressed Watermelon',
    technique: 'Vacuum Compression',
    description:
      'Compressed watermelon cubes with basil oil droplets, micro cress, geometric negative space plating.',
    imageSrc: '/molekularkueche_01__NEW_caviar-spherification%201.png',
    numberColor: 'oklch(93% 0.025 12)',
  },
  {
    index: '02',
    title: 'Saffron Consommé & Caviar',
    technique: 'Spherification · 24k',
    description:
      'Translucent caviar pearl spherification in a delicate pool of saffron consommé gel, edible 24k gold leaf accents.',
    imageSrc: '/molekularkueche_02_NEW_caviar-spherification%203.png',
    numberColor: 'oklch(93% 0.028 78)',
  },
  {
    index: '03',
    title: 'The Cracking Sphere',
    technique: 'Liquid Nitrogen',
    description:
      'Liquid nitrogen frozen chocolate sphere cracking open, revealing passionfruit foam and violet gel interior.',
    imageSrc: '/molekularkueche_03_NEW_The%20Cracking%20Sphere.png',
    numberColor: 'oklch(93% 0.02 305)',
  },
]

export function MolecularShowcase() {
  return (
    <section className="mol-showcase" aria-labelledby="mol-title">
      <motion.header
        className="mol-header"
        initial={{ opacity: 0, transform: 'translateY(24px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] as const }}
        viewport={{ once: true, margin: '-60px' }}
      >
        <span className="mol-header__eyebrow">Tasting Menu — No. 7</span>
        <h2 className="mol-header__title" id="mol-title">
          Molecular<br />Gastronomy
        </h2>
        <hr className="mol-header__rule" />
      </motion.header>

      <div className="mol-entries">
        {dishes.map(dish => (
          <CourseEntry key={dish.index} {...dish} />
        ))}
      </div>
    </section>
  )
}

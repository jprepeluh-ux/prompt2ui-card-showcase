import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import './MolecularDark.css'

interface DishEntry {
  index: string
  name: string
  technique: string
  description: string
  imageSrc: string
  annotation: string
}

const ease = [0.23, 1, 0.32, 1] as const

const bandVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const numberVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0, ease } },
}

const imageVariants = {
  hidden: { opacity: 0, transform: 'translateX(36px)' },
  visible: { opacity: 1, transform: 'translateX(0px)', transition: { duration: 0.9, ease } },
}

const textColVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const textVariants = {
  hidden: { opacity: 0, transform: 'translateY(16px)' },
  visible: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.75, ease } },
}

const dishes: DishEntry[] = [
  {
    index: '01',
    name: 'Compressed Watermelon',
    technique: 'Vacuum Compression',
    description:
      'Compressed watermelon cubes with basil oil droplets, micro cress, geometric negative space plating.',
    imageSrc: '/molekularkueche_01__NEW_caviar-spherification%201.png',
    annotation: '4°C · 6h press · serve chilled',
  },
  {
    index: '02',
    name: 'Saffron Consommé & Caviar',
    technique: 'Spherification · 24k',
    description:
      'Translucent caviar pearl spherification in a delicate pool of saffron consommé gel, edible 24k gold leaf accents.',
    imageSrc: '/molekularkueche_02_NEW_caviar-spherification%203.png',
    annotation: '18°C · 0.5% sodium alginate · 5min bath',
  },
  {
    index: '03',
    name: 'The Cracking Sphere',
    technique: 'Liquid Nitrogen',
    description:
      'Liquid nitrogen frozen chocolate sphere cracking open, revealing passionfruit foam and violet gel interior.',
    imageSrc: '/molekularkueche_03_NEW_The%20Cracking%20Sphere.png',
    annotation: '−196°C · serve immediately · tableside crack',
  },
]

function DishBand({ index, name, technique, description, imageSrc, annotation }: DishEntry) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  const rawX = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [18, -18])
  const imageX = useSpring(rawX, { stiffness: 28, damping: 14, mass: 1.1 })

  if (reduceMotion) {
    return (
      <div className="mol-dark__band" ref={ref}>
        <div className="mol-dark__number" aria-hidden="true"><span>{index}</span></div>
        <div className="mol-dark__image">
          <img src={imageSrc} alt={name} loading="lazy" decoding="async" />
        </div>
        <div className="mol-dark__text">
          <p className="mol-dark__technique">[{technique}]</p>
          <h3 className="mol-dark__name">{name}</h3>
          <p className="mol-dark__desc">{description}</p>
          <p className="mol-dark__annotation">{annotation}</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="mol-dark__band"
      ref={ref}
      variants={bandVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div className="mol-dark__number" aria-hidden="true" variants={numberVariants}>
        <span>{index}</span>
      </motion.div>

      <motion.div
        className="mol-dark__image"
        style={{ x: imageX }}
        variants={imageVariants}
      >
        <img src={imageSrc} alt={name} loading="lazy" decoding="async" />
      </motion.div>

      <motion.div className="mol-dark__text" variants={textColVariants}>
        <motion.p className="mol-dark__technique" variants={textVariants}>
          [{technique}]
        </motion.p>
        <motion.h3 className="mol-dark__name" variants={textVariants}>
          {name}
        </motion.h3>
        <motion.p className="mol-dark__desc" variants={textVariants}>
          {description}
        </motion.p>
        <motion.p className="mol-dark__annotation" variants={textVariants}>
          {annotation}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export function MolecularDark() {
  return (
    <section className="mol-dark" aria-labelledby="mol-dark-title">
      <motion.header
        className="mol-dark__header"
        initial={{ opacity: 0, transform: 'translateY(20px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
        viewport={{ once: true, margin: '-60px' }}
      >
        <span className="mol-dark__eyebrow">Tasting Menu — No. 7</span>
        <h2 className="mol-dark__title" id="mol-dark-title">
          Molecular<br />Gastronomy
        </h2>
        <hr className="mol-dark__rule" />
      </motion.header>

      <div className="mol-dark__bands">
        {dishes.map(dish => (
          <DishBand key={dish.index} {...dish} />
        ))}
      </div>
    </section>
  )
}

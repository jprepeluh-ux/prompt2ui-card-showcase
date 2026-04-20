import { motion, useReducedMotion } from 'framer-motion'
import './MolecularVivid.css'

interface VividDish {
  index: string
  name: string
  technique: string
  description: string
  imageSrc: string
  bg: string
  accent: string
  tall?: boolean
}

const ease = [0.23, 1, 0.32, 1] as const

const cardVariants = {
  hidden: { opacity: 0, transform: 'translateY(36px)' },
  visible: (delay: number) => ({
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { duration: 0.9, ease, delay },
  }),
}

const imageVariants = {
  hidden: { opacity: 0, transform: 'scale(0.88)' },
  visible: (delay: number) => ({
    opacity: 1,
    transform: 'scale(1)',
    transition: { duration: 1.1, ease, delay: delay + 0.2 },
  }),
}

const dishes: VividDish[] = [
  {
    index: '01',
    name: 'Compressed\nWatermelon',
    technique: 'Vacuum Compression',
    description: 'Basil oil droplets, micro cress, geometric negative space plating.',
    imageSrc: '/molekularkueche_01__NEW_caviar-spherification%201.png',
    bg: 'oklch(56% 0.21 15)',
    accent: 'oklch(88% 0.10 15)',
    tall: true,
  },
  {
    index: '02',
    name: 'Saffron Consommé\n& Caviar',
    technique: 'Spherification · 24k',
    description: 'Saffron consommé gel, edible 24k gold leaf.',
    imageSrc: '/molekularkueche_02_NEW_caviar-spherification%203.png',
    bg: 'oklch(72% 0.18 78)',
    accent: 'oklch(28% 0.09 78)',
  },
  {
    index: '03',
    name: 'The Cracking\nSphere',
    technique: 'Liquid Nitrogen',
    description: 'Passionfruit foam and violet gel interior.',
    imageSrc: '/molekularkueche_03_NEW_The%20Cracking%20Sphere.png',
    bg: 'oklch(40% 0.22 305)',
    accent: 'oklch(82% 0.10 305)',
  },
]

function VividCard({ index, name, technique, description, imageSrc, bg, accent, tall }: VividDish) {
  const reduceMotion = useReducedMotion()
  const delay = (Number(index) - 1) * 0.12

  const imageEl = reduceMotion ? (
    <img className="mol-vivid__image" src={imageSrc} alt={name} loading="lazy" decoding="async" />
  ) : (
    <motion.img
      className="mol-vivid__image"
      src={imageSrc}
      alt={name}
      loading="lazy"
      decoding="async"
      custom={delay}
      variants={imageVariants}
    />
  )

  const inner = (
    <>
      {/* Visual zone: only the ghost number, image is sibling on card level */}
      <div className="mol-vivid__visual">
        <span className="mol-vivid__ghost" aria-hidden="true">{index}</span>
      </div>
      {/* Image: positioned absolute to the card, z-index below label */}
      {imageEl}
      {/* Label: always sits on top */}
      <div className="mol-vivid__label">
        <p className="mol-vivid__technique" style={{ color: accent }}>{technique}</p>
        <h3 className="mol-vivid__name">{name}</h3>
        <p className="mol-vivid__desc">{description}</p>
      </div>
    </>
  )

  if (reduceMotion) {
    return (
      <div className={`mol-vivid__card${tall ? ' mol-vivid__card--tall' : ''}`} style={{ background: bg }}>
        {inner}
      </div>
    )
  }

  return (
    <motion.div
      className={`mol-vivid__card${tall ? ' mol-vivid__card--tall' : ''}`}
      style={{ background: bg }}
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {inner}
    </motion.div>
  )
}

export function MolecularVivid() {
  return (
    <section className="mol-vivid" aria-labelledby="mol-vivid-title">
      <motion.header
        className="mol-vivid__header"
        initial={{ opacity: 0, transform: 'translateY(20px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] as const }}
        viewport={{ once: true, margin: '-60px' }}
      >
        <span className="mol-vivid__eyebrow">Tasting Menu — No. 7</span>
        <h2 className="mol-vivid__title" id="mol-vivid-title">
          Molecular<br />Gastronomy
        </h2>
        <hr className="mol-vivid__rule" />
      </motion.header>

      <div className="mol-vivid__grid">
        {dishes.map(dish => (
          <VividCard key={dish.index} {...dish} />
        ))}
      </div>
    </section>
  )
}

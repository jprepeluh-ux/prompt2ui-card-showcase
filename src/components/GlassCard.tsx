import './GlassCard.css'
import headsetImg   from '../assets/matte/headset_new.png'
import quantumImg   from '../assets/matte/quantum_new.png'
import datadriveImg from '../assets/matte/datadrive_new.png'

export type GlassVariant = 'neural' | 'quantum' | 'drive'

interface Spec {
  label: string
  value: string
}

interface GlassCardProps {
  category: string
  name: string
  description: string
  specs: Spec[]
  price: string
  currency?: string
  tag?: string
  imageSrc?: string
  variant: GlassVariant
  index?: number
}

// ── Component ────────────────────────────────────────────────────────────

export function GlassCard({
  category,
  name,
  description,
  specs,
  price,
  currency = '€',
  tag,
  imageSrc,
  variant,
  index = 0,
}: GlassCardProps) {
  return (
    <article
      className={`glass-card glass--${variant}`}
      style={{ animationDelay: `${0.08 + index * 0.14}s` }}
    >
      {imageSrc && (
        <div className="glass-card__image-wrap">
          <img
            className="glass-card__image"
            src={imageSrc}
            alt={name}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="glass-card__top">
        <span className="glass-card__category">{category}</span>
        {tag && <span className="glass-card__tag">{tag}</span>}
      </div>

      <div className="glass-card__body">
        <h3 className="glass-card__name">{name}</h3>
        <p className="glass-card__desc">{description}</p>

        <dl className="glass-card__specs">
          {specs.map((spec) => (
            <div className="glass-card__spec" key={spec.label}>
              <dt className="glass-card__spec-label">{spec.label}</dt>
              <dd className="glass-card__spec-value">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="glass-card__footer">
        <span
          className="glass-card__price"
          aria-label={`Preis: ${currency} ${price}`}
        >
          <span className="glass-card__price-currency">{currency}</span>
          <span className="glass-card__price-amount">{price}</span>
        </span>
        <button
          className="glass-card__cta"
          type="button"
          aria-label={`${name} kaufen — ${currency} ${price}`}
        >
          Order Now
        </button>
      </div>
    </article>
  )
}

// ── Showcase section ──────────────────────────────────────────────────────

const glassDrops: GlassCardProps[] = [
  {
    category: 'Neural Interface',
    name: 'Neural Link Headset',
    description:
      'Direct neural input with 0.4ms latency. Adaptive noise cancellation, 72h battery life.',
    specs: [
      { label: 'Latency',   value: '0.4 ms' },
      { label: 'Channels',  value: '256 EEG' },
      { label: 'Battery',   value: '72 h' },
    ],
    price: '1.299',
    variant: 'neural',
    imageSrc: headsetImg,
    tag: 'Pre-Order',
    index: 0,
  },
  {
    category: 'Processing Unit',
    name: 'Quantum Processor Core',
    description:
      '128-qubit architecture. Operates at 15 mK, error-correction built-in.',
    specs: [
      { label: 'Qubits',    value: '128 Q' },
      { label: 'Temp',      value: '15 mK' },
      { label: 'Gate Speed', value: '50 ns' },
    ],
    price: '8.990',
    variant: 'quantum',
    imageSrc: quantumImg,
    tag: 'Limited',
    index: 1,
  },
  {
    category: 'Data Storage',
    name: 'Encrypted Data-Drive',
    description:
      '4TB with AES-512 hardware encryption. Read 14 GB/s, self-destruct on tamper detection.',
    specs: [
      { label: 'Capacity',  value: '4 TB' },
      { label: 'Read',      value: '14 GB/s' },
      { label: 'Encrypt',   value: 'AES-512' },
    ],
    price: '449',
    variant: 'drive',
    imageSrc: datadriveImg,
    tag: 'In Stock',
    index: 2,
  },
]

export function GlassShowcase() {
  return (
    <section className="glass-showcase" aria-labelledby="glass-showcase-title">
      <header className="glass-showcase__header">
        <span className="glass-showcase__eyebrow">Transparent Labs — Series 01</span>
        <h2 className="glass-showcase__title" id="glass-showcase-title">
          Next-Gen
          <span>Hardware.</span>
        </h2>
      </header>

      <div className="glass-grid" role="list">
        {glassDrops.map((drop) => (
          <div key={drop.name} role="listitem">
            <GlassCard {...drop} />
          </div>
        ))}
      </div>
    </section>
  )
}

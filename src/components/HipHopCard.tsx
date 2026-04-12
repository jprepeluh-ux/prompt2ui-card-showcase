import './HipHopCard.css'

interface HipHopCardProps {
  category: string
  name: string
  description: string
  price: string
  currency?: string
  imageSrc: string
  tag?: string
  index?: number
}

export function HipHopCard({
  category,
  name,
  description,
  price,
  currency = '€',
  imageSrc,
  tag,
  index = 0,
}: HipHopCardProps) {
  return (
    <article
      className="hh-card"
      style={{ animationDelay: `${0.08 + index * 0.14}s` }}
    >
      <div className="hh-card__image-wrap">
        <img
          className="hh-card__image"
          src={imageSrc}
          alt={name.replace(/\n/g, ' ')}
          loading="lazy"
          decoding="async"
        />
        <div className="hh-card__duotone" aria-hidden="true" />
        {tag && <span className="hh-card__tag">{tag}</span>}
      </div>

      <div className="hh-card__body">
        <span className="hh-card__category">{category}</span>
        <h3 className="hh-card__name">{name}</h3>
        <div className="hh-card__rule" aria-hidden="true" />
        <p className="hh-card__desc">{description}</p>

        <div className="hh-card__footer">
          <span className="hh-card__price" aria-label={`Preis: ${currency} ${price}`}>
            {currency} {price}
          </span>
          <button
            className="hh-card__cta"
            type="button"
            aria-label={`${name.replace(/\n/g, ' ')} kaufen — ${currency} ${price}${tag ? ` — ${tag}` : ''}`}
          >
            Shop Drop
            <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <line x1="0" y1="7" x2="11" y2="7" stroke="currentColor" strokeWidth="1.5" />
              <polyline
                points="7,3 11,7 7,11"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

// ── Showcase section ──────────────────────────────────────────────────────

const drops: HipHopCardProps[] = [
  {
    category: 'Footwear',
    name: 'DOWNTOWN\nAF-1',
    description: 'Low-top concrete colorway. Full-grain leather, gum rubber sole.',
    price: '189',
    imageSrc: '/hh-sneaker.png',
    tag: 'Limited',
    index: 0,
  },
  {
    category: 'Apparel',
    name: 'BLOCK\nLETTER\nHOODIE',
    description: '550gsm heavyweight fleece. Enzyme-washed, pre-shrunk.',
    price: '145',
    imageSrc: '/hh-hoodie.png',
    tag: 'New Drop',
    index: 1,
  },
  {
    category: 'Music',
    name: 'SIDE A\n/ SIDE B',
    description: '180g limited press. Hand-stamped label, 45rpm insert included.',
    price: '34',
    imageSrc: '/hh-vinyl.png',
    index: 2,
  },
]

export function HipHopShowcase() {
  return (
    <section className="hh-showcase" aria-labelledby="hh-showcase-title">
      <header className="hh-showcase__header">
        <span className="hh-showcase__eyebrow">New Drop — 2025</span>
        <h2 className="hh-showcase__title" id="hh-showcase-title">
          The Block<br />Collection.
        </h2>
      </header>

      <div className="hh-grid" role="list">
        {drops.map((drop) => (
          <div key={drop.name} role="listitem">
            <HipHopCard {...drop} />
          </div>
        ))}
      </div>
    </section>
  )
}

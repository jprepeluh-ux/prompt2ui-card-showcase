import './PopArtCard.css'

export type PopVariant = 'neon' | 'tee' | 'figure'

export interface PopArtCardProps {
  category: string
  name: string
  description: string
  price: string
  currency?: string
  imageSrc: string
  badge?: string
  variant: PopVariant
  index?: number
}

// ── Component ────────────────────────────────────────────────────────────

export function PopArtCard({
  category,
  name,
  description,
  price,
  currency = '€',
  imageSrc,
  badge,
  variant,
  index = 0,
}: PopArtCardProps) {
  return (
    <article
      className={`pop-slot pop--${variant}`}
      style={{ animationDelay: `${0.05 + index * 0.14}s` }}
    >
      <div className="pop-slot__image-wrap">
        <img
          className="pop-slot__image"
          src={imageSrc}
          alt={name}
          loading="lazy"
          decoding="async"
        />

        {/* Neon burst expanding from center on hover */}
        <div className="pop-slot__splash" aria-hidden="true" />

        {badge && (
          <span className="pop-slot__badge" aria-hidden="true">
            {badge}
          </span>
        )}
      </div>

      {/* Name sticker — crosses image/card boundary */}
      <h3 className="pop-card__name">{name}</h3>

      <div className="pop-card__clip">
        {/* Full-width accent color band */}
        <div className="pop-card__band">
          <span className="pop-card__category">{category}</span>
        </div>

        <div className="pop-card__body">
          <p className="pop-card__desc">{description}</p>

          <div className="pop-card__footer">
            <span
              className="pop-card__price"
              aria-label={`Preis: ${currency} ${price}`}
            >
              <span className="pop-card__price-currency">{currency}</span>
              <span className="pop-card__price-amount">{price}</span>
            </span>
            <button
              className="pop-card__cta"
              type="button"
              aria-label={`${name} kaufen — ${currency} ${price}${badge ? ` — ${badge}` : ''}`}
            >
              GRAB IT
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

// ── Showcase section ──────────────────────────────────────────────────────

const popDrops: PopArtCardProps[] = [
  {
    category: 'Footwear',
    name: 'Volt Hi-Top',
    description:
      'Neon high-tops. Rubber-coated upper, phosphorescent sole that charges under UV.',
    price: '219',
    variant: 'neon',
    imageSrc: '/pop-sneaker.png',
    badge: 'NEON',
    index: 0,
  },
  {
    category: 'Apparel',
    name: 'Graphic Drop 04',
    description:
      'Limited screen-print on 220g ringspun cotton. Hand-pulled, one wash, no reprint.',
    price: '69',
    variant: 'tee',
    imageSrc: '/pop-tee.png',
    badge: 'DROP 04',
    index: 1,
  },
  {
    category: 'Collectibles',
    name: 'Bear Figure No. 7',
    description:
      'Limited resin figure, 20cm. Hand-painted details, individually numbered certificate.',
    price: '299',
    variant: 'figure',
    imageSrc: '/pop-figure.png',
    badge: '1/100',
    index: 2,
  },
]

export function PopArtShowcase() {
  return (
    <section className="pop-showcase" aria-labelledby="pop-showcase-title">
      <header className="pop-showcase__header">
        <span className="pop-showcase__eyebrow">★ Limited Edition ★</span>
        <h2 className="pop-showcase__title" id="pop-showcase-title">
          Fresh
          <br />
          <span className="pop-showcase__title-outline">Chaos.</span>
        </h2>
      </header>

      <div className="pop-grid" role="list">
        {popDrops.map((drop) => (
          <div key={drop.name} role="listitem">
            <PopArtCard {...drop} />
          </div>
        ))}
      </div>
    </section>
  )
}

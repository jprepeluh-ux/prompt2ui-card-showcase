import './ProductCard.css'

export type ProductVariant = 'cashmere' | 'leather' | 'silk'

export interface ProductCardProps {
  category: string
  name: string
  material: string
  price: string
  currency?: string
  variant: ProductVariant
  imageSrc: string
  badge?: string
  index?: number
}

// ── Component ────────────────────────────────────────────────────────────

export function ProductCard({
  category,
  name,
  material,
  price,
  currency = '€',
  variant,
  imageSrc,
  badge,
  index,
}: ProductCardProps) {
  const cardNumber = index !== undefined ? String(index + 1).padStart(2, '0') : undefined

  return (
    <article className={`pc pc--${variant}`}>
      <div className="pc__image-wrap">
        <img
          className="pc__image-bg"
          src={imageSrc}
          alt={name}
          loading="lazy"
          decoding="async"
        />

        {cardNumber && (
          <span className="pc__number" aria-hidden="true">
            {cardNumber}
          </span>
        )}

        {badge && <span className="pc__badge">{badge}</span>}

        {/* The tailor's mark — signature hover interaction */}
        <div className="pc__tailor-mark" aria-hidden="true" />
      </div>

      <div className="pc__body">
        <div className="pc__meta">
          <span className="pc__category">{category}</span>
          <span className="pc__price">
            {currency}&thinsp;{price}
          </span>
        </div>

        <h3 className="pc__name">{name}</h3>
        <p className="pc__material">{material}</p>

        <button
          className="pc__cta"
          type="button"
          aria-label={`Add ${name} to collection${badge ? ` — ${badge}` : ''}`}
        >
          <span>Add to collection</span>
          <svg viewBox="0 0 32 7" fill="none" aria-hidden="true">
            <line x1="0" y1="3.5" x2="27" y2="3.5" stroke="currentColor" strokeWidth="0.85" />
            <polyline
              points="22.5,1 27,3.5 22.5,6"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.85"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </article>
  )
}

// ── Showcase section (convenience wrapper) ───────────────────────────────

const products: ProductCardProps[] = [
  {
    category: 'Outerwear',
    name: 'The Elba Coat',
    material: 'Pure cashmere, natural undyed',
    price: '4.850',
    variant: 'cashmere',
    imageSrc: '/coat.png',
    index: 0,
  },
  {
    category: 'Small Leather Goods',
    name: 'The Lugano Tote',
    material: 'Vegetable-tanned calfskin, cognac',
    price: '2.200',
    variant: 'leather',
    imageSrc: '/bag.png',
    badge: 'New',
    index: 1,
  },
  {
    category: 'Accessories',
    name: 'The Isola Scarf',
    material: 'Double-faced silk, handrolled',
    price: '780',
    variant: 'silk',
    imageSrc: '/scarf.png',
    index: 2,
  },
]

export function ProductShowcase() {
  return (
    <section className="pc-showcase" aria-labelledby="pc-showcase-title">
      <header className="pc-showcase__header">
        <span className="pc-showcase__eyebrow">Autumn Collection</span>
        <h2 className="pc-showcase__title" id="pc-showcase-title">Made to outlast seasons</h2>
        <p className="pc-showcase__subtitle">
          Each piece is selected for permanence — materials that improve with wear,
          forms that need no introduction.
        </p>
      </header>

      <div className="pc-grid" role="list">
        {products.map((product) => (
          <div key={product.name} role="listitem">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  )
}

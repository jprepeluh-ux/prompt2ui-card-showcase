import { useRef, useState, useEffect } from 'react'
import './MangaCard.css'

export type MangaVariant = 'vinyl' | 'visor' | 'drink'

interface MangaCardProps {
  category: string
  name: string
  description: string
  price: string
  currency?: string
  imageSrc?: string
  badge?: string
  variant: MangaVariant
  index?: number
}

// ── Component ────────────────────────────────────────────────────────────

export function MangaCard({
  category,
  name,
  description,
  price,
  currency = '€',
  imageSrc,
  badge,
  variant,
  index = 0,
}: MangaCardProps) {
  return (
    <article
      className={`manga-card manga--${variant}`}
      style={{ animationDelay: `${0.08 + index * 0.12}s` }}
    >
      <div className="manga-card__image-wrap">
        {imageSrc ? (
          <img
            className="manga-card__image"
            src={imageSrc}
            alt={name}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="manga-card__placeholder"
            role="img"
            aria-label={`${name} — Bild folgt`}
          />
        )}
        {badge && (
          <span className="manga-card__badge" aria-hidden="true">
            {badge}
          </span>
        )}
      </div>

      <div className="manga-card__body">
        <span className="manga-card__category">{category}</span>
        <h3 className="manga-card__name">{name}</h3>
        <p className="manga-card__desc">{description}</p>

        <div className="manga-card__footer">
          <span
            className="manga-card__price"
            aria-label={`Preis: ${currency} ${price}`}
          >
            {currency} {price}
          </span>
          <button
            className="manga-card__cta"
            type="button"
            aria-label={`${name} kaufen — ${currency} ${price}`}
          >
            Get It
          </button>
        </div>
      </div>
    </article>
  )
}

// ── Showcase section ──────────────────────────────────────────────────────

const mangaDrops: MangaCardProps[] = [
  {
    category: 'Collectibles',
    name: 'Neon-Shogun Vinyl Figure',
    description:
      '18cm limited resin cast. Glow-in-the-dark accents, hand-painted finish, individually numbered.',
    price: '189',
    variant: 'vinyl',
    imageSrc: '/SD_shohun_01.png',
    badge: 'LTD',
    index: 0,
  },
  {
    category: 'Accessories',
    name: 'Cyber-Glitch Visor',
    description:
      'UV-reactive polycarbonate lens. Adjustable strap, one size fits all.',
    price: '79',
    variant: 'visor',
    imageSrc: '/SD_glases_02.png',
    badge: 'NEW',
    index: 1,
  },
  {
    category: 'Lifestyle',
    name: 'Matcha-Shock Energy',
    description:
      '250ml natural caffeine from ceremonial-grade matcha. No crash, no jitters.',
    price: '4.90',
    variant: 'drink',
    imageSrc: '/SD_matcha_03.png',
    badge: 'DROP',
    index: 2,
  },
]

function MangaSwiper() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = track
      const idx = Math.round(scrollLeft / clientWidth)
      setActiveIndex(idx)
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [])

  const goTo = (idx: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: idx * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="manga-swiper-section">
      <div className="manga-swiper-header">
        <span className="manga-swiper-eyebrow">Swipe</span>
      </div>

      <div className="manga-swiper-track" ref={trackRef} role="list">
        {mangaDrops.map((drop) => (
          <div key={`swipe-${drop.name}`} className="manga-swiper-slide" role="listitem">
            <MangaCard {...drop} />
          </div>
        ))}
      </div>

      <div className="manga-swiper-dots" role="tablist" aria-label="Slide-Auswahl">
        {mangaDrops.map((drop, i) => (
          <button
            key={`dot-${i}`}
            className={`manga-swiper-dot${i === activeIndex ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Karte ${i + 1}: ${drop.name}`}
          />
        ))}
      </div>
    </div>
  )
}

export function MangaShowcase() {
  return (
    <section className="manga-showcase" aria-labelledby="manga-showcase-title">
      <header className="manga-showcase__header">
        <span className="manga-showcase__eyebrow">Harajuku × Neo-Tokyo</span>
        <h2 className="manga-showcase__title" id="manga-showcase-title">
          Street
          <br />
          <em>Drops.</em>
        </h2>
      </header>

      <div className="manga-grid" role="list">
        {mangaDrops.map((drop) => (
          <div key={drop.name} role="listitem">
            <MangaCard {...drop} />
          </div>
        ))}
      </div>

      <MangaSwiper />
    </section>
  )
}

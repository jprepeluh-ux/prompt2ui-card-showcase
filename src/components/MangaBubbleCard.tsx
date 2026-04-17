import { useRef, useState, useEffect } from 'react'
import './MangaBubbleCard.css'

interface BubbleCardProps {
  title: string
  description: string
  badge: string
  variant: 'sakura' | 'kurogama' | 'mango'
  imageSrc?: string
  index?: number
}

function MangaBubbleCard({ title, description, badge, variant, imageSrc, index = 0 }: BubbleCardProps) {
  return (
    <article
      className={`bubble-card bubble--${variant}`}
      style={{ animationDelay: `${0.1 + index * 0.15}s` }}
    >
      <span className="bubble-card__badge">{badge}</span>

      <div className="bubble-card__image-wrap">
        {imageSrc ? (
          <img
            className="bubble-card__image"
            src={imageSrc}
            alt={title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="bubble-card__placeholder" role="img" aria-label={title} />
        )}
      </div>

      <div className="bubble-card__body">
        <h3 className="bubble-card__title">
          <span className="bubble-card__title-inner">
            {title.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </span>
        </h3>
        <p className="bubble-card__desc">{description}</p>

        <button
          className="bubble-card__cta"
          type="button"
          aria-label={`${title} bestellen`}
        >
          GET IT NOW
        </button>
      </div>
    </article>
  )
}

const bubbleDrops: BubbleCardProps[] = [
  {
    title: 'Sakura Matcha',
    description: 'Zeremonielle Qualität trifft Kirschblüten-Wahnsinn. Trinken verboten — zu schön.',
    badge: 'HOT',
    variant: 'sakura',
    imageSrc: '/Bubble_01.png',
    index: 0,
  },
  {
    title: 'Kurogama\nSesame',
    description: 'Schwarzer Sesam aus Kyoto. Dunkel, nussig, kompromisslos. Kein Zucker. Deal with it.',
    badge: 'NEW',
    variant: 'kurogama',
    imageSrc: '/Bubble_02.png',
    index: 1,
  },
  {
    title: 'Mango Yuzu\nSparkle',
    description: 'Explodiert im Mund wie ein Feuerwerk über Shibuya. Yuzu-Schärfe, Mango-Wärme.',
    badge: 'HOT',
    variant: 'mango',
    imageSrc: '/Bubble_03.png',
    index: 2,
  },
]

function BubbleSwiper() {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!track || slides.length === 0) return

    slides[0].classList.add('is-active')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const idx = slides.indexOf(entry.target as HTMLDivElement)
          if (idx === -1) return
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active')
            setActiveIndex(idx)
          } else {
            entry.target.classList.remove('is-active')
          }
        })
      },
      { root: track, threshold: 0.55 }
    )

    slides.forEach(slide => observer.observe(slide))
    return () => observer.disconnect()
  }, [])

  const goTo = (idx: number) => {
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!slides[idx]) return
    slides[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <div className="bubble-swiper-section">
      <div className="bubble-swiper-header">
        <span className="bubble-swiper-label">SWIPE</span>
      </div>

      <div className="bubble-swiper-track" ref={trackRef} role="list">
        {bubbleDrops.map((drop, i) => (
          <div
            key={`bswipe-${drop.title}`}
            className="bubble-swiper-slide"
            ref={el => { slideRefs.current[i] = el }}
            role="listitem"
          >
            <MangaBubbleCard {...drop} />
          </div>
        ))}
      </div>

      <div className="bubble-swiper-dots" role="tablist" aria-label="Slide-Auswahl">
        {bubbleDrops.map((_, i) => (
          <button
            key={`bdot-${i}`}
            className={`bubble-swiper-dot${i === activeIndex ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Karte ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export function MangaBubbleShowcase() {
  return (
    <section className="bubble-showcase" aria-labelledby="bubble-showcase-title">
      <div className="bubble-showcase__header">
        <div className="bubble-marquee" aria-hidden="true">
          <div className="bubble-marquee__track">
            <span>HARAJUKU BUBBLE CREW</span>
            <span>★</span>
            <span>HARAJUKU BUBBLE CREW</span>
            <span>★</span>
            <span>HARAJUKU BUBBLE CREW</span>
            <span>★</span>
            <span>HARAJUKU BUBBLE CREW</span>
            <span>★</span>
            <span>HARAJUKU BUBBLE CREW</span>
            <span>★</span>
            <span>HARAJUKU BUBBLE CREW</span>
            <span>★</span>
          </div>
        </div>
        <h2 className="bubble-showcase__title" id="bubble-showcase-title">
          HARAJUKU<br />BUBBLE CREW
        </h2>
      </div>

      <div className="bubble-grid">
        {bubbleDrops.map((drop) => (
          <MangaBubbleCard key={drop.title} {...drop} />
        ))}
      </div>

      <BubbleSwiper />
    </section>
  )
}

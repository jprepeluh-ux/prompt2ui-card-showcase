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
    </section>
  )
}

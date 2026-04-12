import './KFoodCard.css'

interface KFoodCardProps {
  title: string
  subtitle: string
  price: string
  variant: 'orange' | 'yellow' | 'red'
  imageSrc: string
  index?: number
}

function KFoodCard({ title, subtitle, price, variant, imageSrc, index = 0 }: KFoodCardProps) {
  return (
    <article
      className={`kfood-card kfood--${variant}`}
      style={{ animationDelay: `${0.1 + index * 0.18}s` }}
    >
      {/* Image — top, full width, 16/9 */}
      <div className="kfood-card__image-wrap">
        <img
          className="kfood-card__image"
          src={imageSrc}
          alt={title}
          loading="lazy"
          decoding="async"
        />
        <div className="kfood-card__price-tag">
          <span className="kfood-card__price-amount">{price}</span>
          <div className="kfood-card__barcode" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="kfood-card__barcode-line" />
            ))}
          </div>
          <span className="kfood-card__barcode-num">4902-SEOUL</span>
        </div>
      </div>

      {/* Content: side label + body */}
      <div className="kfood-card__content">
        <div className="kfood-card__side-banner" aria-hidden="true">
          <span className="kfood-card__side-text">SEOUL</span>
          <span className="kfood-card__side-hangul">서울</span>
        </div>

        <div className="kfood-card__body">
          <div>
            <h3 className="kfood-card__title">{title}</h3>
            <p className="kfood-card__subtitle">{subtitle}</p>
          </div>
          <button className="kfood-card__cta" type="button">
            <span className="kfood-card__cta-label">Order Now</span>
          </button>
        </div>
      </div>
    </article>
  )
}

const kfoodItems: KFoodCardProps[] = [
  {
    title: 'Kimchi Dynamite Fries',
    subtitle: 'Aged kimchi, gochujang aioli, crispy shallots.',
    price: '₩ 12,000',
    variant: 'orange',
    imageSrc: '/korea_01.png',
    index: 0,
  },
  {
    title: 'Honey Garlic Fried Chicken',
    subtitle: 'Double-fried. Honey-glazed. 48-hour brine.',
    price: '₩ 18,500',
    variant: 'yellow',
    imageSrc: '/korea_02.png',
    index: 1,
  },
  {
    title: 'Tteokbokki Lava Bowl',
    subtitle: 'Rice cakes, fire sauce, melted cheese pull.',
    price: '₩ 10,000',
    variant: 'red',
    imageSrc: '/korea_03.png',
    index: 2,
  },
]

export function KFoodShowcase() {
  return (
    <section className="kfood-showcase" aria-labelledby="kfood-title">
      <div className="kfood-showcase__header">
        <h2 className="kfood-showcase__title" id="kfood-title">
          SEOUL<br />NIGHT<br />BITES
        </h2>
        <p className="kfood-showcase__sub">Street food. No apologies.</p>
      </div>

      <div className="kfood-grid">
        {kfoodItems.map((item) => (
          <KFoodCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  )
}

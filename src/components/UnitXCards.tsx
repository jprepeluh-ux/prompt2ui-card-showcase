import './UnitXCards.css'

interface UnitXCardProps {
  title: string
  subtitle: string
  serialNo: string
  edition: string
  rarity: string
  accent: string
  imageSrc: string
  index?: number
}

function UnitXCard({ title, subtitle, serialNo, edition, rarity, accent, imageSrc, index = 0 }: UnitXCardProps) {
  return (
    <article
      className="unitx-card"
      style={{ '--accent': accent, animationDelay: `${index * 0.14}s` } as React.CSSProperties}
    >
      <div className="unitx-card__image-wrap">
        <img
          className="unitx-card__image"
          src={imageSrc}
          alt={title}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="unitx-card__body">
        {/* Accent bar on the right edge */}
        <div className="unitx-card__accent-bar" aria-hidden="true" />

        <span className="unitx-card__label">UNIT X</span>
        <h3 className="unitx-card__title">{title}</h3>
        <p className="unitx-card__subtitle">{subtitle}</p>

        <dl className="unitx-card__specs">
          <div className="unitx-card__spec-row">
            <dt>SERIAL NO</dt>
            <dd>{serialNo}</dd>
          </div>
          <div className="unitx-card__spec-row">
            <dt>EDITION</dt>
            <dd>{edition}</dd>
          </div>
          <div className="unitx-card__spec-row">
            <dt>RARITY</dt>
            <dd>{rarity}</dd>
          </div>
        </dl>

        <button className="unitx-card__cta" type="button">
          ACQUIRE UNIT
        </button>
      </div>
    </article>
  )
}

const units: UnitXCardProps[] = [
  {
    title: 'RETRO-FUTURISTIC SPACE EXPLORER',
    subtitle: 'SPACE EXPLORER',
    serialNo: 'UX-2026-001',
    edition: 'FIRST WAVE',
    rarity: 'RARE ◆◆◆◇◇',
    accent: '#FF4500',
    imageSrc: '/unitx_03_street-art.png',
    index: 0,
  },
  {
    title: 'CYBERPUNK STREET WARRIOR',
    subtitle: 'STREET WARRIOR',
    serialNo: 'UX-2026-002',
    edition: 'NEON DROP',
    rarity: 'EPIC ◆◆◆◆◇',
    accent: '#00F3FF',
    imageSrc: '/unitx_02_space-explorer.png',
    index: 1,
  },
  {
    title: 'URBAN STREET ART COLLECTIBLE',
    subtitle: 'STREET ART',
    serialNo: 'UX-2026-003',
    edition: 'ULTRA LTD',
    rarity: 'LEGENDARY ◆◆◆◆◆',
    accent: '#FF0000',
    imageSrc: '/unitx_01_cyberpunk-warrior.png',
    index: 2,
  },
]

export function UnitXShowcase() {
  return (
    <section className="unitx-showcase" aria-labelledby="unitx-title">
      <header className="unitx-showcase__header">
        <p className="unitx-showcase__eyebrow">ELITE COLLECTIBLES // 2026</p>
        <h2 className="unitx-showcase__title" id="unitx-title">UNIT X</h2>
        <p className="unitx-showcase__sub">THREE FIGURES. ZERO COMPROMISE. STRICTLY LIMITED.</p>
      </header>

      <div className="unitx-grid">
        {units.map((unit) => (
          <UnitXCard key={unit.serialNo} {...unit} />
        ))}
      </div>
    </section>
  )
}

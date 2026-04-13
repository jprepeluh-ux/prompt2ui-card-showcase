import type { CSSProperties } from 'react'
import './UnitXGallery.css'

interface UnitEntry {
  lotNo: string
  unitId: string
  nameLines: string[]
  tagline: string
  serialNo: string
  edition: string
  rarity: string
  accent: string
  imageSrc: string
  index: number
}

function UnitGalleryEntry({
  lotNo, unitId, nameLines, tagline,
  serialNo, edition, rarity, accent, imageSrc, index,
}: UnitEntry) {
  return (
    <article
      className="ux2-entry"
      style={{ '--accent': accent, '--idx': index } as CSSProperties}
    >
      <div className="ux2-entry__lot-bg" aria-hidden="true">{lotNo}</div>

      <div className="ux2-entry__image-col">
        <img
          className="ux2-entry__image"
          src={imageSrc}
          alt={nameLines.join(' ')}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="ux2-entry__content">
        <div className="ux2-entry__meta">
          <span className="ux2-entry__unit-id">UNIT X — {unitId}</span>
          <span className="ux2-entry__lot-tag" aria-hidden="true">LOT {lotNo}</span>
        </div>

        <h3 className="ux2-entry__name">
          {nameLines.map((line, i) => (
            <span key={i} className="ux2-entry__name-line">{line}</span>
          ))}
        </h3>

        <p className="ux2-entry__tagline">{tagline}</p>

        <dl className="ux2-entry__spec-plate">
          <div className="ux2-entry__spec">
            <dt>SERIAL NO.</dt>
            <dd>{serialNo}</dd>
          </div>
          <div className="ux2-entry__spec">
            <dt>EDITION</dt>
            <dd>{edition}</dd>
          </div>
          <div className="ux2-entry__spec">
            <dt>RARITY</dt>
            <dd>{rarity}</dd>
          </div>
        </dl>

        <button className="ux2-entry__cta" type="button">
          ACQUIRE UNIT
        </button>
      </div>
    </article>
  )
}

const UNITS: UnitEntry[] = [
  {
    lotNo: '001',
    unitId: '001 / 2026',
    nameLines: ['CYBERPUNK', 'STREET', 'WARRIOR'],
    tagline: 'Forged in neon and chrome. No mercy for the mundane.',
    serialNo: 'UX-2026-001',
    edition: 'NEON DROP',
    rarity: 'EPIC ◆◆◆◆◇',
    accent: '#00F3FF',
    imageSrc: '/unitx_02_space-explorer.png',
    index: 0,
  },
  {
    lotNo: '002',
    unitId: '002 / 2026',
    nameLines: ['RETRO-FUTURISTIC', 'SPACE', 'EXPLORER'],
    tagline: 'Launched beyond the atmosphere. Landed in your collection.',
    serialNo: 'UX-2026-002',
    edition: 'FIRST WAVE',
    rarity: 'RARE ◆◆◆◇◇',
    accent: '#FF4500',
    imageSrc: '/unitx_03_street-art.png',
    index: 1,
  },
  {
    lotNo: '003',
    unitId: '003 / 2026',
    nameLines: ['URBAN', 'STREET ART', 'COLLECTIBLE'],
    tagline: "Streets bred it. Galleries couldn't contain it.",
    serialNo: 'UX-2026-003',
    edition: 'ULTRA LTD',
    rarity: 'LEGENDARY ◆◆◆◆◆',
    accent: '#FF0000',
    imageSrc: '/unitx_01_cyberpunk-warrior.png',
    index: 2,
  },
]

export function UnitXGalleryShowcase() {
  return (
    <section className="ux2-showcase" aria-labelledby="ux2-title">
      <header className="ux2-header">
        <p className="ux2-header__classification">ELITE COLLECTIBLES — SERIES 2026</p>
        <div className="ux2-header__title-row">
          <h2 className="ux2-header__title" id="ux2-title">UNIT X</h2>
          <p className="ux2-header__sub">
            Three figures.<br />
            Zero compromise.<br />
            Strictly limited.
          </p>
        </div>
      </header>

      <div className="ux2-catalog">
        {UNITS.map((unit) => (
          <UnitGalleryEntry key={unit.lotNo} {...unit} />
        ))}
      </div>
    </section>
  )
}

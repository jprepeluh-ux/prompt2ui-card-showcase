import { useEffect } from 'react'
import './App.css'
import { ProductShowcase } from './components/ProductCard'
import { HipHopShowcase } from './components/HipHopCard'
import { PopArtShowcase } from './components/PopArtCard'
import { MangaShowcase } from './components/MangaCard'
import { GlassShowcase } from './components/GlassCard'
import { MangaBubbleShowcase } from './components/MangaBubbleCard'
import { KFoodShowcase } from './components/KFoodCard'

function App() {
  useEffect(() => {
    const CARD_SELECTORS = [
      '.pc',
      '.hh-card',
      '.pop-slot',
      '.manga-card',
      '.glass-card',
      '.bubble-card',
      '.kfood-card',
    ].join(', ')

    const cards = document.querySelectorAll(CARD_SELECTORS)
    cards.forEach(card => card.setAttribute('data-reveal', ''))

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const siblings = Array.from(el.parentElement?.children ?? [])
          const idx = siblings.indexOf(el)
          el.style.animationDelay = `${idx * 0.11}s`
          el.classList.add('is-visible')
          observer.unobserve(el)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <ProductShowcase />
      <HipHopShowcase />
      <PopArtShowcase />
      <MangaShowcase />
      <GlassShowcase />
      <MangaBubbleShowcase />
      <KFoodShowcase />
    </>
  )
}

export default App

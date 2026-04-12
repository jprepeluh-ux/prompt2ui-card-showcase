import './App.css'
import { ProductShowcase } from './components/ProductCard'
import { HipHopShowcase } from './components/HipHopCard'
import { PopArtShowcase } from './components/PopArtCard'
import { MangaShowcase } from './components/MangaCard'
import { GlassShowcase } from './components/GlassCard'
import { MangaBubbleShowcase } from './components/MangaBubbleCard'
import { KFoodShowcase } from './components/KFoodCard'

function App() {
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

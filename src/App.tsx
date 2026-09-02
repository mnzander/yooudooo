import { lazy, Suspense, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// El fondo es decorativo y arrastra el shader de OGL: fuera del bundle inicial.
const Topography = lazy(() => import('@/components/Topography'))
import Nav from '@/components/Nav'
import NegativeCursor from '@/components/NegativeCursor'
import Hero from '@/sections/Hero'
import Stats from '@/sections/Stats'
import About from '@/sections/About'
import Products from '@/sections/Products'
import Contact from '@/sections/Contact'

export default function App() {
  // El hero (ScrollExpand) fija la altura de su track tras montar, lo que desplaza
  // el resto de secciones. Sin este refresco los ScrollTrigger se disparan fuera de sitio.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(refresh)
    window.addEventListener('load', refresh)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <>
      {/* Curvas de nivel: el lenguaje visual del terreno, acorde a un todoterreno */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <Suspense fallback={null}>
          <Topography
            colorMode="elevation"
            lowColor="#1d2600"
            midColor="#6f8c00"
            highColor="#b9e901"
            speed={0.14}
            morphAmount={2.2}
            morphSpeed={0.03}
            bands={2.4}
            thickness={0.006}
            scale={1.15}
            glow={0.35}
            contrast={2.4}
            brightness={0.85}
            opacity={0.28}
            grain
            grainIntensity={0.035}
            mouseInteraction={false}
          />
        </Suspense>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(185,233,1,0.05),transparent_60%)]" />
      </div>

      <Nav />

      <main>
        <Hero />
        <Stats />
        <About />
        <Products />
        <Contact />
      </main>

      <NegativeCursor />
    </>
  )
}

import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Particles from '@/components/Particles'
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
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <Particles
          particleCount={190}
          particleSpread={11}
          speed={0.06}
          particleColors={['#b9e901', '#d0ff2b', '#5c7400']}
          particleBaseSize={62}
          sizeRandomness={0.9}
          alphaParticles
          moveParticlesOnHover
          particleHoverFactor={0.4}
          disableRotation={false}
        />
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

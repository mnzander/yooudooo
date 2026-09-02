import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from '@/components/Nav'
import NegativeCursor from '@/components/NegativeCursor'
import BackToTop from '@/components/BackToTop'
import GarageReveal from '@/components/GarageReveal'
import Hero from '@/sections/Hero'
import Stats from '@/sections/Stats'
import About from '@/sections/About'
import Products from '@/sections/Products'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

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
      {/* Fondo plano: halo tenue de marca + grano, sin shader que compita con el contenido */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-ink">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(185,233,1,0.07),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_110%,rgba(185,233,1,0.04),transparent_60%)]" />
        <div className="grain-layer absolute -inset-[50%] opacity-[0.035]" />
      </div>

      <Nav />

      <main>
        <Hero />

        <GarageReveal>
          <Stats />
          <About />
        </GarageReveal>

        {/* El bloque claro monta sobre la sección anterior con esquinas redondeadas:
            un degradado negro→blanco cruza los grises medios y se lee como una
            banda sucia, no como un fundido. */}
        <div className="relative z-10 -mt-6 rounded-t-[2rem] bg-bone text-ink shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.8)] sm:-mt-10 sm:rounded-t-[3.5rem]">
          <Products />
          <Contact />
        </div>
      </main>

      <Footer />

      <BackToTop />
      <NegativeCursor />
    </>
  )
}

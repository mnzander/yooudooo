import { useEffect, useState } from 'react'
import { ArrowDown, MapPin } from 'lucide-react'
import ScrollExpand from '@/components/ScrollExpand'
import BlurText from '@/components/BlurText'
import RotatingText from '@/components/RotatingText'
import { useDeviceProfile } from '@/hooks/useDeviceProfile'
import { dealer } from '@/data/models'

const PAGE_GUTTER = 24 // px-6, el margen lateral del resto de secciones

/**
 * El marco de partida en porcentaje del viewport. Un valor fijo se queda
 * ridículamente estrecho en móvil (38 % de 375 px son 142 px), así que en
 * pantallas pequeñas arranca al ancho de los márgenes de la página y sólo se
 * estrecha en pantallas grandes, donde hace falta recorrido para que la
 * expansión se note.
 */
function getStartFrame(vw: number) {
  const gutterPct = (PAGE_GUTTER / vw) * 100
  if (vw < 640) return { width: 100 - gutterPct * 2, height: 52, radius: 20 }
  if (vw < 1024) return { width: 74, height: 58, radius: 24 }
  return { width: 46, height: 64, radius: 28 }
}

export default function Hero() {
  const [frame, setFrame] = useState(() =>
    getStartFrame(typeof window === 'undefined' ? 1440 : window.innerWidth)
  )
  const device = useDeviceProfile()

  useEffect(() => {
    const onResize = () => setFrame(getStartFrame(window.innerWidth))
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // En equipos flojos el frame congelado evita la decodificación por frame, que
  // es lo que hacía parpadear el vídeo; el resto recibe la copia que le encaja.
  const source = device.lite
    ? { type: 'image' as const, src: '/media/hero-poster.jpg' }
    : { type: 'video' as const, src: device.small ? '/media/hero-sm.mp4' : '/media/hero.mp4' }

  return (
    <section id="inicio" className="relative">
      <ScrollExpand
        useWindowScroll
        mediaType={source.type}
        src={source.src}
        poster="/media/hero-poster.jpg"
        alt="Yooudooo 6 circulando por el monte"
        startWidth={frame.width}
        startHeight={frame.height}
        startRadius={frame.radius}
        mediaZoom={1.45}
        scrollDistance={1.15}
        holdDistance={0.85}
        overlayScrim={0.6}
        title={
          <span className="flex flex-col items-center gap-[0.55em]">
            <span className="font-display text-[max(0.75rem,0.17em)] leading-none font-semibold tracking-[0.35em] text-white/60 uppercase">
              {dealer.company}
            </span>
            <span className="font-display leading-[0.9] font-black tracking-[-0.04em] uppercase">
              Yooudooo <span className="text-lime">212</span>
            </span>
          </span>
        }
        scrollHint={
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase">
            <ArrowDown className="size-3.5 animate-bounce" />
            Desplázate
          </span>
        }
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-7">
          <span className="flex items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-lime uppercase backdrop-blur-sm">
            Yooudooo 6
            <span aria-hidden className="text-lime/70">·</span>
            <RotatingText
              texts={['Gasolina', 'Diésel', 'Navigator']}
              rotationInterval={2600}
              staggerDuration={0.02}
              splitBy="characters"
              mainClassName="justify-center overflow-hidden"
              splitLevelClassName="overflow-hidden"
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            />
          </span>

          <h1 className="font-display text-[clamp(2rem,4.6vw,4rem)] font-black text-balance text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]">
            El único concesionario en <span className="text-lime">Bizkaia</span>
          </h1>

          <BlurText
            text={`Venta oficial del Yooudooo 6 con ${dealer.warrantyYears} años de garantía y servicio postventa propio en Bilbao.`}
            animateBy="words"
            direction="bottom"
            delay={45}
            className="max-w-xl justify-center text-base text-white/70 sm:text-lg"
          />

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#productos"
              className="rounded-full bg-lime px-7 py-3.5 text-sm font-bold tracking-wide text-ink uppercase transition-all duration-300 hover:bg-lime-bright hover:shadow-[0_0_40px_-6px_var(--color-lime)]"
            >
              Ver modelos
            </a>
            <a
              href="#contacto"
              className="flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              <MapPin className="size-4" />
              Visítanos
            </a>
          </div>
        </div>
      </ScrollExpand>
    </section>
  )
}

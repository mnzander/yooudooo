import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface GarageRevealProps {
  children: ReactNode
}

/**
 * El Yooudooo de frente esperando en la penumbra: arranca casi invisible y el
 * scroll lo va sacando de la sombra, como si se encendiera una luz en el garaje.
 */
export default function GarageReveal({ children }: GarageRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const layer = layerRef.current
    const img = imgRef.current
    if (!root || !layer || !img) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(layer, { opacity: 0.4 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer,
        { opacity: 0.06 },
        {
          opacity: 0.62,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'center center', scrub: 0.6 },
        }
      )

      gsap.fromTo(
        img,
        { scale: 1.18 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      <div ref={layerRef} aria-hidden className="pointer-events-none absolute inset-0 opacity-0">
        <img
          ref={imgRef}
          src="/media/modelos/y6-diesel.jpg"
          alt=""
          className="size-full object-cover object-center will-change-transform"
          loading="lazy"
        />
        {/* Penumbra: velo plano + viñeta que apaga los bordes y deja sólo el frontal */}
        <div className="absolute inset-0 bg-ink/66" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_48%,transparent_0%,rgba(5,5,5,0.55)_45%,rgba(5,5,5,0.92)_78%,#050505_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative">{children}</div>
    </div>
  )
}

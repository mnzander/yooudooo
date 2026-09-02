import { useEffect, useRef, useState } from 'react'

const RING = 34
const IDLE_SCALE = 1
const HOVER_SCALE = 1.9

/** Lima sobre las secciones oscuras; sobre el bloque claro daría 1,43:1 y no se vería. */
const LIME = '#b9e901'
const MOSS = '#4a5d00'

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label'

/**
 * Puntero de marca: un aro fino que persigue al ratón con inercia y un punto que
 * va pegado a él, para no perder precisión. Sólo en escritorio con ratón: en
 * táctil no hay puntero que sustituir y dejaría la página sin cursor.
 */
export default function BrandCursor() {
  const ringRef = useRef<SVGSVGElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
    const apply = () => setEnabled(query.matches)
    apply()
    query.addEventListener('change', apply)
    // Si "change" no llega, la página se quedaría con cursor: none y sin puntero.
    window.addEventListener('resize', apply)
    return () => {
      query.removeEventListener('change', apply)
      window.removeEventListener('resize', apply)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    let scale = IDLE_SCALE
    let targetScale = IDLE_SCALE
    let visible = false
    let colour = LIME
    let raf = 0

    const paint = (next: string) => {
      if (next === colour) return
      colour = next
      ring.style.color = next
      dot.style.backgroundColor = next
    }

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY

      const el = e.target as Element | null
      targetScale = el?.closest?.(INTERACTIVE) ? HOVER_SCALE : IDLE_SCALE
      paint(el?.closest?.('.bg-bone') ? MOSS : LIME)

      // El punto va sin suavizado: es el que marca dónde se hace clic.
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`

      if (!visible) {
        visible = true
        x = targetX
        y = targetY
        ring.style.opacity = '1'
        dot.style.opacity = '1'
        // El puntero del sistema se oculta sólo cuando el nuestro ya se ve.
        document.documentElement.classList.add('has-custom-cursor')
      }
    }

    const onLeave = () => {
      visible = false
      ring.style.opacity = '0'
      dot.style.opacity = '0'
    }

    const tick = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      scale += (targetScale - scale) * 0.16
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* SVG y non-scaling-stroke: al crecer sobre un enlace el aro sigue fino
          y sin dentar, cosa que un borde CSS escalado no consigue. */}
      <svg
        ref={ringRef}
        aria-hidden
        width={RING}
        height={RING}
        viewBox={`0 0 ${RING} ${RING}`}
        className="pointer-events-none fixed top-0 left-0 z-[999] opacity-0"
        style={{ color: LIME, willChange: 'transform' }}
      >
        <circle
          cx={RING / 2}
          cy={RING / 2}
          r={RING / 2 - 1}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[999] size-[5px] rounded-full opacity-0"
        style={{ backgroundColor: LIME, willChange: 'transform' }}
      />
    </>
  )
}

import { useEffect, useRef, useState } from 'react'

/* El círculo se dibuja ya al tamaño de hover y el reposo se consigue
   encogiéndolo. Al revés (26 px escalados a 2,4) el navegador amplía el mapa de
   bits ya rasterizado y el borde sale dentado. */
const RENDER_SIZE = 64
const IDLE_SCALE = 26 / RENDER_SIZE
const HOVER_SCALE = 1

/**
 * Puntero circular blanco que invierte todo lo que queda debajo (mix-blend-mode:
 * difference). Solo se activa con ratón: en táctil no hay cursor que sustituir y
 * dejaría la página sin puntero.
 */
export default function NegativeCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Sólo escritorio: "pointer: fine" por sí solo lo activaría también en un
    // iPad con trackpad, así que se exige además hover real y pantalla grande.
    const query = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
    const apply = () => setEnabled(query.matches)
    apply()
    query.addEventListener('change', apply)
    // Respaldo: si "change" no llega, la página se quedaría con cursor: none y
    // sin puntero visible, así que se reevalúa también al redimensionar.
    window.addEventListener('resize', apply)
    return () => {
      query.removeEventListener('change', apply)
      window.removeEventListener('resize', apply)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    if (!dot) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    let scale = IDLE_SCALE
    let targetScale = IDLE_SCALE
    let visible = false
    let raf = 0

    const interactive = 'a, button, [role="button"], input, select, textarea, label'

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      targetScale = (e.target as Element)?.closest?.(interactive) ? HOVER_SCALE : IDLE_SCALE
      if (!visible) {
        visible = true
        x = targetX
        y = targetY
        dot.style.opacity = '1'
        // Se oculta el puntero del sistema solo cuando el círculo ya es visible,
        // para no dejar la página sin cursor si el ratón aún no se ha movido.
        document.documentElement.classList.add('has-custom-cursor')
      }
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
    }

    const tick = () => {
      x += (targetX - x) * 0.22
      y += (targetY - y) * 0.22
      scale += (targetScale - scale) * 0.16
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`
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
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full bg-white opacity-0 mix-blend-difference"
      style={{ width: RENDER_SIZE, height: RENDER_SIZE, willChange: 'transform' }}
    />
  )
}

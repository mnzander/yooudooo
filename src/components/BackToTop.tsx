import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * Atajo al inicio, siempre a mano en la esquina inferior derecha. Aparece en
 * cuanto se deja atrás la primera pantalla: arriba del todo no tendría sentido.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // El umbral se fija una vez: si se recalcula con innerHeight en cada scroll,
    // la barra de direcciones del móvil lo mueve y el botón parpadea al frenar.
    const threshold = window.innerHeight * 0.8
    const onScroll = () => setVisible(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Volver arriba"
      // inert cuando está oculto: si no, seguiría siendo enfocable con el tabulador
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-5 bottom-5 z-90 grid size-12 place-items-center rounded-full border border-lime/40 bg-ink/85 text-lime shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-lime hover:bg-lime hover:text-ink sm:right-8 sm:bottom-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="size-5" strokeWidth={2.2} />
    </button>
  )
}

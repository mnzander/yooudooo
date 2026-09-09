import { useEffect } from 'react'

let locks = 0
let saved = { overflow: '', paddingRight: '' }

/**
 * Congela la página mientras hay un modal abierto.
 *
 * Sólo el body: el navegador propaga su desbordamiento al viewport y con eso
 * basta. Bloquear además el <html> dejaba sin desplazar el contenido interno
 * del propio modal en móvil.
 *
 * El contador permite modales encajados (la verificación de WhatsApp se abre
 * sobre la ficha del Y3MAX): sólo el último en cerrarse devuelve el scroll.
 */
export default function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    const body = document.body

    if (locks === 0) {
      saved = { overflow: body.style.overflow, paddingRight: body.style.paddingRight }

      // Al ocultar el desbordamiento desaparece la barra de scroll y el
      // contenido se ensancha de golpe. Se compensa con su mismo ancho.
      const gutter = window.innerWidth - document.documentElement.clientWidth

      body.style.overflow = 'hidden'
      if (gutter > 0) body.style.paddingRight = `${gutter}px`
    }

    locks++

    return () => {
      locks--
      if (locks === 0) {
        body.style.overflow = saved.overflow
        body.style.paddingRight = saved.paddingRight
      }
    }
  }, [active])
}

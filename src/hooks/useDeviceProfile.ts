import { useEffect, useState } from 'react'

export interface DeviceProfile {
  /** Equipo flojo o usuario que ha pedido menos movimiento: nada de vídeo ni efectos caros. */
  lite: boolean
  /** Pantalla pequeña: basta la copia ligera del vídeo. */
  small: boolean
  ready: boolean
}

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number
  connection?: { saveData?: boolean; effectiveType?: string }
}

function detect(): Omit<DeviceProfile, 'ready'> {
  const nav = navigator as NavigatorWithHints
  const small = window.innerWidth < 768

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fewCores = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4
  const saveData = nav.connection?.saveData === true
  const slowNet = /(^|-)2g$/.test(nav.connection?.effectiveType ?? '')

  return { lite: reduceMotion || saveData || slowNet || (fewCores && lowMemory), small }
}

/**
 * El vídeo del hero decodifica en cada frame mientras se le anima el recorte:
 * en equipos flojos eso satura la CPU y la reproducción parpadea. Aquí se decide
 * si servir la versión ligera o directamente una imagen fija.
 */
export function useDeviceProfile(): DeviceProfile {
  // Se resuelve ya en el primer render: si esperase a un efecto, el hero pediría
  // el vídeo grande y acto seguido el pequeño, descargando los dos.
  const [profile, setProfile] = useState<DeviceProfile>(() =>
    typeof window === 'undefined'
      ? { lite: false, small: false, ready: false }
      : { ...detect(), ready: true }
  )

  useEffect(() => {
    const apply = () =>
      setProfile(prev => {
        const next = { ...detect(), ready: true }
        return prev.lite === next.lite && prev.small === next.small && prev.ready ? prev : next
      })
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  return profile
}

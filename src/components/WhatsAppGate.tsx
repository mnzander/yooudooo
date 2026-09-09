import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { dealer } from '@/data/models'
import { WhatsAppIcon } from '@/components/BrandIcons'
import useScrollLock from '@/hooks/useScrollLock'

type Status = 'idle' | 'checking' | 'verified'

interface WhatsAppGateProps {
  className?: string
  children: ReactNode
}

/**
 * El enlace a wa.me sólo se monta en el DOM tras la verificación: los robots que
 * rastrean la web buscando números de WhatsApp leen el HTML, no interactúan con él.
 */
export default function WhatsAppGate({ className, children }: WhatsAppGateProps) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {/* La tarjeta de contacto lleva backdrop-filter y transforms, y ambos crean
          bloque contenedor para position:fixed: sin portal el modal se recortaría
          dentro de la tarjeta en vez de cubrir la pantalla. */}
      {open ? createPortal(<GateDialog onClose={close} />, document.body) : null}
    </>
  )
}

function GateDialog({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const closeRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef<number>(0)

  useScrollLock(true)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(timerRef.current)
    }
  }, [onClose])

  const verify = () => {
    if (status !== 'idle') return
    setStatus('checking')
    timerRef.current = window.setTimeout(() => setStatus('verified'), 1100)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Verificación antes de abrir WhatsApp"
      className="fixed inset-0 z-100 flex items-end justify-center overflow-y-auto bg-ink/85 p-0 backdrop-blur-md duration-300 animate-in fade-in sm:items-center sm:p-6"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-t-3xl border border-ink-line bg-ink-soft p-7 duration-500 animate-in slide-in-from-bottom-8 sm:rounded-3xl sm:p-9">
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Cerrar verificación"
          className="absolute top-4 right-4 rounded-full border border-white/20 bg-ink/60 p-2.5 text-white transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-ink"
        >
          <X className="size-4" />
        </button>

        <WhatsAppIcon className="size-7 text-lime" />

        <h3 className="mt-5 text-2xl text-white">Antes de continuar</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          Confirma que no eres un robot. Es un paso rápido que usamos para evitar el spam
          automatizado en nuestro WhatsApp.
        </p>

        <p className="mt-5 flex items-center gap-3 rounded-xl border border-lime/25 bg-lime/10 px-4 py-3 text-sm leading-snug font-bold text-lime">
          {/* Bandera en SVG y no emoji: Windows no dibuja los emojis de bandera
              de país y en su lugar aparecen las letras «ES». */}
          <svg
            viewBox="0 0 9 6"
            aria-hidden="true"
            className="h-3.5 w-5 shrink-0 rounded-[2px] border border-white/15"
          >
            <rect width="9" height="6" fill="#aa151b" />
            <rect y="1.5" width="9" height="3" fill="#f1bf00" />
          </svg>
          Atendemos consultas únicamente desde España.
        </p>

        <button
          type="button"
          onClick={verify}
          disabled={status !== 'idle'}
          aria-live="polite"
          className={`mt-7 flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors duration-300 ${
            status === 'verified'
              ? 'border-lime/50 bg-lime/10'
              : 'border-ink-line bg-ink-card/70 enabled:hover:border-lime/50'
          }`}
        >
          <span
            className={`grid size-7 shrink-0 place-items-center rounded-md border-2 transition-colors duration-300 ${
              status === 'verified' ? 'border-lime bg-lime' : 'border-white/25'
            }`}
          >
            {status === 'checking' ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white/20 border-t-lime" />
            ) : null}
            {status === 'verified' ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-4 text-ink"
              >
                <path d="m5 12.5 4.5 4.5L19 7" />
              </svg>
            ) : null}
          </span>
          <span className="text-sm font-medium text-white/85">
            {status === 'idle' ? 'No soy un robot' : null}
            {status === 'checking' ? 'Comprobando…' : null}
            {status === 'verified' ? 'Verificado' : null}
          </span>
        </button>

        {status === 'verified' ? (
          <a
            href={`https://wa.me/${dealer.whatsappLink}?text=${encodeURIComponent(dealer.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="mt-4 flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-lime px-6 py-4 text-sm font-bold tracking-wide text-ink uppercase transition-colors duration-300 hover:bg-lime-bright"
          >
            <WhatsAppIcon className="size-4" />
            Abrir WhatsApp
          </a>
        ) : (
          <span
            aria-hidden="true"
            className="mt-4 flex min-h-11 cursor-not-allowed items-center justify-center gap-2.5 rounded-full bg-white/10 px-6 py-4 text-sm font-bold tracking-wide text-white/35 uppercase"
          >
            <WhatsAppIcon className="size-4" />
            Abrir WhatsApp
          </span>
        )}

        <p className="mt-4 text-center text-xs text-white/40">
          Se abre en una pestaña nueva: WhatsApp Web en ordenador, la app en el móvil.
        </p>
      </div>
    </div>
  )
}

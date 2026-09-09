import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, Phone } from 'lucide-react'
import { y3max } from '@/data/y3max'
import { dealer } from '@/data/models'
import useScrollLock from '@/hooks/useScrollLock'
import WhatsAppGate from '@/components/WhatsAppGate'
import { WhatsAppIcon } from '@/components/BrandIcons'

interface Y3MaxModalProps {
  open: boolean
  onClose: () => void
}

export default function Y3MaxModal({ open, onClose }: Y3MaxModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  // Al body por el mismo motivo que ModelModal: desde dentro del bloque claro
  // (z-10) ningún z-index gana al pie (z-20), que es hermano suyo.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Información del ${y3max.name}`}
      className="fixed inset-0 z-100 flex items-end justify-center overflow-y-auto bg-ink/85 p-0 backdrop-blur-md duration-300 animate-in fade-in sm:items-center sm:p-6"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-t-3xl border border-ink-line bg-ink-soft duration-500 animate-in slide-in-from-bottom-8 sm:rounded-3xl">
        <div
          className="relative"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 62% 52% at 50% 42%, #33372c 0%, #1b1d18 45%, transparent 72%)',
          }}
        >
          <img
            src={y3max.image}
            alt={`${y3max.name}, híbrido enchufable, vista tres cuartos delantera`}
            className="mx-auto block w-full max-w-lg px-6 py-8"
            decoding="async"
          />

          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Cerrar información"
            className="absolute top-4 right-4 rounded-full border border-white/20 bg-ink/60 p-2.5 text-white backdrop-blur-sm transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-ink"
          >
            <X className="size-4" />
          </button>

          <div className="px-6 pb-6 sm:px-8">
            <span className="text-xs font-semibold tracking-[0.25em] text-lime uppercase">
              {y3max.kind}
            </span>
            <h3 className="mt-2 text-3xl text-white sm:text-4xl">{y3max.name}</h3>
          </div>
        </div>

        <div className="max-h-[55vh] overflow-y-auto overscroll-contain px-6 pb-8 sm:px-8">
          <div className="grid grid-cols-2 gap-3 border-b border-ink-line py-6 sm:grid-cols-4">
            {y3max.highlights.map(fact => (
              <div key={fact.label} className="rounded-xl bg-ink-card/70 p-4">
                <p className="text-accent-italic text-3xl leading-none text-lime">
                  {fact.value}
                  <span className="ml-1 text-[0.45em]">{fact.unit}</span>
                </p>
                <p className="mt-3 text-xs leading-snug tracking-[0.12em] text-white/55 uppercase">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>

          {y3max.specs.map(group => (
            <div key={group.group} className="border-b border-ink-line py-6 last:border-0">
              <h4 className="text-sm tracking-[0.15em] text-lime">{group.group}</h4>
              <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {group.items.map(item => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 border-b border-ink-line/60 pb-2.5"
                  >
                    <dt className="text-sm text-white/55">{item.label}</dt>
                    <dd className="text-right text-sm font-medium text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${dealer.phoneLink}`}
              className="flex min-h-11 flex-1 items-center justify-center gap-2.5 rounded-full bg-lime px-6 py-4 text-sm font-bold tracking-wide text-ink uppercase transition-colors duration-300 hover:bg-lime-bright"
            >
              <Phone className="size-4" strokeWidth={2.4} />
              {dealer.phone}
            </a>
            <WhatsAppGate className="flex min-h-11 flex-1 items-center justify-center gap-2.5 rounded-full border border-white/25 px-6 py-4 text-sm font-bold tracking-wide text-white uppercase transition-all duration-300 hover:border-lime hover:text-lime">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </WhatsAppGate>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

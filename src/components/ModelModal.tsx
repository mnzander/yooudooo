import { useEffect, useRef } from 'react'
import { X, Fuel, Gauge, Cog, Phone } from 'lucide-react'
import type { CarModel } from '@/data/models'
import { dealer } from '@/data/models'

interface ModelModalProps {
  model: CarModel | null
  onClose: () => void
}

export default function ModelModal({ model, onClose }: ModelModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!model) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [model, onClose])

  if (!model) return null

  const quickFacts = [
    { icon: Gauge, label: 'Potencia', value: `${model.power} CV` },
    { icon: Fuel, label: 'Combustible', value: model.fuel },
    { icon: Cog, label: 'Consumo', value: model.consumption },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Especificaciones ${model.name} ${model.trim} ${model.fuel}`}
      className="fixed inset-0 z-100 flex items-end justify-center overflow-y-auto bg-ink/85 p-0 backdrop-blur-md duration-300 animate-in fade-in sm:items-center sm:p-6"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-t-3xl border border-ink-line bg-ink-soft duration-500 animate-in slide-in-from-bottom-8 sm:rounded-3xl">
        <div className="relative h-52 overflow-hidden sm:h-64">
          <img
            className="size-full object-cover"
            src={model.image}
            alt={`Yooudooo 6 ${model.trim} ${model.fuel}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-soft via-ink-soft/30 to-transparent" />

          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Cerrar especificaciones"
            className="absolute top-4 right-4 rounded-full border border-white/20 bg-ink/60 p-2.5 text-white backdrop-blur-sm transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-ink"
          >
            <X className="size-4" />
          </button>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <span className="text-xs font-semibold tracking-[0.25em] text-lime uppercase">
              {model.trim} · {model.fuel}
            </span>
            <h3 className="mt-2 text-3xl text-white sm:text-4xl">{model.name}</h3>
          </div>
        </div>

        <div className="max-h-[55vh] overflow-y-auto px-6 pb-8 sm:px-8">
          <div className="grid grid-cols-3 gap-3 border-b border-ink-line py-6">
            {quickFacts.map(fact => (
              <div key={fact.label} className="rounded-xl bg-ink-card/70 p-4">
                <fact.icon className="size-4 text-lime" strokeWidth={1.8} />
                <p className="mt-3 text-xs tracking-[0.15em] text-white/40 uppercase">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{fact.value}</p>
              </div>
            ))}
          </div>

          {model.specs.map(group => (
            <div key={group.group} className="border-b border-ink-line py-6 last:border-0">
              <h4 className="text-sm tracking-[0.15em] text-lime">{group.group}</h4>
              <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {group.items.map(item => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 border-b border-ink-line/60 pb-2.5"
                  >
                    <dt className="text-sm text-white/45">{item.label}</dt>
                    <dd className="text-right text-sm font-medium text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <a
            href={`tel:${dealer.phoneLink}`}
            className="mt-6 flex items-center justify-center gap-2.5 rounded-full bg-lime px-6 py-4 text-sm font-bold tracking-wide text-ink uppercase transition-colors duration-300 hover:bg-lime-bright"
          >
            <Phone className="size-4" strokeWidth={2.4} />
            Consultar disponibilidad · {dealer.phone}
          </a>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { colorRanges } from '@/data/models'

export default function ColorShowcase() {
  const [trimIndex, setTrimIndex] = useState(0)
  const [colorId, setColorId] = useState(colorRanges[0].colors[0].id)

  const range = colorRanges[trimIndex]
  const active = range.colors.find(c => c.id === colorId) ?? range.colors[0]

  const selectTrim = (i: number) => {
    setTrimIndex(i)
    setColorId(colorRanges[i].colors[0].id)
  }

  return (
    <div className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h3 className="text-2xl text-ink sm:text-3xl">Colores</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">
            Elige un acabado y pulsa un color para verlo.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Acabado"
          className="flex gap-2 rounded-full border border-bone-line bg-white p-1"
        >
          {colorRanges.map((r, i) => (
            <button
              key={r.trim}
              type="button"
              role="tab"
              aria-selected={i === trimIndex}
              onClick={() => selectTrim(i)}
              className={`min-h-11 rounded-full px-6 text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${
                i === trimIndex ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink'
              }`}
            >
              {r.trim}
            </button>
          ))}
        </div>
      </div>

      {/* Ciclorama: sobre negro plano las carrocerías oscuras se funden con el
          fondo y el bloque queda como una caja dura. El halo detrás del coche
          las separa y suaviza el corte con la sección clara. */}
      <div
        className="mt-8 overflow-hidden rounded-3xl border border-ink-line bg-ink-soft"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 62% 48% at 50% 38%, #33372c 0%, #1b1d18 45%, transparent 72%)',
        }}
      >
        <div className="relative mx-auto aspect-[2.35/1] w-full max-w-4xl">
          {/* Todos los colores del acabado montados a la vez y cruzando opacidad.
              Cambiar el src de una sola imagen deja un hueco en blanco mientras
              decodifica, y remontarla la hace parpadear. */}
          {range.colors.map(color => (
            <img
              key={color.id}
              src={color.image}
              alt={color.id === active.id ? `BAW 212 ${range.trim} en color ${color.name}` : ''}
              aria-hidden={color.id !== active.id}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 size-full object-contain px-4 py-3 transition-opacity duration-300 sm:px-12 sm:py-8 ${
                color.id === active.id ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* En móvil la tarjeta es tan estrecha que el rótulo se come al coche:
              ahí manda la foto y el acabado ya se lee en las pestañas de arriba. */}
          <p className="text-accent-italic pointer-events-none absolute top-6 left-6 hidden text-3xl text-lime/70 select-none sm:top-9 sm:left-9 sm:block sm:text-5xl">
            {range.trim}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ink-line px-6 py-6 sm:px-9">
          <div className="flex flex-wrap gap-3">
            {range.colors.map(color => (
              <button
                key={color.id}
                type="button"
                onClick={() => setColorId(color.id)}
                aria-pressed={color.id === active.id}
                aria-label={`Ver en color ${color.name}`}
                title={color.name}
                className={`size-9 rounded-full border transition-all duration-300 ${
                  color.id === active.id
                    ? 'border-white ring-2 ring-white/30 ring-offset-2 ring-offset-ink-soft'
                    : 'border-white/20 hover:border-white/50'
                }`}
                style={{
                  background: color.swatchSecondary
                    ? `linear-gradient(105deg, ${color.swatch} 50%, ${color.swatchSecondary} 50%)`
                    : color.swatch,
                }}
              />
            ))}
          </div>

          <p className="text-sm font-semibold tracking-[0.18em] text-white uppercase">
            {active.name}
          </p>
        </div>
      </div>
    </div>
  )
}

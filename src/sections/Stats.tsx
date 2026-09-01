import CountUp from '@/components/CountUp'
import { dealer } from '@/data/models'

const stats = [
  { to: dealer.warrantyYears, suffix: '', label: 'Años de garantía oficial' },
  { to: 1, suffix: '', label: 'Concesionario en Bizkaia' },
  { to: 217, suffix: 'CV', label: 'Potencia máxima' },
]

export default function Stats() {
  return (
    <section
      aria-label="Cifras de Yooudooo 212 Bizkaia"
      className="relative border-y border-ink-line bg-ink-soft/80 backdrop-blur-sm"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-ink-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map(stat => (
          <div key={stat.label} className="px-6 py-12 text-center sm:py-16">
            <p className="text-accent-italic text-[clamp(3rem,7vw,5.5rem)] leading-none text-lime">
              <CountUp to={stat.to} duration={2} />
              {stat.suffix ? <span className="ml-2 text-[0.45em]">{stat.suffix}</span> : null}
            </p>
            <p className="mt-4 text-xs font-semibold tracking-[0.25em] text-white/45 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

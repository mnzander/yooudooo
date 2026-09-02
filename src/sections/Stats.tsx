import CountUp from '@/components/CountUp'
import { dealer } from '@/data/models'

const stats = [
  { to: dealer.warrantyYears, suffix: '', label: 'Años de garantía oficial' },
  { to: 1, suffix: '', label: 'Concesionario en Bizkaia' },
  { to: 217, suffix: 'CV', label: 'Potencia máxima' },
]

export default function Stats() {
  return (
    <section aria-label="Cifras de Yooudooo 212 Bizkaia" className="relative">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 py-20 sm:grid-cols-3 sm:py-24">
        {stats.map(stat => (
          <div key={stat.label} className="text-center">
            <p className="text-accent-italic text-[clamp(3.25rem,7vw,5.5rem)] leading-none text-moss">
              <CountUp to={stat.to} duration={2} />
              {stat.suffix ? <span className="ml-2 text-[0.45em]">{stat.suffix}</span> : null}
            </p>
            <p className="mx-auto mt-4 max-w-[16ch] text-xs font-semibold tracking-[0.22em] text-ink/60 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

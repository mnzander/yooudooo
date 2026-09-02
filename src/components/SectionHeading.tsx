import SplitText from '@/components/SplitText'

interface SectionHeadingProps {
  index: string
  label: string
  title: string
  /** El lima no es legible sobre claro (1,43:1), así que ahí los acentos van en moss. */
  tone?: 'dark' | 'light'
}

export default function SectionHeading({ index, label, title, tone = 'dark' }: SectionHeadingProps) {
  const isLight = tone === 'light'

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className={`text-accent-italic text-sm ${isLight ? 'text-moss' : 'text-lime'}`}>
          {index}
        </span>
        <span className={`h-px w-10 ${isLight ? 'bg-moss/40' : 'bg-lime/50'}`} />
        <span
          className={`text-xs font-semibold tracking-[0.3em] uppercase ${
            isLight ? 'text-ink/60' : 'text-white/55'
          }`}
        >
          {label}
        </span>
      </div>

      <SplitText
        tag="h2"
        text={title}
        textAlign="left"
        splitType="chars"
        delay={28}
        duration={0.9}
        ease="power4.out"
        from={{ opacity: 0, y: 60, rotateX: -60 }}
        to={{ opacity: 1, y: 0, rotateX: 0 }}
        className={`!block text-[clamp(2.2rem,5.5vw,4.5rem)] ${isLight ? 'text-ink' : 'text-white'}`}
      />
    </div>
  )
}

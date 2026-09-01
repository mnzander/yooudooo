import SplitText from '@/components/SplitText'

interface SectionHeadingProps {
  index: string
  label: string
  title: string
}

export default function SectionHeading({ index, label, title }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className="text-accent-italic text-sm text-lime">{index}</span>
        <span className="h-px w-10 bg-lime/50" />
        <span className="text-xs font-semibold tracking-[0.3em] text-white/45 uppercase">
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
        className="!block text-[clamp(2.2rem,5.5vw,4.5rem)] text-white"
      />
    </div>
  )
}

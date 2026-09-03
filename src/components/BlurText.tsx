import { motion, type Transition, type Easing } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const [settled, setSettled] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Desenfocar cada palabra por separado es caro de más para una GPU móvil:
  // ahí la entrada se queda en desplazamiento y opacidad, que son compositados.
  const compact =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

  const defaultFrom = useMemo<Record<string, string | number>>(() => {
    const y = direction === 'top' ? -50 : 50;
    const from: Record<string, string | number> = { opacity: 0, y };
    if (!compact) from.filter = 'blur(10px)';
    return from;
  }, [direction, compact]);

  const defaultTo = useMemo<Array<Record<string, string | number>>>(() => {
    const midY = direction === 'top' ? 5 : -5;
    const mid: Record<string, string | number> = { opacity: 0.5, y: midY };
    const end: Record<string, string | number> = { opacity: 1, y: 0 };
    if (!compact) {
      mid.filter = 'blur(5px)';
      end.filter = 'blur(0px)';
    }
    return [mid, end];
  }, [direction, compact]);

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1
                ? () => {
                    setSettled(true);
                    onAnimationComplete?.();
                  }
                : undefined
            }
            style={{
              display: 'inline-block',
              // Cada palabra con will-change es una capa de GPU viva mientras exista:
              // sólo se reserva mientras esa animación está corriendo de verdad.
              willChange:
                inView && !settled ? (compact ? 'transform, opacity' : 'transform, filter, opacity') : 'auto'
            }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;

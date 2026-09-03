import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

type ConfigKey =
  | 'startWidth'
  | 'startHeight'
  | 'startRadius'
  | 'endRadius'
  | 'mediaZoom'
  | 'scrollDistance'
  | 'holdDistance'
  | 'smoothing'
  | 'overlayScrim'
  | 'useWindowScroll'
  | 'enabled';

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: ReactNode;
  scrollHint?: ReactNode;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = null,
  scrollHint = null,
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}: ScrollExpandProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const [videoReady, setVideoReady] = useState(false);
  // Último estilo escrito, para no repetir asignaciones que no cambian nada.
  const lastRef = useRef({ clip: '', zoom: '', scrim: '', title: -1, hint: -1, overlay: -1 });

  const propsRef = useRef<Required<Pick<ScrollExpandProps, ConfigKey>>>(
    {} as Required<Pick<ScrollExpandProps, ConfigKey>>
  );
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled
  };

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);
    const last = lastRef.current;

    // clip-path no está compositado: cada escritura repinta el vídeo entero. Se
    // redondea a dos decimales y se salta la asignación si el valor no cambia,
    // que en móvil evita repintados sub-píxel a lo largo de todo el gesto.
    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2).toFixed(2);
    const iy = Math.max(0, (100 - h) / 2).toFixed(2);
    const r = (c.startRadius + (c.endRadius - c.startRadius) * e).toFixed(1);
    const clip = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;
    if (clip !== last.clip) {
      frame.style.clipPath = clip;
      last.clip = clip;
    }

    const zoom = `scale(${(c.mediaZoom + (1 - c.mediaZoom) * e).toFixed(4)})`;
    if (zoom !== last.zoom) {
      media.style.transform = zoom;
      last.zoom = zoom;
    }

    if (scrimRef.current) {
      const scrim = (c.overlayScrim * e).toFixed(3);
      if (scrim !== last.scrim) {
        scrimRef.current.style.opacity = scrim;
        last.scrim = scrim;
      }
    }

    // El relevo entre título y texto va adelantado: si el segundo espera al
    // final de la expansión, aparece con el marco ya quieto y da la sensación
    // de llegar tarde. Los tramos no se solapan, para que no se lean a la vez.
    if (titleRef.current) {
      const out = +smoothstep(0.18, 0.46, p).toFixed(3);
      if (out !== last.title) {
        titleRef.current.style.opacity = `${1 - out}`;
        titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
        last.title = out;
      }
    }

    if (hintRef.current) {
      const gone = +smoothstep(0, 0.1, p).toFixed(3);
      if (gone !== last.hint) {
        hintRef.current.style.opacity = `${1 - gone}`;
        hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
        last.hint = gone;
      }
    }

    if (overlayRef.current) {
      const inn = +smoothstep(0.5, 0.78, p).toFixed(3);
      if (inn !== last.overlay) {
        overlayRef.current.style.opacity = `${inn}`;
        overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
        last.overlay = inn;
      }
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;
    let latched = false;
    let lastW = 0;
    let lastH = 0;

    /**
     * En móvil la barra de direcciones aparece y desaparece al frenar el scroll,
     * y con ella cambia innerHeight. Volver a medir ahí reescribe la altura del
     * track y el navegador reajusta la posición: es el tirón que se nota justo
     * al soltar el dedo. Los cambios pequeños de alto se ignoran; los de ancho y
     * los grandes (rotar la pantalla) sí re-miden.
     */
    const measure = () => {
      const c = propsRef.current;
      const h = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      const w = root.clientWidth || h;
      if (h <= 0) return;

      const sameWidth = w === lastW;
      const heightJitter = lastH > 0 && Math.abs(h - lastH) / lastH < 0.25;
      if (sameWidth && heightJitter) return;

      lastW = w;
      lastH = h;
      stageH = h;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      // Una vez abierto del todo se queda así: volver a encogerlo al subir
      // obliga a rehacer la apertura para seguir leyendo, y molesta más de lo
      // que aporta. Se reinicia al recargar.
      if (latched) return 1;

      const span = stageH * Math.max(0.01, c.scrollDistance);
      const raw = c.useWindowScroll
        ? clamp(-track.getBoundingClientRect().top / span, 0, 1)
        : clamp(root.scrollTop / span, 0, 1);

      // El bloqueo se mide sobre el progreso ya suavizado, que es lo que se ve:
      // el marco llega a ocupar la pantalla bastante antes de que el valor bruto
      // se acerque a 1, y atado al bruto se quedaba sin saltar.
      if (smoothstep(0, 1, raw) >= 0.99) {
        latched = true;
        return 1;
      }
      return raw;
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  /**
   * El vídeo no se pide hasta que la carga crítica ha terminado y el hilo está
   * libre. Bajarse y decodificar varios MB a la vez que se pinta la página es lo
   * que hace caer los fps durante los primeros segundos; mientras tanto se ve el
   * póster, que ya viene en el HTML.
   */
  useEffect(() => {
    if (mediaType !== 'video') return;

    let cancelled = false;
    let idleId = 0;
    let supportsIdle = false;

    const start = () => {
      if (!cancelled) setVideoReady(true);
    };

    const afterLoad = () => {
      if (cancelled) return;
      supportsIdle = typeof window.requestIdleCallback === 'function';
      idleId = supportsIdle
        ? window.requestIdleCallback(start, { timeout: 2000 })
        : window.setTimeout(start, 300);
    };

    if (document.readyState === 'complete') afterLoad();
    else window.addEventListener('load', afterLoad, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', afterLoad);
      if (!idleId) return;
      if (supportsIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, [mediaType]);

  // El vídeo entra con un fundido en cuanto tiene su primer fotograma listo, ya
  // sobre el póster de fondo: así no hay corte entre una imagen y otra.
  useEffect(() => {
    if (mediaType !== 'video') return;
    const el = mediaRef.current;
    if (!el) return;

    const reveal = () => {
      el.style.opacity = '1';
    };
    if (el.readyState >= 2) reveal();
    el.addEventListener('loadeddata', reveal);
    el.addEventListener('playing', reveal);
    return () => {
      el.removeEventListener('loadeddata', reveal);
      el.removeEventListener('playing', reveal);
    };
  }, [mediaType, videoReady]);

  useEffect(() => {
    if (mediaType !== 'video' || !videoReady) return;
    const el = mediaRef.current;
    const stage = stageRef.current;
    if (!el || !stage || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play?.().catch(() => {});
        } else {
          el.pause?.();
        }
      },
      { threshold: 0.01 }
    );
    io.observe(stage);
    return () => io.disconnect();
  }, [mediaType, src, videoReady]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        // Sin key derivada del src: al pasar de vacío a la URL, React destruiría
        // y recrearía el elemento, y ese remonte es un parpadeo en pantalla.
        className="absolute inset-0 w-full h-full object-cover origin-center select-none opacity-0 transition-opacity duration-500 [will-change:transform]"
        // El src se asigna cuando la página ya ha pintado: descargar y decodificar
        // varios MB compitiendo con el primer render hunde los fps al entrar.
        src={videoReady ? src : undefined}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    ) : (
      <img
        ref={mediaRef}
        className="absolute inset-0 w-full h-full object-cover origin-center select-none [will-change:transform]"
        src={src}
        alt={alt}
        draggable={false}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`relative w-full h-full ${useWindowScroll ? '' : 'overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="relative w-full">
        <div ref={stageRef} className="sticky top-0 w-full overflow-hidden [--se-title-size:4rem]">
          <div
            ref={frameRef}
            className="absolute inset-0 bg-cover bg-center [clip-path:inset(21%_29%_21%_29%_round_24px)] [will-change:clip-path]"
            // El póster también como fondo del marco: mientras el vídeo no tiene
            // su primer fotograma hay un instante sin nada que pintar, y ese
            // hueco es el fogonazo que se ve al cargar.
            style={mediaType === 'video' && poster ? { backgroundImage: `url("${poster}")` } : undefined}
          >
            {media}
            <div
              ref={scrimRef}
              className="absolute inset-0 opacity-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.75),rgba(0,0,0,0.1)_45%,rgba(0,0,0,0.35))]"
            />
            {children ? (
              <div
                ref={overlayRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-[6%] opacity-0 [will-change:opacity,transform]"
              >
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div
              ref={titleRef}
              className="absolute inset-0 flex items-center justify-center m-0 px-[6%] text-center font-bold leading-none tracking-[-0.03em] text-white [font-size:var(--se-title-size)] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] pointer-events-none [will-change:opacity,transform]"
            >
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div
              ref={hintRef}
              className="absolute inset-x-0 bottom-5 text-center text-[0.8125rem] tracking-[0.02em] text-white/55 pointer-events-none [will-change:opacity,transform]"
            >
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;

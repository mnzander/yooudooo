/**
 * Prepara el vídeo del hero para web a partir del máster exportado de CapCut.
 *
 * El máster debe salir de CapCut en H.264 8 bits, que es lo que reproduce
 * cualquier navegador: con HEVC, Firefox no muestra nada y los equipos sin
 * decodificador por hardware van a tirones.
 *
 * La versión de escritorio se recodifica en lugar de copiarse. Antes se copiaba
 * tal cual para no encadenar dos compresiones, pero eso dejaba el peso de la
 * web en manos de lo que decidiera CapCut al exportar, y un máster de 10 Mbps
 * se publicaba entero. Recodificar desde un máster de buena calidad es
 * imperceptible y sí permite controlar el resultado.
 *
 * Se baja a 1440 de ancho: el hero lleva un oscurecido del 60 % encima, así que
 * el detalle fino no se aprecia y bajar resolución rinde más que apretar la
 * compresión. Se mantienen los 30 fps del máster —convertir a 25 obliga a
 * descartar uno de cada seis fotogramas y provoca un tirón irregular.
 *
 * Uso: node scripts/encode-hero.mjs "media/Video WEB Definitivo.mp4"
 */
import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import ffmpeg from 'ffmpeg-static'

const input = process.argv[2] ?? 'media/Video WEB Definitivo.mp4'
const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
const size = f => `${(statSync(f).size / 1048576).toFixed(2)} MB`

// Escritorio: 1440 de ancho, sin audio y con el índice al principio para poder
// empezar a reproducir antes de terminar la descarga.
run(['-i', input, '-an',
  '-vf', 'scale=1440:-2:flags=lanczos,format=yuv420p',
  '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0',
  '-preset', 'slow', '-crf', '26', '-g', '60',
  '-movflags', '+faststart', 'public/media/hero.mp4'])
console.log(`public/media/hero.mp4 → ${size('public/media/hero.mp4')}`)

// Móvil: 720p y 30 fps, que es la mitad de fotogramas que decodificar.
run(['-i', input, '-an',
  '-vf', 'fps=30,scale=1280:-2:flags=lanczos,format=yuv420p',
  '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0',
  '-preset', 'slow', '-crf', '27', '-g', '60',
  '-movflags', '+faststart', 'public/media/hero-sm.mp4'])
console.log(`public/media/hero-sm.mp4 → ${size('public/media/hero-sm.mp4')}`)

// Póster: primera pintada y sustituto del vídeo en equipos flojos.
run(['-i', input, '-frames:v', '1', '-vf', 'scale=1600:-2', '-q:v', '7', 'public/media/hero-poster.jpg'])
console.log(`public/media/hero-poster.jpg → ${size('public/media/hero-poster.jpg')}`)

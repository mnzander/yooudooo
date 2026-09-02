/**
 * Prepara el vídeo del hero para web a partir del máster exportado de CapCut.
 *
 * El máster ya sale de CapCut en H.264 8 bits, que es lo que reproduce
 * cualquier navegador (el primer vídeo venía en HEVC 10 bits: Firefox no lo
 * reproduce y en equipos sin decodificador por hardware iba a tirones). Por eso
 * la versión de escritorio sólo se remuxea —se le quita el audio y se mueve el
 * índice al principio— sin volver a comprimir: recodificar encima sería una
 * segunda generación de pérdida a cambio de nada.
 *
 * Uso: node scripts/encode-hero.mjs "media/Video Web 2.mp4"
 */
import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import ffmpeg from 'ffmpeg-static'

const input = process.argv[2] ?? 'media/Video Web 2.mp4'
const run = args => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
const size = f => `${(statSync(f).size / 1048576).toFixed(2)} MB`

// Escritorio: la calidad del máster tal cual, sin audio y con faststart.
run(['-i', input, '-an', '-c:v', 'copy', '-movflags', '+faststart', 'public/media/hero.mp4'])
console.log(`public/media/hero.mp4 → ${size('public/media/hero.mp4')} (sin recodificar)`)

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

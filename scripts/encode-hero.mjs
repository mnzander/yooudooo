/**
 * Reencoda el vídeo del hero a un formato apto para web.
 *
 * El original venía en HEVC 10 bits a 60 fps: Firefox no reproduce HEVC en
 * absoluto y en equipos sin decodificador por hardware la reproducción va a
 * tirones. Aquí se pasa a H.264 8 bits y 30 fps, que reproduce cualquier
 * navegador, y se generan dos tamaños más un póster.
 *
 * El CRF se mantiene bajo a propósito: H.264 comprime bastante peor que HEVC,
 * así que a igualdad de calidad el archivo sale más grande que el original. Al
 * apretarlo el hero se ve blando a pantalla completa, que es justo lo que hay
 * que evitar aquí.
 *
 * Uso: node scripts/encode-hero.mjs "media/Video Web.mp4"
 */
import { execFileSync } from 'node:child_process'
import { statSync } from 'node:fs'
import ffmpeg from 'ffmpeg-static'

const input = process.argv[2] ?? 'media/Video Web.mp4'

const jobs = [
  {
    out: 'public/media/hero.mp4',
    args: ['-vf', 'fps=30,scale=1920:-2:flags=lanczos,format=yuv420p',
           '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.2',
           '-preset', 'slow', '-crf', '22', '-g', '60'],
  },
  {
    out: 'public/media/hero-sm.mp4',
    args: ['-vf', 'fps=30,scale=1280:-2:flags=lanczos,format=yuv420p',
           '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0',
           '-preset', 'slow', '-crf', '26', '-g', '60'],
  },
]

for (const { out, args } of jobs) {
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', input, '-an',
    ...args, '-movflags', '+faststart', out], { stdio: 'inherit' })
  console.log(`${out} → ${(statSync(out).size / 1048576).toFixed(2)} MB`)
}

execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', input,
  '-frames:v', '1', '-vf', 'scale=1600:-2', '-q:v', '7', 'public/media/hero-poster.jpg'],
  { stdio: 'inherit' })
console.log('public/media/hero-poster.jpg listo')

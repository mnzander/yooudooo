/**
 * Reencoda el vídeo del hero a un formato apto para web.
 *
 * El original venía en HEVC 10 bits a 60 fps: Firefox no reproduce HEVC en
 * absoluto y en equipos sin decodificador por hardware la reproducción va a
 * tirones. Aquí se pasa a H.264 8 bits y 30 fps, que reproduce cualquier
 * navegador, y se generan dos tamaños más un póster.
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
    args: ['-vf', 'fps=30,scale=1280:-2:flags=lanczos,format=yuv420p',
           '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0',
           '-preset', 'slow', '-crf', '28', '-maxrate', '5M', '-bufsize', '8M', '-g', '60'],
  },
  {
    out: 'public/media/hero-sm.mp4',
    args: ['-vf', 'fps=30,scale=854:-2:flags=lanczos,format=yuv420p',
           '-c:v', 'libx264', '-profile:v', 'main', '-level', '3.1',
           '-preset', 'slow', '-crf', '30', '-g', '60'],
  },
]

for (const { out, args } of jobs) {
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', input, '-an',
    ...args, '-movflags', '+faststart', out], { stdio: 'inherit' })
  console.log(`${out} → ${(statSync(out).size / 1048576).toFixed(2)} MB`)
}

execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', input,
  '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '8', 'public/media/hero-poster.jpg'],
  { stdio: 'inherit' })
console.log('public/media/hero-poster.jpg listo')

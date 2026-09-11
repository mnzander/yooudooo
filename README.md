# BAW 212 Bizkaia

Web del concesionario oficial BAW en Bizkaia (Oyarzabal Automotive, S.L.).
Página única en React + TypeScript + Vite, sin backend.

**En producción:** https://baw212spain.com

## Puesta en marcha

```
npm install
npm run dev
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila a `dist/` |
| `npm run lint` | Oxlint |
| `npm run encode:hero` | Regenera el vídeo del hero (ver abajo) |

## Dónde está cada cosa

Casi todos los datos del concesionario y de los vehículos están centralizados
en **`src/data/models.ts`**: teléfono, WhatsApp, correo, dirección, Instagram,
las tres versiones del coche con sus fichas técnicas, y la gama de colores.
Cambiar un dato de contacto es tocar ese fichero y nada más: se propaga a la
cabecera, la sección de contacto, el pie y el enlace de Google Maps.

`src/data/y3max.ts` tiene los datos del vehículo que aparece como "Sugerencia"
al final de la página, que es de otra marca.

## Despliegue

El hosting es **Arsys, Linux con Apache**, y no hay integración continua: se
sube por SFTP a mano.

1. `npm run build`
2. Con WinSCP o similar, **Sincronizar** la carpeta local `dist` contra la
   remota `/html`, en dirección remota y con el borrado activado.

El borrado importa: Vite pone un hash en el nombre de los ficheros de
`assets/`, así que los de despliegues anteriores no se sobrescriben y quedan
huérfanos si no se limpian.

Ojo con no confundir `/html` (raíz pública) con `/data` (privada).

### `public/.htaccess`

Resuelve en un solo bloque la redirección a `https://baw212spain.com` desde
`http`, desde `www` y desde cualquier otro dominio. También fija la caché
—agresiva para `assets/` porque llevan hash, moderada para el material— y
activa la compresión de texto.

**No subirlo si el certificado SSL no está funcionando**: fuerza HTTPS y
dejaría la web en un bucle.

El dominio `baw212spain.es` está aparcado y **no redirige**: no está asociado
al hosting, así que las peticiones no llegan a este fichero. Para arreglarlo
hay que pedir a Arsys que lo añada como dominio adicional; entonces la regla ya
escrita lo redirige sola.

## Vídeo del hero

El máster se exporta de CapCut y se deja en `media/` (carpeta ignorada por
git). Luego `npm run encode:hero` genera las tres piezas que sí se versionan:
escritorio, móvil y póster.

Dos restricciones que no son negociables:

- **H.264, nunca HEVC.** Firefox no reproduce HEVC y los equipos sin
  decodificador por hardware van a tirones.
- **No bajar la resolución de la versión de escritorio.** El marco pequeño del
  inicio no encoge el vídeo, lo recorta, y entra ampliado al 145 %
  (`mediaZoom` en `Hero.tsx`). En una pantalla de 1920 se dibuja a 2784 px: a
  1440 se ve pixelado. Está probado.

## Decisiones que conviene no deshacer

**Tipografías autoalojadas** en `public/fonts`. Estaban en Google Fonts, lo que
enviaba la IP de cada visitante a Google. Ahora la web no hace **ninguna**
petición a terceros, y la política de privacidad lo afirma. Reintroducir
Google Fonts obligaría a cambiar ese texto.

**Páginas legales como HTML suelto** en `public/aviso-legal.html` y
`public/politica-privacidad.html`. La web no tiene enrutador —la navegación son
anclas—, así que convertirlas en rutas obligaría a añadir React Router y a
configurar reglas de reescritura en el hosting. Así funcionan en cualquier
alojamiento.

**Los modales salen por portal al `body`** (`createPortal`). El bloque claro que
los contiene crea contexto de apilamiento con `z-10` y el pie es hermano suyo
con `z-20`: desde dentro ningún `z-index` puede ganarle y quedaban tapados.

**El bloqueo de scroll de los modales** (`src/hooks/useScrollLock.ts`) actúa
sólo sobre el `body`. Bloquear también el `<html>` impedía desplazar el
contenido interno del propio modal en móvil.

**El enlace de WhatsApp no existe en el DOM hasta pasar la verificación.** Es la
única protección real contra los robots que rastrean webs recopilando números:
leen el HTML, no interactúan con él. El botón final es un `<a>` y no un
`window.open` aplazado, que el bloqueador de pop-ups cancelaría.

## Pendiente

- **Colores:** la gama de `models.ts` y los renders de
  `public/media/modelos/colores` se tomaron de 212uae.com, el distribuidor en
  Emiratos. Falta que el importador español confirme qué colores se venden aquí
  y, preferiblemente, facilite sus propios renders.
- **Y3MAX:** aparece sólo como modelo porque no se confirmó la marca. La
  etiqueta 0 de la DGT que se afirma en su ficha sale del catálogo del
  importador y conviene validarla.
- **Textos legales:** redactados sin asesoría jurídica. El aviso legal conlleva
  obligaciones sancionables y debería revisarlos la gestoría de la empresa.
- **Feed de Instagram:** pedido por el cliente, sin empezar. Requiere cuenta
  Profesional y un servicio intermedio que gestione el token de Meta, porque
  este proyecto no tiene backend donde renovarlo.
- **Matrículas:** en el vídeo actual se leen; en el anterior estaban
  difuminadas.

## Lo que no está aquí

Las credenciales de FTP, el acceso al panel de Arsys y la gestión del dominio
son del cliente. El máster del vídeo tampoco se versiona: está en `media/`, que
git ignora.

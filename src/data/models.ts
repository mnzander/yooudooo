export interface SpecGroup {
  group: string
  items: { label: string; value: string }[]
}

export interface CarModel {
  id: string
  name: string
  trim: string
  fuel: 'Gasolina' | 'Diésel'
  tagline: string
  power: number
  powerKw: number
  torque: string
  consumption: string
  price?: string
  image: string
  highlights: string[]
  specs: SpecGroup[]
}

const sharedChassis: SpecGroup = {
  group: 'Chasis y capacidad off-road',
  items: [
    { label: 'Tracción', value: '2WD / 4WD conectable con reductora' },
    { label: 'Ángulo de ataque', value: '40°' },
    { label: 'Ángulo de salida', value: '36°' },
    { label: 'Ángulo ventral', value: '23,6°' },
    { label: 'Vadeo', value: '850 mm' },
    { label: 'Capacidad de subida', value: '100 %' },
    { label: 'Suspensión', value: 'No independiente de 5 brazos' },
    { label: 'Recorrido suspensión', value: '131 mm trasero / 114 mm delantero' },
  ],
}

const sharedEquipment: SpecGroup = {
  group: 'Equipamiento y confort',
  items: [
    { label: 'Cámaras', value: 'Panorámicas 360° con función de chasis transparente' },
    { label: 'Visualización del terreno', value: 'Giroscopio de 6 ejes' },
    { label: 'Frenada', value: 'Distribución electrónica de frenado' },
    { label: 'Asientos', value: 'Espuma multicapa ergonómica, tapicería en microfibra' },
    { label: 'Plazas traseras', value: 'Reclinables 4/6 con 15 niveles de ajuste' },
  ],
}

export const models: CarModel[] = [
  {
    id: 'gasolina-adventure',
    name: 'BAW 212',
    trim: 'Adventure',
    fuel: 'Gasolina',
    tagline: 'El equilibrio entre carácter y uso diario.',
    power: 217,
    powerKw: 160,
    torque: '410 N·m',
    consumption: '11 L/100 km',
    image: '/media/modelos/y6-gasolina.jpg',
    highlights: ['2.0T turbo inyección directa', 'Cambio 8AT', 'Bloqueo diferencial trasero'],
    specs: [
      {
        group: 'Motor y transmisión',
        items: [
          { label: 'Motor', value: '2.0T turboalimentado de inyección directa' },
          { label: 'Potencia', value: '217 CV (160 kW) a 5.500 rpm' },
          { label: 'Par máximo', value: '410 N·m' },
          { label: 'Transmisión', value: 'Automática de 8 velocidades' },
          { label: 'Consumo', value: '11 L/100 km' },
        ],
      },
      sharedChassis,
      {
        group: 'Acabado Adventure',
        items: [
          { label: 'Diferencial', value: 'Bloqueo trasero de serie' },
          { label: 'Amortiguación', value: 'Convencional de serie' },
        ],
      },
      sharedEquipment,
    ],
  },
  {
    id: 'diesel-adventure',
    name: 'BAW 212',
    trim: 'Adventure',
    fuel: 'Diésel',
    tagline: 'Máxima autonomía para los que no paran.',
    power: 165,
    powerKw: 122,
    torque: 'Alto par a bajas vueltas',
    consumption: '7,6 L/100 km',
    image: '/media/modelos/y6-diesel.jpg',
    highlights: ['2.0L diésel', 'Cambio 8AT ZF', 'Consumo 7,6 L/100 km'],
    specs: [
      {
        group: 'Motor y transmisión',
        items: [
          { label: 'Motor', value: '2.0L diésel' },
          { label: 'Potencia', value: '165 CV (122 kW) a 3.600 rpm' },
          { label: 'Transmisión', value: 'Automática 8AT (ZF)' },
          { label: 'Consumo', value: '7,6 L/100 km' },
        ],
      },
      sharedChassis,
      {
        group: 'Acabado Adventure',
        items: [
          { label: 'Diferencial', value: 'Bloqueo trasero de serie' },
          { label: 'Amortiguación', value: 'Convencional de serie' },
        ],
      },
      sharedEquipment,
    ],
  },
  {
    id: 'gasolina-navigator',
    name: 'BAW 212',
    trim: 'Navigator',
    fuel: 'Gasolina',
    tagline: 'La versión más capaz fuera del asfalto.',
    power: 217,
    powerKw: 160,
    torque: '410 N·m',
    consumption: '11 L/100 km',
    image: '/media/modelos/y6-navigator.jpg',
    highlights: ['Doble bloqueo de diferencial', 'Amortiguadores de nitrógeno', '2.0T · 217 CV'],
    specs: [
      {
        group: 'Motor y transmisión',
        items: [
          { label: 'Motor', value: '2.0T turboalimentado de inyección directa' },
          { label: 'Potencia', value: '217 CV (160 kW) a 5.500 rpm' },
          { label: 'Par máximo', value: '410 N·m' },
          { label: 'Transmisión', value: 'Automática de 8 velocidades' },
          { label: 'Consumo', value: '11 L/100 km' },
        ],
      },
      sharedChassis,
      {
        group: 'Acabado Navigator',
        items: [
          { label: 'Diferencial delantero', value: 'Bloqueo de serie' },
          { label: 'Diferencial trasero', value: 'Bloqueo de serie' },
          { label: 'Amortiguación', value: 'Amortiguadores de nitrógeno' },
        ],
      },
      sharedEquipment,
    ],
  },
]

export interface CarColor {
  id: string
  name: string
  /** Muestra del círculo, tomada del CSS de la web oficial. */
  swatch: string
  /** Segundo tono, sólo en los bitono. */
  swatchSecondary?: string
  image: string
}

export interface ColorRange {
  trim: string
  colors: CarColor[]
}

/**
 * Renders con fondo transparente, de la gama que publica el distribuidor. Está
 * pendiente que el importador confirme qué colores se comercializan en España:
 * si alguno no se vende aquí, se quita su entrada y ya.
 */
export const colorRanges: ColorRange[] = [
  {
    trim: 'Adventure',
    colors: [
      { id: 'verde', name: 'Verde', swatch: '#5c7354', image: '/media/modelos/colores/adventure-verde.webp' },
      { id: 'negro', name: 'Negro', swatch: '#1c1c1c', image: '/media/modelos/colores/adventure-negro.webp' },
      { id: 'gris', name: 'Gris', swatch: '#7a7a7a', image: '/media/modelos/colores/adventure-gris.webp' },
      { id: 'blanco', name: 'Blanco', swatch: '#f2f2f2', image: '/media/modelos/colores/adventure-blanco.webp' },
      { id: 'granate', name: 'Granate', swatch: '#6b1c24', image: '/media/modelos/colores/adventure-granate.webp' },
      { id: 'plata-mate', name: 'Plata mate', swatch: '#c0c4c8', image: '/media/modelos/colores/adventure-plata-mate.webp' },
      { id: 'gris-cemento', name: 'Gris cemento', swatch: '#6e7276', image: '/media/modelos/colores/adventure-gris-cemento.webp' },
      { id: 'azul-marino', name: 'Azul marino', swatch: '#1a2a44', image: '/media/modelos/colores/adventure-azul-marino.webp' },
    ],
  },
  {
    trim: 'Navigator',
    colors: [
      { id: 'azul-blanco', name: 'Azul y blanco', swatch: '#4c9bbd', swatchSecondary: '#f2f2f2', image: '/media/modelos/colores/navigator-azul-blanco.webp' },
      { id: 'azul', name: 'Azul', swatch: '#2e5a8c', image: '/media/modelos/colores/navigator-azul.webp' },
      { id: 'gris', name: 'Gris', swatch: '#8a8e92', image: '/media/modelos/colores/navigator-gris.webp' },
      { id: 'blanco', name: 'Blanco', swatch: '#f2f2f2', image: '/media/modelos/colores/navigator-blanco.webp' },
      { id: 'negro', name: 'Negro', swatch: '#1c1c1c', image: '/media/modelos/colores/navigator-negro.webp' },
    ],
  },
]

export const dealer = {
  brand: 'BAW 212',
  region: 'Bizkaia',
  company: 'Oyarzabal Automotive',
  claim: 'El único concesionario en Bizkaia',
  phone: '946 857 505',
  phoneLink: '+34946857505',
  whatsapp: '626 70 73 60',
  // wa.me exige el número sin '+' ni separadores
  whatsappLink: '34626707360',
  whatsappMessage: 'Hola, me gustaría recibir información sobre el BAW 212.',
  instagram: 'yooudooo.212.bizkaia',
  instagramUrl: 'https://www.instagram.com/yooudooo.212.bizkaia/',
  street: 'C/ Medina de Pomar 3',
  city: 'Bilbao',
  zip: '48012',
  warrantyYears: 5,
}

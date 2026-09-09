import type { SpecGroup } from '@/data/models'

/**
 * Vehículo de otra marca que el concesionario ofrece como alternativa. Los datos
 * salen de la ficha técnica del importador, así que cualquier cifra que cambie
 * hay que corregirla contra la ficha nueva, no a ojo.
 */
export const y3max = {
  name: 'Y3MAX',
  kind: 'Híbrido enchufable',
  tagline:
    'Un enchufable con 140 km eléctricos para el día a día y 1.100 km de autonomía total cuando toca salir de viaje.',
  image: '/media/y3max/y3max.webp',
  highlights: [
    { value: '204', unit: 'CV', label: 'Potencia combinada' },
    { value: '140', unit: 'km', label: 'Autonomía eléctrica' },
    { value: '1.100', unit: 'km', label: 'Autonomía total' },
    { value: '0', unit: 'DGT', label: 'Etiqueta de emisiones' },
  ],
  specs: [
    {
      group: 'Motor y prestaciones',
      items: [
        { label: 'Tipo', value: 'Híbrido enchufable (PHEV)' },
        { label: 'Motor de combustión', value: '1.5 Atkinson, 4 cilindros en línea' },
        { label: 'Potencia combinada', value: '204 CV' },
        { label: 'Motor eléctrico', value: '150 kW / 310 N·m' },
        { label: 'Velocidad máxima', value: '170 km/h' },
      ],
    },
    {
      group: 'Batería y carga',
      items: [
        { label: 'Batería', value: 'LFP de 20,5 kWh' },
        { label: 'Autonomía eléctrica', value: '140 km (WLTP)' },
        { label: 'Autonomía total', value: '1.100 km' },
        { label: 'Carga en corriente alterna', value: '3,3 kW · 6,5 h' },
        { label: 'Carga rápida', value: '30 min del 30 % al 80 %' },
        { label: 'V2L', value: 'Descarga externa disponible' },
      ],
    },
    {
      group: 'Consumo y emisiones',
      items: [
        { label: 'Consumo combinado', value: '1,80 L/100 km (WLTP)' },
        { label: 'Consumo con batería baja', value: '4,96 L/100 km' },
        { label: 'Emisiones de CO₂', value: '23,55 g/km' },
        { label: 'Norma de emisiones', value: 'EURO 6' },
        { label: 'Depósito', value: '53 L' },
      ],
    },
    {
      group: 'Dimensiones y espacio',
      items: [
        { label: 'Largo × ancho × alto', value: '4.590 × 1.880 × 1.608 mm' },
        { label: 'Distancia entre ejes', value: '2.750 mm' },
        { label: 'Maletero', value: 'De 469 a 1.452 L' },
        { label: 'Masa en vacío', value: '1.700 kg' },
        { label: 'Neumáticos', value: '225/55 R18 · llantas de 18"' },
      ],
    },
    {
      group: 'Equipamiento destacado',
      items: [
        { label: 'Cámaras', value: 'Visión panorámica 360°' },
        { label: 'Conducción asistida', value: 'Crucero adaptativo de 0 a 130 km/h' },
        { label: 'Seguridad', value: 'Frenada automática de emergencia y alerta de colisión' },
        { label: 'Aparcamiento', value: 'Asistente inteligente y sensores delanteros y traseros' },
        { label: 'Modos de conducción', value: 'Eco / Estándar / Sport / Personalizado' },
      ],
    },
  ] satisfies SpecGroup[],
}

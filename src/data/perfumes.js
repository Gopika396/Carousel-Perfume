const base = import.meta.env.BASE_URL

const perfumes = [
  {
    id: 'golden',
    collection: 'Golden Glow',
    name: 'Amber Saffron',
    blurb: 'A warm, elegant fragrance with a luxurious golden touch.',
    notes: 'Saffron, amber and warm vanilla.',
    price: '₹2,499',
    image: `${base}bottles/golden.png`,
    scale: 1,
    theme: { base: '#a85a1c', deep: '#6e3711', glow: '#dc8d3f', ink: '#fff3de', tint: '#f0cf9b', swatch: '#e2b25c' },
  },
  {
    id: 'rose',
    collection: 'Rose Essence',
    name: 'Damask Rose',
    blurb: 'A delicate floral fragrance inspired by timeless elegance.',
    notes: 'Damask rose, peony and soft musk.',
    price: '₹2,799',
    image: `${base}bottles/rose.png`,
    scale: 0.95,
    theme: { base: '#efbdb8', deep: '#d68c96', glow: '#fbdcd6', ink: '#5c2336', tint: '#f9d3d3', swatch: '#e79aa6' },
  },
  {
    id: 'midnight',
    collection: 'Midnight Oud',
    name: 'Black Oud',
    blurb: 'A bold and mysterious fragrance with a rich character.',
    notes: 'Oud, violet leaf and smoked patchouli.',
    price: '₹3,499',
    image: `${base}bottles/midnight.png`,
    scale: 0.92,
    theme: { base: '#3a1d4c', deep: '#1b0d27', glow: '#6a3a86', ink: '#f2e8ff', tint: '#7a4a9a', swatch: '#5a2d78' },
  },
  {
    id: 'crystal',
    collection: 'Crystal Bloom',
    name: 'White Jasmine',
    blurb: 'A fresh and graceful fragrance with a crystal-clear finish.',
    notes: 'Jasmine, pear blossom and clear musk.',
    price: '₹2,999',
    image: `${base}bottles/crystal.png`,
    scale: 0.8,
    theme: { base: '#f4ecda', deep: '#d8c6a0', glow: '#fffaf0', ink: '#4a3a1d', tint: '#fffaf0', swatch: '#e9dcc0' },
  },
]

export default perfumes
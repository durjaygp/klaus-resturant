import { Store } from '@tanstack/store'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  ingredients: string[]
  origin: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isCartOpen: boolean
}

export const products: Product[] = [
  // --- CAFÉ ---
  {
    id: 'p1',
    name: 'Latte de Vainilla Artesanal',
    description: 'Espresso de doble carga con leche vaporizada suave y vainilla orgánica de Madagascar.',
    price: 130.00,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772',
    category: 'Café',
    rating: 4.9,
    ingredients: ['Espresso', 'Leche', 'Vaina de Vainilla'],
    origin: 'Etiopía'
  },
  {
    id: 'p2',
    name: 'Nitro Cold Brew',
    description: 'Café infusionado en frío, cremoso y suave, con nitrógeno para una textura tipo Guinness.',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c',
    category: 'Café',
    rating: 4.8,
    ingredients: ['Café Cold Brew', 'Nitrógeno'],
    origin: 'Colombia'
  },
  {
    id: 'p3',
    name: 'Caramel Macchiato',
    description: 'Leche vaporizada con jarabe de vainilla, marcada con espresso y un toque de caramelo.',
    price: 125.00,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2',
    category: 'Café',
    rating: 4.7,
    ingredients: ['Espresso', 'Caramelo', 'Vainilla'],
    origin: 'Brasil'
  },
  {
    id: 'p4',
    name: 'Latte Español',
    description: 'Un latte cremoso y dulce con un toque de leche condensada y canela.',
    price: 135.00,
    image: 'https://images.unsplash.com/photo-1570968015849-fb475d225381',
    category: 'Café',
    rating: 4.9,
    ingredients: ['Espresso', 'Leche Condensada', 'Canela'],
    origin: 'Guatemala'
  },

  // --- TÉ Y MATCHA ---
  {
    id: 'p5',
    name: 'Matcha Ceremonial',
    description: 'Matcha de Uji molido en piedra con leche de avena cremosa para un impulso de energía.',
    price: 150.00,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7',
    category: 'Té',
    rating: 4.9,
    ingredients: ['Matcha de Uji', 'Leche de Avena'],
    origin: 'Kioto, Japón'
  },
  {
    id: 'p6',
    name: 'Té Zen de Hibisco',
    description: 'Pétalos de hibisco sin cafeína con limoncillo y capullos de rosa.',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3',
    category: 'Té',
    rating: 4.8,
    ingredients: ['Hibisco', 'Limoncillo', 'Rosa'],
    origin: 'Egipto'
  },
  {
    id: 'p7',
    name: 'Earl Grey Reserva',
    description: 'Té negro premium infusionado con aceite de bergamota prensado en frío y flores azules.',
    price: 100.00,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4586c562',
    category: 'Té',
    rating: 4.6,
    ingredients: ['Té Negro', 'Bergamota'],
    origin: 'Sri Lanka'
  },

  // --- JUGOS Y SMOOTHIES ---
  {
    id: 'p8',
    name: 'Vitalidad Prensada en Frío',
    description: 'Naranjas Valencia orgánicas, raíz de jengibre y cúrcuma fresca.',
    price: 170.00,
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8',
    category: 'Jugos',
    rating: 4.8,
    ingredients: ['Naranja', 'Jengibre', 'Cúrcuma'],
    origin: 'Granjas Locales'
  },
  {
    id: 'p9',
    name: 'Detox Verde',
    description: 'Col rizada, espinaca, manzana verde, pepino y un toque de limón.',
    price: 175.00,
    image: 'https://images.unsplash.com/photo-1610970881699-44a55b6cfbb2',
    category: 'Jugos',
    rating: 4.7,
    ingredients: ['Col Rizada', 'Manzana', 'Pepino'],
    origin: 'Granjas Locales'
  },
  {
    id: 'p10',
    name: 'Tropical Glow',
    description: 'Mango Alphonso, piña y leche de coco mezclados para la luminosidad.',
    price: 180.00,
    image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82',
    category: 'Smoothies',
    rating: 4.6,
    ingredients: ['Mango', 'Piña', 'Coco'],
    origin: 'Filipinas'
  },

  // --- MOCKTAILS ---
  {
    id: 'p11',
    name: 'Midnight Berry',
    description: 'Moras silvestres y jugo de lima con agua botánica con gas.',
    price: 240.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd',
    category: 'Mocktails',
    rating: 4.7,
    ingredients: ['Mora', 'Lima', 'Agua con Gas'],
    origin: 'Recolección Manual'
  },
  {
    id: 'p12',
    name: 'Refresco de Pepino y Menta',
    description: 'Rodajas de pepino, menta fresca y jarabe de flor de saúco.',
    price: 230.00,
    image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7e',
    category: 'Mocktails',
    rating: 4.8,
    ingredients: ['Pepino', 'Menta', 'Flor de Saúco'],
    origin: 'Cultivo Propio'
  },

  // --- REPOSTERÍA Y BOCADILLOS ---
  {
    id: 'p13',
    name: 'Croissant de Mantequilla',
    description: 'Capas doradas y crujientes de hojaldre francés horneado cada mañana.',
    price: 90.00,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a',
    category: 'Repostería',
    rating: 4.9,
    ingredients: ['Harina', 'Mantequilla', 'Levadura'],
    origin: 'Estilo Normandía'
  },
  {
    id: 'p14',
    name: 'Pain au Chocolat de Almendra',
    description: 'Hojaldre relleno de chocolate amargo con láminas de almendra tostada.',
    price: 105.00,
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd',
    category: 'Repostería',
    rating: 4.8,
    ingredients: ['Chocolate', 'Almendra', 'Mantequilla'],
    origin: 'Panadería Artesanal'
  },
  {
    id: 'p15',
    name: 'Scone de Arándanos',
    description: 'Scone desmoronable y mantecoso lleno de arándanos frescos de montaña.',
    price: 80.00,
    image: 'https://images.unsplash.com/photo-1589114066467-950301e1d975',
    category: 'Repostería',
    rating: 4.7,
    ingredients: ['Arándanos', 'Crema', 'Mantequilla'],
    origin: 'Cosecha de Montaña'
  },
  {
    id: 'p16',
    name: 'Sourdough de Aguacate',
    description: 'Aguacate machacado sobre pan masa madre tostado con hojuelas de chile.',
    price: 280.00,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
    category: 'Bocadillos',
    rating: 4.9,
    ingredients: ['Aguacate', 'Masa Madre', 'Chile'],
    origin: 'Panadería Local'
  },
  {
    id: 'p17',
    name: 'Bagel de Salmón Ahumado',
    description: 'Queso crema, alcaparras, cebolla morada y salmón ahumado premium.',
    price: 330.00,
    image: 'https://images.unsplash.com/photo-1510431199141-945763529329',
    category: 'Bocadillos',
    rating: 4.8,
    ingredients: ['Salmón', 'Bagel', 'Queso Crema'],
    origin: 'Atlántico'
  },
  {
    id: 'p18',
    name: 'Acai Power Bowl',
    description: 'Acai puro con granola, plátano, fresas y miel.',
    price: 270.00,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733',
    category: 'Bocadillos',
    rating: 4.7,
    ingredients: ['Acai', 'Granola', 'Bayas'],
    origin: 'Cuenca del Amazonas'
  },
  {
    id: 'p19',
    name: 'Tarta de Limón',
    description: 'Crema de limón cítrica en una base crujiente, coronada con merengue.',
    price: 140.00,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13',
    category: 'Postres',
    rating: 4.8,
    ingredients: ['Limón', 'Huevos', 'Mantequilla'],
    origin: 'Especial de Pastelería'
  },
  {
    id: 'p20',
    name: 'Tarro de Tiramisú',
    description: 'Capas de soletillas empapadas en espresso y crema de mascarpone.',
    price: 170.00,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    category: 'Postres',
    rating: 4.9,
    ingredients: ['Espresso', 'Mascarpone', 'Cacao'],
    origin: 'Clásico Italiano'
  }
]

export const cartStore = new Store<CartState>({
  items: [],
  isCartOpen: false,
})

export const toggleCart = () => {
  cartStore.setState((state) => ({
    ...state,
    isCartOpen: !state.isCartOpen
  }))
  document.body.style.overflow = cartStore.state.isCartOpen ? 'hidden' : 'auto'
}

export const addToCart = (product: Product) => {
  cartStore.setState((state) => {
    const existingItem = state.items.find(item => item.id === product.id)
    if (existingItem) {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
    }
    return {
      ...state,
      items: [...state.items, { ...product, quantity: 1 }]
    }
  })
}

export const removeFromCart = (productId: string) => {
  cartStore.setState((state) => ({
    ...state,
    items: state.items.filter(item => item.id !== productId)
  }))
}

export const updateQuantity = (productId: string, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(productId)
    return
  }
  cartStore.setState((state) => ({
    ...state,
    items: state.items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
  }))
}

export const clearCart = () => {
  cartStore.setState((state) => ({
    ...state,
    items: []
  }))
}

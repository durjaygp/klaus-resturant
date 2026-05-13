export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  calories: number;
  ingredients: string[];
  instructions: string[];
  category: string;
}

export const recipes: Recipe[] = [
  {
    id: 'r1',
    name: 'Chilaquiles Verdes Tradicionales',
    description: 'Crujientes totopos de maíz bañados en salsa verde de tomatillo, coronados con crema, queso y cebolla.',
    image: 'https://images.unsplash.com/photo-1533614767277-9943f7223755',
    prepTime: '15 min',
    cookTime: '20 min',
    servings: 4,
    difficulty: 'Medio',
    calories: 450,
    category: 'Desayuno',
    ingredients: [
      '12 tortillas de maíz cortadas en triángulos',
      '500g de tomatillos verdes',
      '2 chiles serranos',
      '1 manojo de cilantro fresco',
      '200ml de crema ácida',
      '150g de queso fresco desmoronado',
      'Cebolla morada fileteada'
    ],
    instructions: [
      'Fríe los triángulos de tortilla hasta que estén dorados y crujientes.',
      'Limpia y cuece los tomatillos y chiles en agua hirviendo.',
      'Licúa los tomatillos, chiles, cilantro y un toque de sal.',
      'Fríe la salsa en una sartén grande y añade los totopos.',
      'Sirve caliente y decora con crema, queso y cebolla.'
    ]
  },
  {
    id: 'r2',
    name: 'Tacos al Pastor Caseros',
    description: 'El clásico de la Ciudad de México: cerdo marinado en achiote con piña asada y cilantro.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    prepTime: '30 min',
    cookTime: '45 min',
    servings: 6,
    difficulty: 'Difícil',
    calories: 520,
    category: 'Cena',
    ingredients: [
      '1kg de lomo de cerdo en rebanadas finas',
      '50g de pasta de achiote',
      '3 chiles guajillo hidratados',
      '1/2 taza de jugo de piña',
      'Piña fresca en rebanadas',
      'Cebolla blanca picada',
      'Cilantro y limones'
    ],
    instructions: [
      'Licúa el achiote, los chiles y el jugo de piña para crear el adobo.',
      'Marina la carne durante al menos 4 horas.',
      'Asa la carne a fuego alto junto con la piña.',
      'Pica la carne y sirve en tortillas calientes.',
      'Añade cebolla, cilantro y la piña asada.'
    ]
  },
  {
    id: 'r3',
    name: 'Mole Poblano Auténtico',
    description: 'Una joya culinaria: salsa compleja de chiles secos, chocolate y especias sobre pollo tierno.',
    image: 'https://images.unsplash.com/photo-1599974590462-21be364e6229',
    prepTime: '1 hora',
    cookTime: '2 horas',
    servings: 8,
    difficulty: 'Difícil',
    calories: 680,
    category: 'Comida',
    ingredients: [
      '1 pollo entero cocido en piezas',
      '100g de chile mulato',
      '100g de chile pasilla',
      '50g de chocolate de mesa',
      'Ajonjolí tostado',
      'Canela, clavo y pimienta',
      'Caldo de pollo'
    ],
    instructions: [
      'Tuesta y desvena todos los chiles.',
      'Fríe los chiles con las especias y licúa con caldo de pollo.',
      'Fríe la pasta resultante y añade el chocolate.',
      'Cocina a fuego lento hasta que espese y suelte grasa.',
      'Baña el pollo con el mole y espolvorea ajonjolí.'
    ]
  },
  {
    id: 'r4',
    name: 'Guacamole Premium con Granada',
    description: 'Cremoso aguacate Hass con un toque moderno de granada y semillas de calabaza.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
    prepTime: '10 min',
    cookTime: '0 min',
    servings: 4,
    difficulty: 'Fácil',
    calories: 210,
    category: 'Entradas',
    ingredients: [
      '3 aguacates maduros',
      '1/2 taza de granada fresca',
      '2 cucharadas de pepitas de calabaza tostadas',
      'Cebolla morada finamente picada',
      'Chiles serranos picados',
      'Jugo de 2 limones'
    ],
    instructions: [
      'Machaca el aguacate en un molcajete o tazón.',
      'Añade cebolla, chile y jugo de limón.',
      'Mezcla suavemente para mantener trozos.',
      'Decora generosamente con granada y pepitas tostadas.'
    ]
  }
];

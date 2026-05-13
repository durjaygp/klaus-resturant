import { createFileRoute, Link } from '@tanstack/solid-router'
import { For } from 'solid-js'
import { recipes } from '../lib/recipes-store'

export const Route = createFileRoute('/recipes')({
  component: RecipesPage,
})

function RecipesPage() {
  return (
    <main class="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 -z-10"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/4 -z-10"></div>

      <div class="max-w-[1400px] mx-auto">
        <header class="mb-20 text-center relative">
          <span class="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in">
            Nuestra Cocina
          </span>
          <h1 class="text-5xl lg:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600">
            Recetas de Autor
          </h1>
          <p class="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Descubre los secretos de nuestra cocina y aprende a preparar los platillos más emblemáticos de México con un toque contemporáneo.
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <For each={recipes}>
            {(recipe) => (
              <Link 
                to="/recipes/$id" 
                params={{ id: recipe.id }}
                class="group block relative bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border border-gray-100"
              >
                <div class="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  <div class="absolute top-6 left-6 flex flex-col gap-2">
                    <span class="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase border border-white/20">
                      {recipe.category}
                    </span>
                  </div>

                  <div class="absolute bottom-8 left-8 right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div class="flex items-center gap-4 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      <span class="flex items-center gap-1.5 text-xs">
                        <i class="fa-regular fa-clock text-brand-orange"></i>
                        {recipe.prepTime}
                      </span>
                      <span class="w-1 h-1 rounded-full bg-white/30"></span>
                      <span class="flex items-center gap-1.5 text-xs">
                        <i class="fa-solid fa-chart-simple text-brand-orange"></i>
                        {recipe.difficulty}
                      </span>
                    </div>
                    <h3 class="text-2xl font-bold leading-tight mb-2 group-hover:text-brand-orange transition-colors duration-300">
                      {recipe.name}
                    </h3>
                  </div>
                </div>
              </Link>
            )}
          </For>
        </div>
      </div>
    </main>
  )
}

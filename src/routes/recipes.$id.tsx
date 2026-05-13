import { createFileRoute, Link } from '@tanstack/solid-router'
import { For, Show } from 'solid-js'
import { recipes } from '../lib/recipes-store'

export const Route = createFileRoute('/recipes/$id')({
  component: RecipeDetail,
})

function RecipeDetail() {
  const params = Route.useParams()
  const recipe = () => recipes.find((r) => r.id === params.id)

  return (
    <Show when={recipe()}>
      {(r) => (
        <main class="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans">
          {/* Cinematic Hero Section */}
          <div class="relative h-[85vh] w-full overflow-hidden">
            <img 
              src={r().image} 
              alt={r().name} 
              class="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FAFAFA]"></div>
            
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <Link 
                to="/recipes"
                class="mb-12 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
              >
                <i class="fa-solid fa-arrow-left text-sm group-hover:-translate-x-1 transition-transform"></i>
                <span class="text-sm font-medium tracking-widest uppercase">Volver a Recetas</span>
              </Link>
              
              <span class="px-6 py-2 rounded-full bg-brand-orange text-white text-xs font-bold tracking-widest uppercase mb-8 shadow-xl">
                {r().category}
              </span>
              <h1 class="text-6xl lg:text-8xl font-black text-white tracking-tighter mb-8 drop-shadow-2xl">
                {r().name}
              </h1>
              <p class="text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                {r().description}
              </p>
            </div>

            {/* Quick Stats Overlap */}
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-5xl bg-white rounded-[40px] shadow-2xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 z-20 border border-gray-100">
              <div class="flex flex-col items-center gap-2">
                <i class="fa-regular fa-clock text-2xl text-brand-orange"></i>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Preparación</span>
                <span class="font-bold text-lg">{r().prepTime}</span>
              </div>
              <div class="flex flex-col items-center gap-2 border-l border-gray-100">
                <i class="fa-solid fa-fire text-2xl text-brand-orange"></i>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cocción</span>
                <span class="font-bold text-lg">{r().cookTime}</span>
              </div>
              <div class="flex flex-col items-center gap-2 border-l border-gray-100">
                <i class="fa-solid fa-users text-2xl text-brand-orange"></i>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Porciones</span>
                <span class="font-bold text-lg">{r().servings} personas</span>
              </div>
              <div class="flex flex-col items-center gap-2 border-l border-gray-100">
                <i class="fa-solid fa-bolt text-2xl text-brand-orange"></i>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Calorías</span>
                <span class="font-bold text-lg">{r().calories} kcal</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div class="max-w-[1400px] mx-auto px-6 lg:px-12 pt-48 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Ingredients Sidebar */}
            <div class="lg:col-span-4">
              <div class="sticky top-32">
                <div class="bg-gray-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
                  <div class="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <h2 class="text-3xl font-bold mb-10 relative">Ingredientes</h2>
                  <ul class="space-y-6 relative">
                    <For each={r().ingredients}>
                      {(ingredient) => (
                        <li class="flex items-start gap-4 group">
                          <div class="w-6 h-6 rounded-full border border-brand-orange/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-orange transition-colors">
                            <i class="fa-solid fa-check text-[10px] text-brand-orange group-hover:text-white transition-colors"></i>
                          </div>
                          <span class="text-gray-300 font-medium">{ingredient}</span>
                        </li>
                      )}
                    </For>
                  </ul>
                  
                  <button class="w-full mt-12 py-5 rounded-2xl bg-brand-orange text-white font-bold hover:bg-orange-600 transition-all duration-300 shadow-orange-glow">
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>

            {/* Instructions Main Column */}
            <div class="lg:col-span-8">
              <h2 class="text-4xl font-bold mb-12">Preparación Paso a Paso</h2>
              <div class="space-y-16">
                <For each={r().instructions}>
                  {(step, index) => (
                    <div class="flex gap-10 group">
                      <div class="flex-shrink-0">
                        <span class="text-7xl font-black text-gray-100 group-hover:text-brand-orange/20 transition-colors duration-500">
                          {(index() + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <div class="pt-4">
                        <div class="h-1 w-12 bg-brand-orange mb-6 rounded-full"></div>
                        <p class="text-xl text-gray-600 leading-relaxed font-medium">
                          {step}
                        </p>
                      </div>
                    </div>
                  )}
                </For>
              </div>

              {/* Tips Section */}
              <div class="mt-24 p-10 rounded-[40px] bg-white border border-dashed border-brand-orange/30 relative overflow-hidden">
                <div class="flex items-start gap-8 relative z-10">
                  <div class="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-lightbulb text-2xl text-brand-orange"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold mb-4">Secreto del Chef</h3>
                    <p class="text-lg text-gray-500 leading-relaxed">
                      Para un sabor más profundo, deja reposar la salsa durante 10 minutos antes de añadir los totopos. La temperatura ideal es cuando el vapor sube de forma constante pero suave.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </Show>
  )
}

import { createFileRoute } from '@tanstack/solid-router'
import { createSignal, createMemo, Show, onMount, onCleanup, For } from 'solid-js'
import { products, addToCart } from '../lib/cart-store'

export const Route = createFileRoute('/product/$id')({
  component: ProductDetailsPage,
})

function FadeIn(props: { children: any; delay?: number; class?: string }) {
  let ref!: HTMLDivElement
  const [isVisible, setIsVisible] = createSignal(false)

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref) observer.observe(ref)
    onCleanup(() => observer.disconnect())
  })

  return (
    <div
      ref={ref}
      class={`transition-all duration-1000 ease-out ${
        isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${props.class || ''}`}
      style={{ 'transition-delay': `${props.delay || 0}ms` }}
    >
      {props.children}
    </div>
  )
}

function ProductDetailsPage() {
  const params = Route.useParams()
  const product = createMemo(() => products.find(p => p.id === params().id))
  
  const [quantity, setQuantity] = createSignal(1)
  const [selectedSize, setSelectedSize] = createSignal('Regular')
  const [activeTab, setActiveTab] = createSignal('description')
  
  let relatedSliderRef!: HTMLDivElement

  const handleAddToCart = (p: any) => {
    for (let i = 0; i < quantity(); i++) {
      addToCart(p)
    }
  }

  const scrollSlider = (direction: 'left' | 'right') => {
    if (relatedSliderRef) {
      relatedSliderRef.scrollBy({ left: direction === 'right' ? 350 : -350, behavior: 'smooth' })
    }
  }

  return (
    <main class="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-brand-orange/30 overflow-hidden pt-32 pb-24">
      {/* Background Pulses to match Homepage */}
      <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div class="absolute top-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-brand-orange/10 blur-[120px] animate-pulse" />
        <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-400/5 blur-[120px] animate-pulse" style="animation-delay: 2s;" />
      </div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <Show 
          when={product()} 
          fallback={
            <div class="text-center py-32 h-[60vh] flex flex-col justify-center items-center">
              <h1 class="text-4xl font-extrabold mb-4 text-gray-900">Producto No Encontrado</h1>
              <p class="text-gray-500 mb-8 max-w-md">El artículo que buscas no existe o ha sido retirado de nuestro menú de temporada.</p>
              <a href="/#menu" class="px-8 py-4 bg-gray-900 hover:bg-black hover:shadow-2xl text-white rounded-full font-medium transition-all duration-300">
                Volver al Menú
              </a>
            </div>
          }
        >
          {(p) => (
            <>
              {/* Breadcrumbs */}
              <FadeIn>
                <nav class="flex text-sm text-gray-500 mb-8 items-center gap-2">
                  <a href="/" class="hover:text-brand-orange transition-colors">Inicio</a>
                  <i class="fa-solid fa-chevron-right text-[10px]"></i>
                  <a href="/#menu" class="hover:text-brand-orange transition-colors">Menú</a>
                  <i class="fa-solid fa-chevron-right text-[10px]"></i>
                  <span class="text-gray-900 font-medium">{p().category}</span>
                  <i class="fa-solid fa-chevron-right text-[10px]"></i>
                  <span class="text-brand-orange font-bold">{p().name}</span>
                </nav>
              </FadeIn>

              {/* Hero Product Details */}
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                
                {/* Left: Image Showcase */}
                <div class="lg:col-span-7">
                  <FadeIn delay={100} class="relative group rounded-[2.5rem] overflow-hidden bg-white/40 p-4 border border-white/60 shadow-xl backdrop-blur-xl">
                    <div class="absolute inset-0 bg-gradient-to-tr from-brand-orange/5 to-transparent pointer-events-none"></div>
                    <div class="aspect-square rounded-[2rem] overflow-hidden relative bg-gray-50">
                      <img 
                        src={`${p().image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`}
                        alt={p().name} 
                        class="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                      />
                      <div class="absolute top-6 left-6 flex gap-2">
                        <span class="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1.5">
                          <i class="fa-solid fa-star text-yellow-500"></i> {p().rating}
                        </span>
                        <span class="px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-bold shadow-sm">
                          Especial del Chef
                        </span>
                      </div>
                      <button class="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 shadow-sm flex items-center justify-center transition-colors">
                        <i class="fa-regular fa-heart"></i>
                      </button>
                    </div>
                  </FadeIn>

                  {/* Image Thumbnails */}
                  <FadeIn delay={200} class="flex gap-4 mt-6">
                    {[1, 2, 3].map((_, idx) => (
                      <div class={`w-24 h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-colors ${idx === 0 ? 'border-brand-orange shadow-orange' : 'border-transparent hover:border-gray-200'}`}>
                        <img 
                          src={`${p().image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80&sig=${idx}`}
                          alt="Thumbnail" 
                          class="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </FadeIn>
                </div>
                
                {/* Right: Info & Cart */}
                <div class="lg:col-span-5 flex flex-col">
                  <FadeIn delay={200}>
                    <div class="inline-block px-3 py-1 rounded-lg bg-orange-50 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4 border border-orange-100">
                      {p().category}
                    </div>
                    <h1 class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight text-gray-900">
                      {p().name}
                    </h1>
                    
                    <div class="flex items-baseline gap-4 mb-6">
                      <span class="text-4xl font-extrabold text-brand-orange">${p().price.toFixed(2)} MXN</span>
                      <span class="text-lg text-gray-400 line-through">${(p().price * 1.2).toFixed(2)} MXN</span>
                    </div>

                    <p class="text-gray-500 text-lg leading-relaxed mb-8 font-light">
                      {p().description}
                    </p>
                  </FadeIn>
                  
                  {/* Customization Panel */}
                  <FadeIn delay={300} class="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 shadow-soft mb-8">
                    
                    {/* Size Selection */}
                    <div class="mb-8">
                      <div class="flex justify-between items-center mb-4">
                        <h3 class="font-bold text-gray-900">Tamaño de la Porción</h3>
                        <span class="text-xs text-brand-orange font-semibold">Requerido</span>
                      </div>
                      <div class="grid grid-cols-2 gap-3">
                        {['Regular', 'Grande (+ $80.00)'].map(size => (
                          <button 
                            onClick={() => setSelectedSize(size)}
                            class={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all duration-300 flex justify-between items-center ${
                              selectedSize() === size 
                                ? 'border-brand-orange bg-orange-50 text-brand-orange shadow-sm' 
                                : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
                            }`}
                          >
                            {size.split(' ')[0]}
                            {selectedSize() === size && <i class="fa-solid fa-circle-check"></i>}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div class="flex items-center justify-between">
                      <h3 class="font-bold text-gray-900">Cantidad</h3>
                      <div class="flex items-center bg-gray-50 border border-gray-200 rounded-full p-1 shadow-inner">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity() - 1))}
                          class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-brand-orange transition-colors"
                        >
                          <i class="fa-solid fa-minus text-sm"></i>
                        </button>
                        <span class="w-12 text-center font-bold text-gray-900">{quantity()}</span>
                        <button 
                          onClick={() => setQuantity(quantity() + 1)}
                          class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-brand-orange transition-colors"
                        >
                          <i class="fa-solid fa-plus text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </FadeIn>
                  
                  {/* Action Buttons */}
                  <FadeIn delay={400} class="mt-auto">
                    <div class="flex gap-4">
                      <button 
                        onClick={() => handleAddToCart(p())}
                        class="flex-1 bg-gray-900 text-white py-4 px-6 rounded-2xl font-bold hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 shadow-md"
                      >
                        <i class="fa-solid fa-cart-shopping"></i> Agregar al Carrito • ${(p().price * quantity() + (selectedSize().includes('Grande') ? 80 : 0)).toFixed(2)} MXN
                      </button>
                    </div>
                    <div class="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
                      <span class="flex items-center gap-2"><i class="fa-solid fa-truck-fast text-gray-400"></i> Entrega Gratis</span>
                      <span class="flex items-center gap-2"><i class="fa-solid fa-stopwatch text-gray-400"></i> 15-20 Min</span>
                    </div>
                  </FadeIn>
                </div>
              </div>

              {/* Description & Ingredients Tabs */}
              <FadeIn class="mb-24">
                <div class="border-b border-gray-200 flex gap-8 mb-8">
                  {[
                    { id: 'description', label: 'Descripción' },
                    { id: 'ingredients', label: 'Ingredientes' },
                    { id: 'reviews', label: 'Reseñas' }
                  ].map(tab => (
                    <button 
                      onClick={() => setActiveTab(tab.id)}
                      class={`pb-4 text-lg font-bold capitalize transition-colors relative ${activeTab() === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {tab.label}
                      {activeTab() === tab.id && (
                        <span class="absolute bottom-0 left-0 w-full h-1 bg-brand-orange rounded-t-full shadow-orange"></span>
                      )}
                    </button>
                  ))}
                </div>
                
                <div class="min-h-[200px]">
                  <Show when={activeTab() === 'description'}>
                    <div class="max-w-3xl animate-entrance-up">
                      <p class="text-gray-500 leading-relaxed text-lg font-light mb-6">
                        {p().description} Cada ingrediente es meticulosamente seleccionado de {p().origin} y preparado con cuidado. Esta bebida representa nuestro compromiso con la excelencia.
                      </p>
                      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                        {[
                          { label: 'Orgánico', icon: 'fa-leaf' },
                          { label: 'Natural', icon: 'fa-seedling' },
                          { label: 'Fresco Diario', icon: 'fa-clock' },
                          { label: 'Sostenible', icon: 'fa-earth-americas' }
                        ].map(badge => (
                          <div class="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-soft group hover:border-brand-orange transition-colors">
                            <i class={`fa-solid ${badge.icon} text-brand-orange text-xl mb-2`}></i>
                            <p class="text-xs font-bold text-gray-900">{badge.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Show>
                  
                  <Show when={activeTab() === 'ingredients'}>
                    <div class="animate-entrance-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <For each={p().ingredients}>
                        {(ing) => (
                          <div class="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div class="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                              <i class="fa-solid fa-check"></i>
                            </div>
                            <span class="font-bold text-gray-800">{ing}</span>
                          </div>
                        )}
                      </For>
                    </div>
                  </Show>

                  <Show when={activeTab() === 'reviews'}>
                    <div class="animate-entrance-up max-w-4xl space-y-6">
                      {[1, 2].map((i) => (
                        <div class="bg-white border border-gray-100 p-6 rounded-3xl shadow-soft">
                          <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-4">
                              <img src={`https://randomuser.me/api/portraits/women/${40+i}.jpg`} class="w-12 h-12 rounded-full object-cover" alt="User" />
                              <div>
                                <h4 class="font-bold text-gray-900">Awesome Customer {i}</h4>
                                <h4 class="font-bold text-gray-900">Cliente Satisfecho {i}</h4>
                                <div class="flex text-yellow-400 text-[10px] mt-1">
                                  <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                                </div>
                              </div>
                            </div>
                            <span class="text-gray-400 text-xs">hace 2 días</span>
                          </div>
                          <p class="text-gray-600 text-sm leading-relaxed">¡Absolutamente fantástico! Los sabores son ricos y la presentación fue impecable. Pido esto cada vez que visito Foodie. Altamente recomendado.</p>
                        </div>
                      ))}
                    </div>
                  </Show>
                </div>
              </FadeIn>

              {/* Related Items Section */}
              <FadeIn class="border-t border-gray-200 pt-16">
                <div class="flex justify-between items-end mb-10">
                  <div>
                    <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900">También Te Podría Gustar</h2>
                  </div>
                  <div class="flex gap-3">
                    <button onClick={() => scrollSlider('left')} class="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all shadow-sm">
                      <i class="fa-solid fa-arrow-left text-sm"></i>
                    </button>
                    <button onClick={() => scrollSlider('right')} class="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-brand-orange hover:shadow-orange transition-all shadow-sm">
                      <i class="fa-solid fa-arrow-right text-sm"></i>
                    </button>
                  </div>
                </div>

                <div ref={relatedSliderRef} class="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8">
                  <For each={products.filter(pr => pr.id !== p().id).slice(0, 4)}>
                    {(relItem, i) => (
                      <div class="min-w-[280px] snap-center bg-white/60 backdrop-blur-lg p-4 rounded-3xl border border-gray-100 shadow-soft hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                        <a href={`/product/${relItem.id}`} class="block relative mb-4 aspect-square rounded-2xl overflow-hidden bg-gray-50">
                          <span class="absolute top-3 left-3 font-bold text-[10px] bg-white/90 backdrop-blur px-2 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
                            <i class="fa-solid fa-star text-yellow-400"></i> {relItem.rating}
                          </span>
                          <img src={`${relItem.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} alt={relItem.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </a>
                        <div class="px-2">
                          <h3 class="font-bold text-base text-gray-900 truncate mb-1">{relItem.name}</h3>
                          <p class="font-bold text-brand-orange">${relItem.price.toFixed(2)}</p>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </FadeIn>
            </>
          )}
        </Show>
      </div>
    </main>
  )
}

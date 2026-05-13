import { createFileRoute } from '@tanstack/solid-router'
import { For, createSignal, onMount, onCleanup } from 'solid-js'
import { products, addToCart } from '../lib/cart-store'

export const Route = createFileRoute('/menu')({
  component: MenuPage,
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

function MenuPage() {
  const categories = ['Café', 'Té', 'Jugos', 'Smoothies', 'Mocktails', 'Repostería', 'Bocadillos', 'Postres']

  return (
    <main class="min-h-screen bg-[#FDFCF9] text-[#1A1A1A] font-serif pt-32 pb-24 overflow-hidden">
      {/* Background Texture */}
      <div class="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style="background-image: url('https://www.transparenttextures.com/patterns/paper-fibers.png');"></div>

      <div class="max-w-[1200px] mx-auto px-6 relative z-10">
        <FadeIn class="text-center mb-20">
          <p class="text-brand-orange font-sans font-bold tracking-[0.3em] uppercase text-sm mb-4">La Selección</p>
          <h1 class="text-6xl md:text-8xl font-black text-gray-900 mb-6 italic tracking-tight">Le Menu</h1>
          <div class="w-24 h-1 bg-brand-orange mx-auto rounded-full"></div>
        </FadeIn>

        {/* Menu Book Layout */}
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 relative">
          {/* Vertical Divider for Book Look */}
          <div class="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>

          <For each={categories}>
            {(cat, idx) => (
              <FadeIn delay={idx() * 50} class="mb-16">
                <div class="flex items-center gap-4 mb-10 group">
                  <h2 class="text-3xl font-black text-gray-900 tracking-tight group-hover:text-brand-orange transition-colors">{cat}</h2>
                  <div class="flex-1 h-px bg-gray-100 group-hover:bg-brand-orange/30 transition-all duration-500"></div>
                  <span class="text-xs font-sans font-bold text-gray-400 group-hover:text-brand-orange uppercase tracking-widest">{products.filter(p => p.category === cat).length} artículos</span>
                </div>

                <div class="space-y-10">
                  <For each={products.filter(p => p.category === cat)}>
                    {(item) => (
                      <div class="group relative">
                        <div class="flex justify-between items-start mb-2">
                          <div class="flex-1 pr-4">
                            <div class="flex items-baseline gap-2 mb-1">
                              <h3 class="text-xl font-bold text-gray-900 group-hover:text-brand-orange transition-colors">{item.name}</h3>
                              <div class="flex-1 border-b border-dotted border-gray-300 group-hover:border-brand-orange/30 transition-all"></div>
                            </div>
                            <p class="text-gray-500 font-sans text-sm italic font-light leading-relaxed mb-4">{item.description}</p>
                          </div>
                          <div class="flex flex-col items-end gap-2">
                             <span class="text-xl font-black text-gray-900">${item.price.toFixed(2)} MXN</span>
                             <button 
                                onClick={() => addToCart(item)}
                                class="text-[10px] font-sans font-bold uppercase tracking-tighter bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-brand-orange transition-all scale-0 group-hover:scale-100 origin-right shadow-lg"
                             >
                               + Agregar
                             </button>
                          </div>
                        </div>
                        {/* Interactive Image Preview on Hover */}
                        <div class="absolute -left-32 top-0 w-24 h-24 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 group-hover:-left-28 transition-all duration-500 shadow-2xl pointer-events-none hidden xl:block">
                           <img src={`${item.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} class="w-full h-full object-cover" alt={item.name} />
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </FadeIn>
            )}
          </For>
        </div>

        {/* Call to Action */}
        <FadeIn class="mt-20 p-12 rounded-[3rem] bg-gray-900 text-center relative overflow-hidden group">
          <div class="absolute inset-0 bg-brand-orange/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <h2 class="text-4xl font-bold text-white mb-6 relative z-10">¿Hambre de más?</h2>
          <p class="text-gray-400 mb-10 max-w-xl mx-auto font-sans font-light text-lg relative z-10">Vive la experiencia de nuestros especiales de temporada y catas de café en persona en nuestra tostaduría.</p>
          <div class="flex flex-wrap justify-center gap-4 relative z-10">
            <button class="bg-brand-orange text-white px-10 py-4 rounded-full font-sans font-bold hover:bg-orange-600 transition-all hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1">Reservar Mesa</button>
            <button class="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full font-sans font-bold hover:bg-white/10 transition-all">Descargar Menú PDF</button>
          </div>
        </FadeIn>
      </div>

      {/* Side Note Decor */}
      <div class="fixed right-10 bottom-20 vertical-text hidden xl:block text-gray-300 font-sans font-bold tracking-[0.5em] text-[10px] uppercase select-none">
        Elaborado con pasión • Establecido 2026
      </div>
    </main>
  )
}

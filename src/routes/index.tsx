import { createFileRoute, Link } from '@tanstack/solid-router'
import { createSignal, onMount, For, onCleanup } from 'solid-js'
import { products, addToCart } from '../lib/cart-store'

export const Route = createFileRoute('/')({ component: Home })

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

function Home() {
  let reviewSliderRef: HTMLDivElement | undefined

  const scrollSlider = (direction: 'left' | 'right') => {
    if (reviewSliderRef) {
      reviewSliderRef.scrollBy({ left: direction === 'right' ? 350 : -350, behavior: 'smooth' })
    }
  }

  return (
    <div class="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans selection:bg-brand-orange/30 overflow-hidden">
      {/* Background Gradients */}
      <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-orange/10 blur-[120px] animate-pulse" />
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-400/5 blur-[120px] animate-pulse" style="animation-delay: 2s;" />
      </div>

      <div class="max-w-[1400px] mx-auto relative z-10">

        {/* Hero Section */}
        <main id="home" class="px-6 lg:px-12 pt-32 pb-24 grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          <div class="max-w-2xl relative z-10">
            <FadeIn>
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-brand-orange font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                </span>
                Origen Ético y Preparación Artesanal
              </div>
            </FadeIn>
            
            <FadeIn delay={100}>
              <h1 class="text-6xl md:text-8xl font-extrabold leading-[1.05] tracking-tight mb-8 text-gray-900">
                La Perfección <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500 inline-block transform hover:scale-105 transition-transform duration-500 cursor-default">
                  En Cada Taza.
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={200}>
              <p class="text-gray-500 mb-12 leading-relaxed text-lg font-light max-w-xl">
                Experimenta el arte de la preparación perfecta. Desde granos de origen único hasta elíxires prensados en frío, elaboramos cada bebida con precisión, pasión y los mejores ingredientes orgánicos.
              </p>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div class="flex flex-wrap items-center gap-4 mb-12">
                <button class="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex items-center gap-2">
                  Ordenar Ahora
                  <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </button>
                <button class="bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-full font-medium hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  Nuestra Historia
                </button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={400} class="relative w-full aspect-square max-w-[600px] mx-auto z-10 mt-10 lg:mt-0">
            <div class="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-transparent rounded-full blur-3xl"></div>
            
            <div class="relative w-full h-full rounded-full p-4 bg-white/40 backdrop-blur-3xl border border-white/60 shadow-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1000&q=80" alt="Artisan Coffee" class="w-full h-full object-cover rounded-full shadow-inner transform hover:scale-110 transition-transform duration-[2s]" />
            </div>

            <div class="absolute bottom-12 -left-12 z-20 animate-float">
              <div class="bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-xl flex items-center gap-4 border border-gray-100 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=200&q=80" alt="Matcha Latte" class="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                <div class="pr-4">
                  <h4 class="font-bold text-sm text-gray-900">Uji Matcha</h4>
                  <div class="text-yellow-400 text-[10px] my-1 flex gap-0.5">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                  </div>
                  <p class="text-brand-orange font-bold text-sm mt-1">$150.00 MXN</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </main>

        {/* Menu Section */}
        <section id="menu" class="px-6 lg:px-12 py-24">
          <FadeIn>
            <div class="text-center mb-16">
              <p class="text-brand-orange font-semibold text-sm tracking-widest uppercase mb-3">Excelencia Líquida</p>
              <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">Nuestras Bebidas de Autor</h2>
            </div>
          </FadeIn>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <For each={products}>
              {(dish, i) => (
                <FadeIn delay={i() * 100}>
                  <div class="bg-white/60 backdrop-blur-lg p-4 rounded-3xl border border-gray-100 shadow-soft hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
                    <a href={`/product/${dish.id}`} class="block relative mb-6 aspect-square rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <span class="absolute top-3 left-3 font-bold text-xs bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm z-10 flex items-center gap-1">
                        <i class="fa-solid fa-star text-yellow-400"></i> {dish.rating}
                      </span>
                      <img src={`${dish.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} alt={dish.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                    </a>
                    <div class="px-2 flex flex-col flex-grow">
                      <div class="flex justify-between items-start mb-4 flex-grow">
                        <a href={`/product/${dish.id}`} class="font-bold text-lg text-gray-900 group-hover:text-brand-orange transition-colors line-clamp-2 pr-2">{dish.name}</a>
                        <p class="font-bold text-lg text-gray-900 flex-shrink-0">${dish.price.toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => addToCart(dish)}
                        class="w-full py-3 rounded-xl bg-gray-50 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm flex items-center justify-center gap-2 group/btn mt-auto"
                      >
                        <i class="fa-solid fa-plus text-xs group-hover/btn:rotate-90 transition-transform"></i> Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </FadeIn>
              )}
            </For>
          </div>
          <div class="mt-16 text-center">
            <FadeIn delay={400}>
              <a href="/menu" class="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group shadow-xl">
                Ver Menú Completo
                <i class="fa-solid fa-book-open text-brand-orange group-hover:rotate-12 transition-transform"></i>
              </a>
            </FadeIn>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" class="py-24 relative">
          <div class="absolute inset-0 bg-gray-900 -mx-[50vw] px-[50vw] z-[-1]"></div>
          
          <div class="flex justify-between items-end mb-16 px-6 lg:px-12">
            <FadeIn>
              <p class="text-gray-400 font-semibold text-sm tracking-widest uppercase mb-3">Testimonios</p>
              <h2 class="text-4xl md:text-5xl font-extrabold text-white">Experiencias de Invitados</h2>
            </FadeIn>
            <FadeIn delay={200} class="flex items-center gap-6">
              <div class="hidden sm:flex gap-4">
                <button onClick={() => scrollSlider('left')} class="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-brand-orange hover:scale-110 transition-all duration-300">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button onClick={() => scrollSlider('right')} class="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-brand-orange hover:scale-110 transition-all duration-300">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
              <a href="/reviews" class="bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-lg text-sm">
                Ver Todas las Reseñas
              </a>
            </FadeIn>
          </div>

          <div ref={reviewSliderRef} class="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 px-6 lg:px-12">
            <For each={[
              { name: 'Sarah Jenkins', role: 'Entusiasta del Café', text: 'El Latte de Vainilla Artesanal te cambia la vida. Realmente se nota la calidad de los granos de Etiopía.', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'Michael Doe', role: 'Coach de Salud', text: 'Finalmente un lugar que se toma en serio los jugos prensados en frío. La mezcla Vitality es mi ritual diario.', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { name: 'Emily Watson', role: 'Mixóloga', text: 'El Midnight Berry Mocktail es tan sofisticado. Las notas botánicas están perfectamente equilibradas.', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
              { name: 'David Clark', role: 'Sommelier de Té', text: 'Es raro encontrar un matcha de grado ceremonial tan bueno. La textura es increíblemente suave y vibrante.', img: 'https://randomuser.me/api/portraits/men/85.jpg' }
            ]}>
              {(review, i) => (
                <FadeIn delay={i() * 100} class="min-w-[340px] md:min-w-[420px] snap-center">
                  <div class="bg-gray-800/50 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 hover:bg-gray-800 transition-colors duration-300">
                    <div class="flex text-brand-orange text-sm mb-6">
                      <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    </div>
                    <p class="text-gray-300 mb-8 text-lg leading-relaxed font-light">"{review.text}"</p>
                    <div class="flex items-center gap-4">
                      <img src={review.img} alt="User" class="w-12 h-12 rounded-full object-cover ring-2 ring-gray-700" />
                      <div>
                        <h4 class="font-bold text-white">{review.name}</h4>
                        <p class="text-sm text-gray-400">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}
            </For>
          </div>
        </section>

        {/* Informative Section: Our Process */}
        <section id="process" class="px-6 lg:px-12 py-24 bg-white relative z-10">
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div class="relative group">
                <div class="absolute -inset-4 bg-brand-orange/20 rounded-[2rem] blur-2xl group-hover:bg-brand-orange/30 transition-colors duration-500"></div>
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80" alt="Brewing Process" class="relative rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500" />
              </div>
            </FadeIn>
            <div>
              <FadeIn delay={200}>
                <p class="text-brand-orange font-semibold text-sm tracking-widest uppercase mb-3">El Oficio</p>
                <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">Cómo Preparamos la Excelencia</h2>
                <div class="space-y-8">
                  <div class="flex gap-6 group">
                    <div class="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0 font-bold text-xl shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">01</div>
                    <div>
                      <h4 class="font-bold text-xl mb-2 text-gray-900">Abastecimiento Ético</h4>
                      <p class="text-gray-500 leading-relaxed">Nos asociamos directamente con pequeños agricultores que priorizan la agricultura regenerativa y las prácticas de comercio justo.</p>
                    </div>
                  </div>
                  <div class="flex gap-6 group">
                    <div class="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0 font-bold text-xl shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">02</div>
                    <div>
                      <h4 class="font-bold text-xl mb-2 text-gray-900">Tostado de Precisión</h4>
                      <p class="text-gray-500 leading-relaxed">Nuestros granos se tuestan en casa en pequeñas cantidades para preservar los delicados perfiles aromáticos de cada origen.</p>
                    </div>
                  </div>
                  <div class="flex gap-6 group">
                    <div class="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0 font-bold text-xl shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">03</div>
                    <div>
                      <h4 class="font-bold text-xl mb-2 text-gray-900">Preparación Artesanal</h4>
                      <p class="text-gray-500 leading-relaxed">Ya sea la extracción perfecta de un espresso o el té ceremonial de infusión lenta, tratamos cada taza como una obra de arte.</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Informative Section: Ingredients */}
        <section id="ingredients" class="px-6 lg:px-12 py-24 bg-gray-50 relative z-10">
          <div class="text-center mb-20">
            <FadeIn>
              <p class="text-brand-orange font-semibold text-sm tracking-widest uppercase mb-3">Calidad Pura</p>
              <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Lo Que Importa Está en el Interior</h2>
              <p class="text-gray-500 mt-6 max-w-2xl mx-auto text-lg font-light">Creemos que la transparencia es la clave de la confianza. Aquí tienes un vistazo a los estándares que mantenemos para cada ingrediente.</p>
            </FadeIn>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FadeIn delay={100} class="bg-white p-10 rounded-[2.5rem] shadow-soft hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
              <div class="w-16 h-16 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <i class="fa-solid fa-leaf text-3xl"></i>
              </div>
              <h4 class="font-bold text-2xl mb-4 text-gray-900">100% Orgánico</h4>
              <p class="text-gray-500 leading-relaxed">Sin pesticidas ni fertilizantes sintéticos. Solo ingredientes puros y naturales cultivados como la naturaleza manda.</p>
            </FadeIn>
            <FadeIn delay={200} class="bg-white p-10 rounded-[2.5rem] shadow-soft hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
              <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <i class="fa-solid fa-droplet text-3xl"></i>
              </div>
              <h4 class="font-bold text-2xl mb-4 text-gray-900">Pureza Filtrada</h4>
              <p class="text-gray-500 leading-relaxed">Utilizamos un sistema de ósmosis inversa de varias etapas para asegurar que nuestra agua sea el lienzo más limpio para nuestros sabores.</p>
            </FadeIn>
            <FadeIn delay={300} class="bg-white p-10 rounded-[2.5rem] shadow-soft hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
              <div class="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <i class="fa-solid fa-handshake text-3xl"></i>
              </div>
              <h4 class="font-bold text-2xl mb-4 text-gray-900">Origen Local</h4>
              <p class="text-gray-500 leading-relaxed">Utilizamos exclusivamente miel de flores silvestres local y frutas de temporada, apoyando los ecosistemas locales.</p>
            </FadeIn>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" class="px-6 lg:px-12 py-24 bg-white relative z-10">
          <div class="max-w-6xl mx-auto">
            <div class="bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
              <div class="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                <FadeIn>
                  <p class="text-brand-orange font-semibold text-sm tracking-widest uppercase mb-3">Conéctate con Nosotros</p>
                  <h2 class="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">Visita Nuestra Tostaduría</h2>
                  <div class="space-y-6">
                    <div class="flex items-center gap-4 text-gray-300">
                      <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-orange border border-white/10">
                        <i class="fa-solid fa-location-dot"></i>
                      </div>
                      <p>Av. Artesanal 123, Distrito del Café, CDMX 01000</p>
                    </div>
                    <div class="flex items-center gap-4 text-gray-300">
                      <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-orange border border-white/10">
                        <i class="fa-solid fa-phone"></i>
                      </div>
                      <p>+52 (55) BREW-NOW</p>
                    </div>
                    <div class="flex items-center gap-4 text-gray-300">
                      <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-orange border border-white/10">
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                      <p>hola@brewandbloom.mx</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
              <div class="lg:w-1/2 bg-gray-800/50 p-12 lg:p-20">
                <FadeIn delay={200}>
                  <form class="space-y-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label class="block text-gray-400 text-sm font-bold mb-2 ml-1">Nombre</label>
                        <input type="text" placeholder="Juan Pérez" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label class="block text-gray-400 text-sm font-bold mb-2 ml-1">Correo Electrónico</label>
                        <input type="email" placeholder="juan@ejemplo.com" class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange focus:outline-none transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label class="block text-gray-400 text-sm font-bold mb-2 ml-1">Mensaje</label>
                      <textarea rows="4" placeholder="Cuéntanos qué tienes en mente..." class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-orange focus:outline-none transition-colors"></textarea>
                    </div>
                    <button class="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1">
                      Enviar Mensaje
                    </button>
                  </form>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer class="py-16 text-center border-t border-gray-100 bg-white relative z-10">
          <div class="mb-8 flex justify-center gap-6">
            <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all duration-300"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all duration-300"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all duration-300"><i class="fa-brands fa-facebook-f"></i></a>
          </div>
          <p class="text-gray-400 text-sm font-medium tracking-wide">&copy; 2026 Brew & Bloom. Elaborado con precisión y pasión.</p>
        </footer>
      </div>
    </div>
  )
}

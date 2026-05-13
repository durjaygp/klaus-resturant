import { createFileRoute } from '@tanstack/solid-router'
import { For, createSignal, onMount, onCleanup } from 'solid-js'

export const Route = createFileRoute('/reviews')({
  component: ReviewsPage,
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

function ReviewsPage() {
  const reviews = [
    { name: 'Sarah Jenkins', role: 'Entusiasta del Café', text: 'El Latte de Vainilla Artesanal te cambia la vida. Realmente se nota la calidad de los granos de Etiopía. La atmósfera es tan increíble como las bebidas.', img: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 5, date: 'hace 2 días' },
    { name: 'Michael Doe', role: 'Coach de Salud', text: 'Finalmente un lugar que se toma en serio los jugos prensados en frío. La mezcla Vitality es mi ritual diario. Limpio, fresco y energizante.', img: 'https://randomuser.me/api/portraits/men/32.jpg', rating: 5, date: 'hace 1 semana' },
    { name: 'Emily Watson', role: 'Mixóloga', text: 'El Midnight Berry Mocktail es tan sofisticado. Las notas botánicas están perfectamente equilibradas. Este lugar es una clase maestra en perfiles de sabor.', img: 'https://randomuser.me/api/portraits/women/68.jpg', rating: 5, date: 'hace 3 días' },
    { name: 'David Clark', role: 'Sommelier de Té', text: 'Es raro encontrar un matcha de grado ceremonial tan bueno. La textura es increíblemente suave y vibrante. Una experiencia auténtica.', img: 'https://randomuser.me/api/portraits/men/85.jpg', rating: 5, date: 'hace 4 días' },
    { name: 'Jessica Lee', role: 'Nómada Digital', text: 'El mejor lugar para trabajar en la ciudad. Wifi de alta velocidad, un Latte Español increíble y los asientos más cómodos.', img: 'https://randomuser.me/api/portraits/women/33.jpg', rating: 5, date: 'hace 1 mes' },
    { name: 'Ryan Garcia', role: 'Estudiante', text: 'Lujo accesible. La repostería siempre está fresca y el Nitro Cold Brew me ayuda con los exámenes. ¡Altamente recomendado!', img: 'https://randomuser.me/api/portraits/men/12.jpg', rating: 4, date: 'hace 2 semanas' },
  ]

  return (
    <main class="min-h-screen bg-gray-50 text-[#1A1A1A] font-sans pt-32 pb-24 overflow-hidden">
      <div class="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <FadeIn>
            <p class="text-brand-orange font-bold tracking-widest uppercase text-sm mb-4">Libro de Invitados</p>
            <h1 class="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-tight">Lo Que Dice <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Nuestra Comunidad</span></h1>
            <p class="text-gray-500 text-lg font-light leading-relaxed max-w-lg mb-10">
              Nos enorgullecemos de cada taza que servimos. Así es como nuestros invitados viven la pasión y precisión que ponemos en Brew & Bloom.
            </p>
            <div class="flex items-center gap-8">
               <div>
                  <h4 class="text-4xl font-black text-gray-900">4.9</h4>
                  <div class="flex text-yellow-400 text-xs gap-1 my-1">
                     <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                  </div>
                  <p class="text-gray-400 text-xs font-bold uppercase tracking-widest">Calificación Promedio</p>
               </div>
               <div class="w-px h-16 bg-gray-200"></div>
               <div>
                  <h4 class="text-4xl font-black text-gray-900">2.5k+</h4>
                  <p class="text-gray-400 text-xs font-bold uppercase tracking-widest mt-3">Invitados Felices</p>
               </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={200} class="relative">
             <div class="absolute -inset-10 bg-brand-orange/5 rounded-full blur-3xl"></div>
             <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80" alt="Cafe Vibe" class="relative rounded-[3rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700" />
          </FadeIn>
        </div>

        {/* Masonry-ish Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <For each={reviews}>
            {(review, idx) => (
              <FadeIn delay={idx() * 100}>
                <div class="bg-white p-10 rounded-[2.5rem] shadow-soft hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 group">
                  <div class="flex justify-between items-start mb-8">
                    <div class="flex text-brand-orange text-xs gap-1">
                       {[...Array(review.rating)].map(() => <i class="fa-solid fa-star"></i>)}
                    </div>
                    <span class="text-gray-300 text-xs font-bold uppercase tracking-widest">{review.date}</span>
                  </div>
                  <p class="text-gray-600 text-lg leading-relaxed italic mb-10 font-light group-hover:text-gray-900 transition-colors">
                    "{review.text}"
                  </p>
                  <div class="flex items-center gap-4">
                    <img src={review.img} alt={review.name} class="w-14 h-14 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 class="font-bold text-gray-900">{review.name}</h4>
                      <p class="text-sm text-gray-400">{review.role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </For>
        </div>

        {/* Submit Review CTA */}
        <FadeIn class="mt-24 text-center">
           <h2 class="text-3xl font-bold text-gray-900 mb-6">¿Tuviste una gran experiencia?</h2>
           <button class="bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-orange hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">Escribir una Reseña</button>
        </FadeIn>
      </div>
    </main>
  )
}

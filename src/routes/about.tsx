import { createFileRoute } from '@tanstack/solid-router'
import { createSignal, onMount, onCleanup } from 'solid-js'

export const Route = createFileRoute('/about')({
  component: AboutPage,
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

function AboutPage() {
  return (
    <main class="min-h-screen bg-white text-[#1A1A1A] font-sans pt-32 pb-24 overflow-hidden">
      <div class="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <FadeIn>
            <p class="text-brand-orange font-bold tracking-[0.3em] uppercase text-sm mb-6">Nuestra Historia</p>
            <h1 class="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
              Donde la <br/> <span class="italic font-serif">Pasión</span> <br/> florece.
            </h1>
            <p class="text-gray-500 text-xl font-light leading-relaxed max-w-lg">
              Desde 2026, Brew & Bloom ha sido el santuario para aquellos que buscan algo más que una simple bebida. Hemos redefinido la experiencia artesanal.
            </p>
          </FadeIn>
          
          <FadeIn delay={200} class="relative">
             <div class="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80" alt="Roastery" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                <div class="absolute bottom-10 left-10">
                   <p class="text-white font-bold text-2xl italic font-serif">Nuestra Tostaduría, CDMX</p>
                </div>
             </div>
             {/* Floating Decor */}
             <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </FadeIn>
        </div>

        {/* Philosophy Grid */}
        <div class="grid md:grid-cols-3 gap-12 mb-32">
           {[
              { title: 'Pureza', text: 'Seleccionamos solo los granos y hojas más finos de agricultores que respetan la tierra tanto como nosotros.', icon: 'fa-droplet' },
              { title: 'Artesanía', text: 'Cada extracción es una ciencia; cada vertido es una forma de arte. No tomamos atajos en la búsqueda de la perfección.', icon: 'fa-hand-sparkles' },
              { title: 'Comunidad', text: 'Más que una cafetería, somos un espacio para la conexión, la creatividad y el florecimiento de nuevas ideas.', icon: 'fa-people-group' }
           ].map((item, i) => (
              <FadeIn delay={i * 100} class="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                 <div class="w-16 h-16 rounded-2xl bg-white text-brand-orange flex items-center justify-center text-2xl shadow-sm mb-8 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <i class={`fa-solid ${item.icon}`}></i>
                 </div>
                 <h3 class="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                 <p class="text-gray-500 font-light leading-relaxed">{item.text}</p>
              </FadeIn>
           ))}
        </div>

        {/* Full Width Story */}
        <FadeIn class="relative rounded-[4rem] overflow-hidden h-[600px] flex items-center justify-center text-center p-12 lg:p-24">
           <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=80" alt="Coffee Farm" class="absolute inset-0 w-full h-full object-cover" />
           <div class="absolute inset-0 bg-gray-900/70 backdrop-blur-[2px]"></div>
           <div class="relative z-10 max-w-3xl">
              <h2 class="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Del Grano a la Copa, con Integridad.</h2>
              <p class="text-gray-200 text-lg md:text-xl font-light leading-relaxed mb-10">
                 Creemos que la transparencia es el ingrediente secreto. Por eso compartimos cada paso de nuestro proceso, desde las fincas de comercio justo en Chiapas hasta tu taza en la Ciudad de México.
              </p>
              <button class="bg-white text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-brand-orange hover:text-white transition-all shadow-2xl">Explora Nuestra Tostaduría</button>
           </div>
        </FadeIn>
      </div>
    </main>
  )
}

import { createFileRoute } from '@tanstack/solid-router'
import { For, createSignal, onMount, onCleanup } from 'solid-js'

export const Route = createFileRoute('/blog')({
  component: BlogPage,
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

function BlogPage() {
  const posts = [
    { title: 'El Arte del Pour-Over Perfecto', category: 'Guía de Preparación', date: '12 de mayo, 2026', author: 'Alex Chen', img: 'https://images.unsplash.com/photo-1544787210-22bb1e05936a?auto=format&fit=crop&w=800&q=80', excerpt: 'Descubre los secretos para lograr claridad y complejidad de sabor en tu ritual matutino.' },
    { title: 'Beneficios del Matcha Ceremonial', category: 'Bienestar', date: '10 de mayo, 2026', author: 'Emma Sato', img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80', excerpt: 'Por qué este superalimento ancestral es el impulso de energía que tu cerebro esperaba.' },
    { title: 'El Auge de los Elíxires Prensados en Frío', category: 'Nutrición', date: '08 de mayo, 2026', author: 'Dra. Sarah Smith', img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=80', excerpt: 'Cómo la tecnología de prensa hidráulica preserva 5 veces más nutrientes.' },
    { title: 'Abastecimiento Ético: Más Allá del Grano', category: 'Comunidad', date: '05 de mayo, 2026', author: 'James Wilson', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', excerpt: 'Conoce a los agricultores que cultivan nuestros granos y aprende sobre agricultura regenerativa.' },
    { title: 'Mocktails de Verano: Sofisticación sin Alcohol', category: 'Mixología', date: '01 de mayo, 2026', author: 'Maya Rivera', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80', excerpt: 'Una guía de infusiones botánicas y perfiles de sabor para tu próxima reunión.' },
    { title: 'Creando el Espacio de Trabajo Ideal en Casa', category: 'Estilo de Vida', date: '28 de abril, 2026', author: 'Markus Weber', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', excerpt: 'Cómo la iluminación y una gran taza de café pueden transformar tu productividad.' },
  ]

  return (
    <main class="min-h-screen bg-white text-[#1A1A1A] font-sans pt-32 pb-24 overflow-hidden">
      <div class="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Blog Header */}
        <FadeIn class="mb-20">
          <p class="text-brand-orange font-bold tracking-widest uppercase text-sm mb-4">Sabiduría en Infusión</p>
          <h1 class="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter">El <span class="italic font-serif">Diario</span></h1>
          <div class="flex flex-wrap gap-4">
             {['Todos', 'Guías', 'Bienestar', 'Nutrición', 'Mixología', 'Cultura'].map(cat => (
                <button class={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${cat === 'Todos' ? 'bg-gray-900 text-white border-gray-900 shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}>
                   {cat}
                </button>
             ))}
          </div>
        </FadeIn>

        {/* Featured Post */}
        <FadeIn class="mb-24">
           <div class="group relative rounded-[3rem] overflow-hidden shadow-2xl h-[600px] flex items-end">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80" alt="Featured Post" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
              <div class="relative p-12 lg:p-20 max-w-3xl">
                 <span class="inline-block px-4 py-1.5 rounded-full bg-brand-orange text-white text-xs font-bold uppercase tracking-widest mb-6">Artículo Destacado</span>
                 <h2 class="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight group-hover:text-brand-orange transition-colors cursor-pointer">Por Qué el Abastecimiento Sostenible es el Futuro del Café</h2>
                 <p class="text-gray-300 text-lg font-light mb-8 line-clamp-2">Cómo el comercio directo y las prácticas regenerativas aseguran un futuro para el café de alta calidad.</p>
                 <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                       <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-10 h-10 rounded-full object-cover border-2 border-white/20" alt="Author" />
                       <span class="text-white font-bold text-sm">James Wilson</span>
                    </div>
                    <span class="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span class="text-gray-400 text-sm">15 de mayo, 2026</span>
                 </div>
              </div>
           </div>
        </FadeIn>

        {/* Post Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <For each={posts}>
            {(post, idx) => (
              <FadeIn delay={idx() * 100}>
                <article class="group cursor-pointer">
                  <div class="aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 shadow-lg relative">
                    <img src={post.img} alt={post.title} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div class="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur shadow-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-900">
                       {post.category}
                    </div>
                  </div>
                  <div class="flex items-center gap-3 text-brand-orange text-xs font-bold uppercase tracking-widest mb-4">
                     <span>{post.date}</span>
                     <span class="w-1 h-1 bg-brand-orange rounded-full opacity-30"></span>
                     <span>5 min de lectura</span>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-brand-orange transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p class="text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div class="flex items-center justify-between pt-6 border-t border-gray-100">
                     <span class="text-sm font-bold text-gray-400">Por {post.author}</span>
                     <button class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
                        <i class="fa-solid fa-arrow-right"></i>
                     </button>
                  </div>
                </article>
              </FadeIn>
            )}
          </For>
        </div>

        {/* Newsletter Section */}
        <FadeIn class="mt-32 p-16 rounded-[4rem] bg-gray-50 border border-gray-100 flex flex-col lg:flex-row items-center gap-12">
           <div class="flex-1 text-center lg:text-left">
              <h2 class="text-4xl font-black text-gray-900 mb-4 tracking-tight">Mantente al Día</h2>
              <p class="text-gray-500 text-lg font-light">Únete a nuestra comunidad y recibe consejos semanales de preparación, guías de bienestar e invitaciones exclusivas.</p>
           </div>
           <div class="flex-1 w-full max-w-md">
              <form class="relative group">
                 <input type="email" placeholder="tu@email.com" class="w-full bg-white border border-gray-200 rounded-full px-8 py-5 focus:outline-none focus:border-brand-orange shadow-soft transition-all" />
                 <button class="absolute right-2 top-2 bottom-2 bg-gray-900 text-white px-8 rounded-full font-bold hover:bg-brand-orange transition-all shadow-xl">Unirme</button>
              </form>
           </div>
        </FadeIn>
      </div>
    </main>
  )
}

import { createFileRoute } from '@tanstack/solid-router'
import { createSignal, onMount, onCleanup } from 'solid-js'

export const Route = createFileRoute('/login')({
  component: LoginPage,
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

function LoginPage() {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    console.log('Login attempt:', { email: email(), password: password() })
    // Add login logic here
  }

  return (
    <main class="min-h-screen bg-white flex items-center justify-center pt-24 pb-12 px-6">
      <div class="fixed inset-0 z-0 pointer-events-none">
        <div class="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-brand-orange/5 blur-[120px] animate-pulse" />
        <div class="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-orange-400/5 blur-[120px] animate-pulse" style="animation-delay: 2s;" />
      </div>

      <div class="max-w-[1200px] w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: Image & Branding */}
        <FadeIn class="hidden lg:block">
           <div class="relative rounded-[3rem] overflow-hidden shadow-2xl h-[700px] group">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80" alt="Login Vibe" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
              <div class="absolute bottom-12 left-12 right-12">
                 <h2 class="text-4xl font-black text-white mb-4 tracking-tight italic font-serif">Bienvenido de Nuevo</h2>
                 <p class="text-gray-300 text-lg font-light leading-relaxed">Tu dosis diaria de perfección te espera. Inicia sesión para acceder a tus pedidos y recompensas exclusivas.</p>
              </div>
           </div>
        </FadeIn>

        {/* Right: Login Form */}
        <div class="max-w-md w-full mx-auto lg:mx-0">
          <FadeIn>
            <div class="mb-12">
              <h1 class="text-4xl font-black text-gray-900 mb-4 tracking-tight">Iniciar Sesión</h1>
              <p class="text-gray-500 font-light">Ingresa tus credenciales para continuar tu viaje sensorial.</p>
            </div>

            <form onSubmit={handleSubmit} class="space-y-6">
              <div>
                <label class="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Correo Electrónico</label>
                <div class="relative group">
                   <i class="fa-solid fa-envelope absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-orange transition-colors"></i>
                   <input 
                    type="email" 
                    value={email()}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                    placeholder="tu@email.com" 
                    class="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-gray-900 focus:outline-none focus:border-brand-orange focus:bg-white transition-all shadow-sm" 
                    required
                   />
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-3 ml-1">
                   <label class="text-gray-400 text-xs font-bold uppercase tracking-widest">Contraseña</label>
                   <a href="#" class="text-xs font-bold text-brand-orange hover:underline">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="relative group">
                   <i class="fa-solid fa-lock absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-orange transition-colors"></i>
                   <input 
                    type="password" 
                    value={password()}
                    onInput={(e) => setPassword(e.currentTarget.value)}
                    placeholder="••••••••" 
                    class="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-gray-900 focus:outline-none focus:border-brand-orange focus:bg-white transition-all shadow-sm" 
                    required
                   />
                </div>
              </div>

              <div class="flex items-center gap-3 ml-1">
                 <input type="checkbox" id="remember" class="w-4 h-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange" />
                 <label for="remember" class="text-sm text-gray-500">Recordarme</label>
              </div>

              <button type="submit" class="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-brand-orange hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group">
                Entrar
                <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </form>

            <div class="mt-12 text-center relative">
               <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-100"></div>
               </div>
               <span class="relative px-4 bg-white text-gray-400 text-sm">O continúa con</span>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-8">
               <button class="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google" />
                  <span class="text-sm font-bold text-gray-600">Google</span>
               </button>
               <button class="flex items-center justify-center gap-3 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
                  <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" class="w-5 h-5" alt="Facebook" />
                  <span class="text-sm font-bold text-gray-600">Facebook</span>
               </button>
            </div>

            <p class="mt-12 text-center text-gray-500 text-sm">
              ¿No tienes una cuenta? <a href="/register" class="text-brand-orange font-bold hover:underline">Regístrate gratis</a>
            </p>
          </FadeIn>
        </div>
      </div>
    </main>
  )
}

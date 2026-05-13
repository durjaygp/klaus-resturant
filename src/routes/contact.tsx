import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <main class="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-orange/10 blur-[120px] animate-pulse" />
      </div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <div class="text-center mb-16">
          <p class="text-brand-orange font-semibold text-sm tracking-widest uppercase mb-3">Ponte en Contacto</p>
          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">Contáctanos</h1>
          <p class="text-gray-500 mt-6 max-w-2xl mx-auto text-lg font-light">
            Ya sea que tengas una pregunta sobre nuestro menú, reservaciones o servicios de catering, nuestro equipo está listo para ayudarte.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div class="space-y-8">
            <div class="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 shadow-soft hover:shadow-xl transition-shadow group flex items-start gap-6">
              <div class="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Nuestra Ubicación</h3>
                <p class="text-gray-500 leading-relaxed">Av. Artesanal 123, Distrito del Café<br/>Ciudad de México, CDMX 01000</p>
              </div>
            </div>

            <div class="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 shadow-soft hover:shadow-xl transition-shadow group flex items-start gap-6">
              <div class="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                <i class="fa-solid fa-phone"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Número de Teléfono</h3>
                <p class="text-gray-500 leading-relaxed">+52 (55) 1234-5678<br/>+52 (55) 8765-4321</p>
              </div>
            </div>

            <div class="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 shadow-soft hover:shadow-xl transition-shadow group flex items-start gap-6">
              <div class="w-14 h-14 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                <i class="fa-solid fa-envelope"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Correo Electrónico</h3>
                <p class="text-gray-500 leading-relaxed">reservaciones@brewandbloom.mx<br/>soporte@brewandbloom.mx</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div class="bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-gray-100 shadow-2xl relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-orange/20 to-transparent rounded-bl-full pointer-events-none"></div>
            
            <h3 class="text-2xl font-bold text-gray-900 mb-8 relative z-10">Envíanos un Mensaje</h3>
            <form class="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('¡Mensaje enviado con éxito!'); }}>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                  <input type="text" class="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" placeholder="Juan" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                  <input type="text" class="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" placeholder="Pérez" required />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                <input type="email" class="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all" placeholder="juan@ejemplo.com" required />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                <textarea rows="4" class="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange transition-all resize-none" placeholder="¿Cómo podemos ayudarte?" required></textarea>
              </div>

              <button type="submit" class="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg flex items-center justify-center gap-2">
                Enviar Mensaje <i class="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

import { useStore } from '@tanstack/solid-store'
import { Link } from '@tanstack/solid-router'
import { createSignal, onMount, onCleanup, Show } from 'solid-js'
import { cartStore, toggleCart, updateQuantity, removeFromCart } from '../lib/cart-store'

export default function Header() {
  const cartState = useStore(cartStore)
  const [isScrolled, setIsScrolled] = createSignal(false)

  onMount(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    onCleanup(() => window.removeEventListener('scroll', handleScroll))
  })

  const cartTotal = () => cartState().items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const cartItemsCount = () => cartState().items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <header 
        class={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled() 
            ? 'bg-white/80 backdrop-blur-xl border-gray-200/50 py-4 shadow-sm' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link to="/" class="flex items-center gap-3 text-2xl font-bold tracking-tight">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-orange to-orange-600 text-white flex items-center justify-center shadow-orange transform hover:rotate-12 transition-transform duration-300">
              <i class="fa-solid fa-utensils text-sm"></i>
            </div>
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Foodie</span>
          </Link>

          <nav class="hidden md:flex items-center gap-10 text-sm font-medium text-gray-500">
            {[
              { label: 'Inicio', path: '/' },
              { label: 'Menú', path: '/menu' },
              { label: 'Recetas', path: '/recipes' },
              { label: 'Reseñas', path: '/reviews' },
              { label: 'Blog', path: '/blog' },
              { label: 'Contacto', path: '/contact' }
            ].map((item) => (
              <Link to={item.path} class="hover:text-brand-orange transition-colors relative group">
                {item.label}
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full rounded-full"></span>
              </Link>
            ))}
          </nav>

          <div class="flex items-center gap-6">
            <button class="text-gray-400 hover:text-brand-orange transition-colors hover:scale-110 active:scale-95"><i class="fa-solid fa-magnifying-glass"></i></button>
            
            <button onClick={toggleCart} class="group text-gray-400 hover:text-brand-orange transition-colors relative hover:scale-110 active:scale-95">
              <i class="fa-solid fa-cart-shopping text-lg"></i>
              <Show when={cartItemsCount() > 0}>
                <span class="absolute -top-2 -right-2 bg-gradient-to-r from-brand-orange to-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-orange animate-bounce">
                  {cartItemsCount()}
                </span>
              </Show>
            </button>
            
            <Link to="/login" class="bg-gray-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm hidden sm:block shadow-md">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <div 
        onClick={toggleCart} 
        class={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[90] transition-all duration-500 ${cartState().isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      ></div>
      
      <div class={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${cartState().isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div class="px-8 py-6 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-10">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">Tu Carrito</h2>
          <button onClick={toggleCart} class="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-900">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-8 space-y-6">
          <Show when={cartState().items.length > 0} fallback={<p class="text-gray-500 text-center mt-10">Tu carrito está vacío.</p>}>
            {cartState().items.map((item) => (
              <div class="flex gap-6 items-center p-4 bg-gray-50 rounded-3xl border border-gray-100 relative group">
                <img src={`${item.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} alt={item.name} class="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                <div class="flex-1">
                  <h4 class="font-bold text-gray-900 mb-1">{item.name}</h4>
                  <p class="text-brand-orange font-bold mb-3">${(item.price * item.quantity).toFixed(2)} MXN</p>
                  <div class="flex items-center gap-4 bg-white border border-gray-200 w-fit px-2 py-1.5 rounded-xl shadow-sm">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} class="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">-</button>
                    <span class="text-sm font-semibold w-4 text-center text-gray-900">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} class="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} class="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all flex items-center justify-center shadow-sm">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </Show>
        </div>

        <div class="p-8 bg-gray-50 border-t border-gray-100">
          <div class="flex justify-between items-center mb-4 text-gray-500 font-medium">
            <span>Subtotal</span>
            <span class="text-gray-900">${cartTotal().toFixed(2)} MXN</span>
          </div>
          <div class="flex justify-between items-center mb-6 text-gray-500 font-medium">
            <span>Envío</span>
            <span class="text-gray-900">{cartTotal() > 0 ? '$100.00 MXN' : '$0.00 MXN'}</span>
          </div>
          <div class="flex justify-between items-center mb-8">
            <span class="font-bold text-xl text-gray-900">Total</span>
            <span class="font-bold text-3xl text-brand-orange">${cartTotal() > 0 ? (cartTotal() + 100).toFixed(2) : '0.00'} MXN</span>
          </div>
          <Link to="/cart" onClick={() => cartTotal() === 0 ? null : toggleCart()} class={`block text-center w-full py-5 rounded-2xl font-bold transition-all duration-300 text-lg ${cartTotal() > 0 ? 'bg-gray-900 text-white hover:bg-black hover:shadow-2xl hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
            Proceder al Pago
          </Link>
        </div>
      </div>
    </>
  )
}

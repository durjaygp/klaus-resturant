import { createFileRoute } from '@tanstack/solid-router'
import { useStore } from '@tanstack/solid-store'
import { Show } from 'solid-js'
import { cartStore, updateQuantity, removeFromCart, clearCart } from '../lib/cart-store'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const cartState = useStore(cartStore)

  const cartTotal = () => cartState().items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <main class="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] font-sans pt-32 pb-24 px-6 lg:px-12">
      <div class="max-w-[1200px] mx-auto">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight text-gray-900">Tu Pedido</h1>
        
        <Show 
          when={cartState().items.length > 0} 
          fallback={
            <div class="text-center py-24 bg-white/60 backdrop-blur-xl border border-gray-100 rounded-[3rem] shadow-sm">
              <i class="fa-solid fa-basket-shopping text-6xl text-gray-200 mb-6 block"></i>
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
              <p class="text-gray-500 mb-8">Parece que aún no has añadido ninguna de nuestras delicias artesanales.</p>
              <a href="/#menu" class="px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-black transition-all hover:shadow-xl hover:-translate-y-1 inline-block">
                Explorar Menú
              </a>
            </div>
          }
        >
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items List */}
            <div class="lg:col-span-2 space-y-6">
              {cartState().items.map((item) => (
                <div class="flex flex-col sm:flex-row gap-6 p-6 bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <img src={`${item.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`} alt={item.name} class="w-full sm:w-32 h-32 object-cover rounded-2xl shadow-sm" />
                  
                  <div class="flex-1 flex flex-col justify-between">
                    <div class="flex justify-between items-start mb-4">
                      <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                        <p class="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <p class="text-xl font-bold text-brand-orange">${(item.price * item.quantity).toFixed(2)} MXN</p>
                    </div>
                    
                    <div class="flex items-center justify-between mt-auto">
                      <div class="flex items-center gap-4 bg-gray-50 border border-gray-200 w-fit px-2 py-1.5 rounded-xl shadow-inner">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} class="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm transition-colors">-</button>
                        <span class="font-bold w-6 text-center text-gray-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} class="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm transition-colors">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} class="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-semibold">
                        <i class="fa-solid fa-trash-can"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div class="lg:col-span-1">
              <div class="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-32">
                <h3 class="text-2xl font-bold text-gray-900 mb-8">Resumen del Pedido</h3>
                
                <div class="space-y-4 text-gray-500 font-medium mb-8">
                  <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span class="text-gray-900">${cartTotal().toFixed(2)} MXN</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Costo de Envío</span>
                    <span class="text-gray-900">$100.00 MXN</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Impuestos (IVA)</span>
                    <span class="text-gray-900">${(cartTotal() * 0.16).toFixed(2)} MXN</span>
                  </div>
                </div>
                
                <div class="border-t border-gray-200 pt-6 mb-8 flex justify-between items-end">
                  <span class="text-xl font-bold text-gray-900">Total</span>
                  <span class="text-4xl font-extrabold text-brand-orange">
                    ${(cartTotal() + 100 + (cartTotal() * 0.16)).toFixed(2)} MXN
                  </span>
                </div>
                
                <button onClick={() => { alert('¡Pedido realizado con éxito! 🚀'); clearCart() }} class="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg flex justify-center items-center gap-3">
                  Confirmar Pedido <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
            
          </div>
        </Show>
      </div>
    </main>
  )
}

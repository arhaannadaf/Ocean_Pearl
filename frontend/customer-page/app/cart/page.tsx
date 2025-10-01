"use client"

import  Header  from "@/components/header"
import  Footer  from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { state, removeItem, updateQuantity } = useCart()
  


  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity)
    }
  }

  if (state.items.length === 0) {
    return (
       <div>
       
        <Header />
      
        <main className="pt-20 relative py-20  bg-[url('/static/assets/oops.jpg')] bg-cover bg-center bg-no-repeat">
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">CART</h1>
              <p className="text-xl text-gray-600 mb-8">Your cart is currently empty.</p>
              <Link href="/menu">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">Return to Menu</Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    )
  }

  return (
     <div className="bg-gray-500">
      <Header />

      <main className="pt-20">
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-12">CART</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-2 gap-4 p-6 bg-gray-200 font-semibold text-gray-900">
                    <div>PRODUCT</div>
                    <div className="text-right">TOTAL</div>
                  </div>

                  {/* Cart Items */}
                  <div className="divide-y divide-gray-200">
                    {state.items.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="grid grid-cols-2 gap-4 items-start">
                          {/* Product Info */}
                          <div className="flex gap-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>

                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>

                              <div className="flex items-center gap-2 mb-2">
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ₹{item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                                <span className="font-semibold">₹{item.price.toFixed(2)}</span>
                                {item.originalPrice && (
                                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                                    SAVE ₹{(item.originalPrice - item.price).toFixed(2)}
                                  </span>
                                )}
                              </div>

                              <p className="text-sm text-gray-600 mb-4">{item.shortDescription}</p>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2 mb-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="w-8 h-8 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>

                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                                  className="w-16 text-center"
                                  min="1"
                                />

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-8 h-8 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>

                              {/* Remove Item */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                              >
                                <X className="w-4 h-4" />
                                Remove item
                              </button>
                            </div>
                          </div>

                          {/* Total */}
                          <div className="text-right">
                            <span className="text-xl font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cart Totals */}
              <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">CART TOTALS</h2>

                  {/* Add Coupon */}
                  <div className="mb-6">
                    <button className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900">
                      <span>Add a coupon</span>
                      <span>▼</span>
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold">₹{state.total.toFixed(2)}</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-4 mb-6">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">₹{state.total.toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold">
                    PROCEED TO CHECKOUT
                  </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
   </div>
  )
}

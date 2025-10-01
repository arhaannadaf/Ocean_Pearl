"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"

import  Footer  from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
  const { state } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [showNote, setShowNote] = useState(false)
  const [showCoupon, setShowCoupon] = useState(false)

  const formatPrice = (price: number) => `₹${price.toFixed(2)}`

  /* this is order section api details*/
async function placeOrder() {
  if (state.items.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    const orderData = {
      items: state.items.map(item => ({
        dishId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: state.total,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (data.success) {
      alert("Order placed! Your Order ID: " + data.orderId);
      // Optional: clear cart here
      // clearCart();
    } else {
      alert("Failed to place order: " + data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
}

  return (
  
    <div className="min-h-screen bg-gray-50">
     

      <main className="container mx-auto px-4 py-8">
  
 
        <h1 className="text-4xl font-bold text-gray-800 mb-8">CHECKOUT</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">CONTACT INFORMATION</h2>
              <p className="text-gray-600 mb-4">
                We'll use this email to send you details and updates about your order.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" className="mt-1" />
                </div>
                <p className="text-sm text-gray-500">You are currently checking out as a guest.</p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">BILLING ADDRESS</h2>
              <p className="text-gray-600 mb-6">Enter the billing address that matches your payment method.</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="country">Country/Region</Label>
                  <div className="relative">
                    <select
                      id="country"
                      className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white"
                    >
                 
                      <option>India</option>
                     
                      
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" className="mt-1" />
                </div>

                <button className="text-sm text-gray-600 hover:text-gray-800">+ Add apartment, suite, etc.</button>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Postal code</Label>
                    <Input id="postalCode" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" className="mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" className="mt-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">PAYMENT OPTIONS</h2>

              <div className="space-y-4">
                {/* UPI */}
                <div className="border rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium">UPI Payment</span>
                  </label>
                  {paymentMethod === "upi" && (
                    <div className="mt-3 pl-7">
                      <p className="text-sm text-gray-600 mb-3">Pay using your UPI ID or scan QR code.</p>
                      <Input placeholder="Enter UPI ID" className="max-w-sm" />
                    </div>
                  )}
                </div>

                {/* Credit Card */}
                <div className="border rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium">Credit Card</span>
                  </label>
                  {paymentMethod === "credit-card" && (
                    <div className="mt-3 pl-7 space-y-3">
                      <Input placeholder="Card Number" />
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="MM/YY" />
                        <Input placeholder="CVV" />
                      </div>
                      <Input placeholder="Cardholder Name" />
                    </div>
                  )}
                </div>

                {/* Debit Card */}
                <div className="border rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="debit-card"
                      checked={paymentMethod === "debit-card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium">Debit Card</span>
                  </label>
                  {paymentMethod === "debit-card" && (
                    <div className="mt-3 pl-7 space-y-3">
                      <Input placeholder="Card Number" />
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="MM/YY" />
                        <Input placeholder="CVV" />
                      </div>
                      <Input placeholder="Cardholder Name" />
                    </div>
                  )}
                </div>

                {/* Direct Bank Transfer */}
                <div className="border rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="bank-transfer"
                      checked={paymentMethod === "bank-transfer"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium">Direct Bank Transfer</span>
                  </label>
                  {paymentMethod === "bank-transfer" && (
                    <div className="mt-3 pl-7">
                      <p className="text-sm text-gray-600">
                        Make your payment directly into our bank account. Please use your Order ID as the payment
                        reference. Your order will not be shipped until the funds have cleared in our account.
                      </p>
                    </div>
                  )}
                </div>

                {/* Cash on Delivery */}
                <div className="border rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash-on-delivery"
                      checked={paymentMethod === "cash-on-delivery"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                  {paymentMethod === "cash-on-delivery" && (
                    <div className="mt-3 pl-7">
                      <p className="text-sm text-gray-600">
                        Pay with cash when your order is delivered to your doorstep.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Note */}
              <div className="mt-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showNote}
                    onChange={(e) => setShowNote(e.target.checked)}
                    className="w-4 h-4 text-orange-500"
                  />
                  <span className="text-sm">Add a note to your order</span>
                </label>
                {showNote && (
                  <div className="mt-3">
                    <Textarea placeholder="Special instructions for your order..." className="w-full" />
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Place Order */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-6">
                By proceeding with your purchase you agree to our Terms and Conditions and Privacy Policy
              </p>

              <div className="flex items-center justify-between">
                <Link href="/cart" className="flex items-center text-gray-600 hover:text-gray-800">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Return to Cart
                </Link>

                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg" 
  onClick={placeOrder} // <-- add this
>PLACE ORDER</Button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <div className="flex items-center space-x-2 text-sm">
                        {item.originalPrice && (
                          <span className="text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                        )}
                        <span className="text-gray-800">{formatPrice(item.price)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.shortDescription}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="border-t pt-4 mb-4">
                <button
                  onClick={() => setShowCoupon(!showCoupon)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-sm">Add a coupon</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showCoupon ? "rotate-180" : ""}`} />
                </button>
                {showCoupon && (
                  <div className="mt-3 flex space-x-2">
                    <Input placeholder="Coupon code" className="flex-1" />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(state.total)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>{formatPrice(state.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </main>

      <Footer />
    </div>
  )
}

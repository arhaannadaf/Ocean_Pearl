"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import ReservationModal from "./reservation-modal"
import { CartDropdown } from "./cart-dropshowdown"
import { useCart } from "@/context/cart-context"
import { useRef } from "react"
import Image from "next/image"

export default function Header() {
  const [showPagesDropdown, setShowPagesDropdown] = useState(false)
  const timeoutRef = useRef<number | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [showCartDropdown, setShowCartDropdown] = useState(false)

  const { state } = useCart()

  return (
    <>
      <header className="absolute -top-8 -left-20 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative w-60 h-28 lg:w-70 lg:h-35 right-5">
              <Image
    src="/static/assets/Ocean_Pearl_Bg.png"
    alt="Ocean Pearl Logo"
    fill
        className="object-contain"
    priority
  />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-orange-500 transition-colors">
                Home
              </Link>

             
       <div
      className="relative"
      onMouseEnter={() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setShowPagesDropdown(true);
      }}
      onMouseLeave={() => {
        timeoutRef.current = window.setTimeout(() => setShowPagesDropdown(false), 150);
      }}
    >
                <button className="text-white hover:text-orange-500 transition-colors flex items-center gap-1">
                  Pages
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showPagesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-orange-500 rounded-lg shadow-lg py-2 z-50">
                    <Link href="/about" className="block px-4 py-2 text-white hover:bg-orange-600 transition-colors">
                      About Us
                    </Link>
                    <Link href="/about-me" className="block px-4 py-2 text-white hover:bg-orange-600 transition-colors">
                      About Me
                    </Link>
                    <Link href="/faq" className="block px-4 py-2 text-white hover:bg-orange-600 transition-colors">
                      FAQ
                    </Link>
                    <Link
                      href="/testimonials"
                      className="block px-4 py-2 text-white hover:bg-orange-600 transition-colors"
                    >
                      Testimonials
                    </Link>
                  </div>
                )}
              </div>
                <Link
                  href="/menu"
                  className="text-white hover:text-orange-500 transition-colors flex items-center gap-1"
                >
                  Menu
                 
                </Link>
<Link href="/cart" className="text-white hover:text-orange-500 transition-colors">
                Cart  
              </Link>
              
              <Link href="/contact" className="text-white hover:text-orange-500 transition-colors">
                Contact
              </Link>
              
            </nav>

            {/* Right side */}
            <div className="  relative flex items-center gap-4 left-5 ">
              <Button
                onClick={() => setShowReservationModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
              >
                RESERVATION
              </Button>
               <div
                className="relative"
               
              >
                <button
    className="relative"
    onClick={() => setShowCartDropdown(prev => !prev)}
  >
    <ShoppingCart className="w-6 h-6 text-white hover:text-orange-500 transition-colors" />
    {state.itemCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {state.itemCount}
      </span>
    )}
  </button>

  <CartDropdown
    isOpen={showCartDropdown}
    onClose={() => setShowCartDropdown(false)} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <ReservationModal isOpen={showReservationModal} onCloseAction={() => setShowReservationModal(false)} />
    </>
  )
}

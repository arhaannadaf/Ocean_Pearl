"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronDown,Menu} from "lucide-react"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { state } = useCart()

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        {mobileMenuOpen && (
  <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
    <div className="flex flex-col items-center space-y-4 py-6">
      <Link href="/" className="text-black hover:text-orange-500">Home</Link>
      <Link href="/about" className="text-black hover:text-orange-500">About Us</Link>
      <Link href="/menu" className="text-black hover:text-orange-500">Menu</Link>
      <Link href="/cart" className="text-black hover:text-orange-500">Cart</Link>
      <Link href="/contact" className="text-black hover:text-orange-500">Contact</Link>
    </div>
  </div>
)}
       <div className="w-full max-w-[1500px] mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
 {/* Logo */}
            <Link href="/" className="relative w-[150px] h-[60px] md:w-[200px] md:h-[50px] sm:w-[150px] sm:h-[40px] ">
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
              <Link href="/" className="text-black hover:text-orange-500 transition-colors">
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
                <button className="text-black hover:text-orange-500 transition-colors flex items-center gap-1">
                  Pages
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showPagesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-orange-500 rounded-lg shadow-lg py-2 z-50">
                    <Link href="/about" className="block px-4 py-2 text-black hover:bg-orange-600 transition-colors">
                      About Us
                    </Link>
                    <Link href="/about-me" className="block px-4 py-2 text-black hover:bg-orange-600 transition-colors">
                      About Me
                    </Link>
                    <Link href="/faq" className="block px-4 py-2 text-black hover:bg-orange-600 transition-colors">
                      FAQ
                    </Link>
                    <Link
                      href="/testimonials"
                      className="block px-4 py-2 text-black hover:bg-orange-600 transition-colors"
                    >
                      Testimonials
                    </Link>
                  </div>
                )}
              </div>
                <Link
                  href="/menu"
                  className="text-black hover:text-orange-500 transition-colors flex items-center gap-1"
                >
                  Menu
                 
                </Link>
<Link href="/cart" className="text-black hover:text-orange-500 transition-colors">
                Cart  
              </Link>
              
              <Link href="/contact" className="text-black hover:text-orange-500 transition-colors">
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
    <ShoppingCart className="w-6 h-6 text-black hover:text-orange-500 transition-colors" />
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
                <button
    className="lg:hidden text-black"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  >
    <Menu className="w-7 h-7" />
  </button>
            </div>
          </div>
      </header>

      <ReservationModal isOpen={showReservationModal} onCloseAction={() => setShowReservationModal(false)} />
    </>
  )
}

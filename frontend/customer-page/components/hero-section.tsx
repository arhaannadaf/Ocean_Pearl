"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ReservationModal from "./reservation-modal"
export default function HeroSection() {
   const [showReservationModal, setShowReservationModal] = useState(false)
  return (
    <>
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/static/assets/Rest_cover.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-orange-500 font-medium mb-4 tracking-wider">HELLO, NEW FRIEND!</p>
          <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
            WELCOME TO
            <br />
            OCEAN PEARL
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
            onClick={() => setShowReservationModal(true)}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 bg-transparent"
            >
              BOOK A TABLE
              
            </Button>
            <Button onClick={() => window.location.href = '/menu'}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">OPEN MENU</Button>
          </div>
        </div>
      </div>

    </section>
    <ReservationModal isOpen={showReservationModal} onCloseAction={() => setShowReservationModal(false)} />
    </>
  )
}

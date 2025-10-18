"use client"
import { Button } from "@/components/ui/button"
import React from "react"
import ReservationModal from "./reservation-modal"

export default function WorkingHoursSection() {
  const [showReservationModal , setShowReservationModal] = React.useState(false)
  return (
    <>
    <section
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="absolute top-3 left-0 w-8 h-px bg-orange-500"></div>
                <span className="absolute top-0 left-10 text-orange-500 font-medium text-lg tracking-wider">RESERVATION</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">WORKING HOURS</h2>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed">
              The Ocean Pearl is open 7 days a week, with varying hours to accommodate your dining needs. Whether you're looking for a leisurely brunch, a business lunch, or a romantic dinner, we have you covered.
            </p>

            <div className="flex gap-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3" onClick={() => setShowReservationModal(true)}>BOOK A TABLE</Button>
              <Button
                onClick = {() => window.location.href='/contact'}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3 bg-transparent"
              >
                CONTACT US
              </Button>
            </div>
          </div>

          <div className="relative py-20 w-full max-w-[600px] mx-auto bg-[url('/static/assets/rainy_image.jpeg')] bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-300 mb-2">MONDAY TO FRIDAY</h3>
                <div className="text-3xl font-bold text-gray-300">09 : 00</div>
                <div className="text-3xl font-bold text-gray-300">22 : 00</div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">SATURDAY TO SUNDAY</h3>
                <div className="text-3xl font-bold text-gray-900">11 : 00</div>
                <div className="text-3xl font-bold text-gray-900">19 : 00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ReservationModal isOpen={showReservationModal} onCloseAction={() => setShowReservationModal(false)} />
    </>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const galleryImages = [
    "/static/assets/Seekh_Kabab.jpg",
    "/static/assets/Samosa.jpg",
    "/static/assets/Malai_Kofta.jpg",
    "/static/assets/IceCream_Sundae.jpg",
  ]

  return (
    <footer className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          {/* About us */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">About us</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
             At Ocean Pearl Restaurant, we bring the flavors of the ocean right to your plate. Founded with a passion for fresh seafood and authentic culinary experiences,
              our mission is to delight every guest with high-quality ingredients, expertly crafted dishes, and warm hospitality.
                                                    
            </p>
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
            >
              READ MORE
            </Button>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact info</h3>
            <div className="space-y-4">
              <div>
                <span className="font-bold text-gray-900">CALL :</span>
                <span className="text-gray-600 ml-2">+91 8080376210</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">WRITE :</span>
                <span className="text-gray-600 ml-2">oceanpearlgoa@gmail.com</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">FIND US :</span>
                <span className="text-gray-600 ml-2">Goa</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-6 bg-transparent"
              onClick={() => window.location.href = '/contact'}
            >
              READ MORE
            </Button>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h3>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {galleryImages.map((image, index) => (
                <Image
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                SEE MORE
              </Button>
              
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 lg:mb-0">
              {/* Logo */}
              <div className="text-gray-900">
                <h1 className="text-2xl font-serif">Ocean Pearl</h1>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-6 h-px bg-orange-500"></div>
                  <span className="text-orange-500 font-medium">Taste the Delicacy</span>
                  <div className="w-6 h-px bg-orange-500"></div>
                </div>
              </div>

              {/* Social icons */}
              <div className="flex gap-3 ml-8">
                <Facebook className="w-5 h-5 text-gray-600 hover:text-orange-500 cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-600 hover:text-orange-500 cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-600 hover:text-orange-500 cursor-pointer" />
                <Youtube className="w-5 h-5 text-gray-600 hover:text-orange-500 cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <p className="text-gray-600 text-sm">© Ocean Pearl 2024 . All rights reserved.</p>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white text-sm bg-transparent"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                BACK TO TOP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

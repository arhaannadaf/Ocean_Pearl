"use client"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { dishes } from "@/dishes_data/dishes"
interface MenuItem {
  id: number
  slug: string
  name: string
  price: number
  description: string
  image: string
}

interface MenuSectionProps {
  sectionNumber?: string
  title: string
  subtitle?: string
  items: MenuItem[]
}


export default function MenuSection({ sectionNumber, title, subtitle, items }: MenuSectionProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

   

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id.toString(), // convert number → string
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      shortDescription: item.description,
      slug: item.slug,
    })
    alert(`Added ${quantity} ${item.name}(s) to cart!`)
 
  }

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        {sectionNumber && (
          <div className="mb-2">
            <span className="text-orange-500 text-sm font-semibold tracking-wider uppercase">{sectionNumber} Menu</span>
          </div>
        )}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
        {subtitle && (
          <div className="text-gray-600 max-w-2xl mx-auto">
            {subtitle.split(".").map((line, index) => (
              <p key={index} className="mb-1">
                {line.trim()}
                {line.trim() && "."}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {items.map((item) => (
          <div 
          id={item.slug} 
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex">
              <div className="w-32 h-32 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <Link key={item.id} href={`/dishes/${item.slug}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <span className="text-lg font-bold text-gray-800">₹ {item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                  </Link>
                </div>
                
                <div className="flex justify-end">
                  <button onClick={(e) => 
                    {
                      e.stopPropagation()
                    handleAddToCart(item)}
                  }className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        ))}
      </div>
    </section>
  )
}

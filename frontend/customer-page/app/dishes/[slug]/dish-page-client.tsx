"use client"
import { notFound } from "next/navigation"
import Image from "next/image"
import  Header from "@/components/header"
import  Footer  from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart } from "lucide-react"
import { dishes } from "@/dishes_data/dishes"
import { useState } from "react"
import { useCart } from "@/context/cart-context"

interface DishPageProps {
  params: {
    slug: string
  }
}

export default function DishPage({ params }: DishPageProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const dish = dishes.find((d) => d.slug === params.slug)

  if (!dish) {
    notFound()
  }
const handleAddToCart = () => {
    addItem({
      id: dish.id.toString(),
      name: dish.name,
      price: dish.price,
      originalPrice: dish.originalPrice,
      image: dish.image || "/placeholder.svg",
      shortDescription: dish.shortDescription,
      slug: dish.slug,
      quantity: quantity,
    })

    // Optional: Show success message or redirect
    alert(`Added ${quantity} ${dish.name}(s) to cart!`)
  }

  return (
    <div className="bg-slate-300">
      <Header/>

      <div className="pt-20">
        {/* Dish Detail Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="relative">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {dish.onSale && (
                    <Badge className="absolute top-4 left-4 z-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-1">
                      SALE!
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{dish.name.toUpperCase()}</h1>

                  <div className="flex items-center gap-3 mb-6">
                    {dish.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{dish.originalPrice.toFixed(2)}</span>
                    )}
                    <span className="text-3xl font-bold text-gray-900">₹{dish.price.toFixed(2)}</span>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{dish.shortDescription}</p>
                </div>

                {/* Add to Cart Section */}
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-20 text-center"
                  />
                  <Button
                    onClick={handleAddToCart}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    ADD TO CART
                  </Button>
                </div>

                {/* Categories and Tags */}
                <div className="space-y-3 pt-6 border-t">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Categories:</span>
                    <div className="flex gap-2">
                      {dish.categories.map((category, index) => (
                        <span key={category}>
                          <span className="text-orange-500 hover:underline cursor-pointer">{category}</span>
                          {index < dish.categories.length - 1 && <span className="text-gray-500">, </span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Tags:</span>
                    <div className="flex gap-2">
                      {dish.tags.map((tag, index) => (
                        <span key={tag}>
                          <span className="text-gray-600">{tag}</span>
                          {index < dish.tags.length - 1 && <span className="text-gray-500">, </span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description and Reviews Tabs */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                <TabsTrigger value="description" className="text-sm font-semibold">
                  DESCRIPTION
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-sm font-semibold">
                  REVIEWS (0)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-8">
                <div className="bg-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">DESCRIPTION</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{dish.fullDescription}</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="bg-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">REVIEWS</h3>
                  <p className="text-gray-600">There are no reviews yet.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return dishes.map((dish) => ({
    slug: dish.slug,
  }))
}

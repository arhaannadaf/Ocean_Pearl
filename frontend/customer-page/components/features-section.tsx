import { Utensils, Leaf, ChefHat } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-12">
          <p className="text-orange-500 font-medium mb-4 tracking-wider">FEATURES</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Why people choose us?</h2>
          <p className="text-gray-600 max-w-md mx-auto">"We prepare every meal with the same care we’d serve at home.!"</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Utensils className="w-12 h-12 text-gray-700" strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Treasures of the Sea</h3>
            <p className="text-gray-600 leading-relaxed">
              "Savor exquisite seafood and signature dishes inspired by the ocean."
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Leaf className="w-12 h-12 text-gray-700" strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Freshness You Can Taste</h3>
            <p className="text-gray-600 leading-relaxed">
             "Every plate tells the story of today’s catch and farm-fresh produce."
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <ChefHat className="w-12 h-12 text-gray-700" strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Art of Cooking</h3>
            <p className="text-gray-600 leading-relaxed">"Where culinary creativity meets ocean-fresh inspiration."</p>
          </div>
        </div>
      </div>
    </section>
  )
}

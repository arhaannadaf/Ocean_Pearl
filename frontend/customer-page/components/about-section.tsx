import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-orange-500"></div>
                <span className="text-orange-500 font-medium text-sm tracking-wider">ABOUT US</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                We Invite You to Visit
                <br />
                Our Restaurant
              </h2>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
             welcomes you with an elegant blend of comfort, luxury, and authentic flavors. Known for its warm hospitality and 
                                                                                        refined ambiance, the restaurant offers a wide variety of cuisines—from
                                                                                        traditional South Indian coastal delicacies to multicuisine favorites, fresh seafood, and continental specialties.
                                                                                
            </p>

        
          </div>

          <div className="relative">
            <Image
              src="static/assets/Rest_front_page.jpg"
              alt="Restaurant table setting"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                We Invite You to Visit
                <br />
                Our Restaurant
              </h2>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              At Ocean Pearl Restaurant, every dish begins with the finest and freshest ingredients. 
              From farm-fresh vegetables and aromatic herbs to handpicked spices and the day’s catch from the coast,
              we believe quality starts at the source. Our chefs carefully select seasonal produce and authentic flavors to craft 
              meals that are not only delicious but also wholesome. This commitment to freshness ensures that every bite is rich in 
              taste, nutrition, and authenticity—bringing you a dining experience that feels natural, vibrant, and truly satisfying.
            </p>

            
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">READ MORE</Button>
          </div>

          <div className="relative">
            <Image
              src="static/assets/Vegetables.jpg"
              alt="Restaurant table setting"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          
        
          

          
          
        </div>
      </div>
    </section>
  )
}

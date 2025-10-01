import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rajiv Kumar",
      date: "02.02.24",
      title: "It was very delicious! ",
      content:
      "“I had an amazing experience at Ocean Pearl.The seafood platter was incredibly fresh and flavorful.The prawn curry and grilled lobster were cooked to perfection.Even the vegetarian dishes, like paneer tikka, were delicious.The desserts, especially the chocolate lava cake, were the perfect ending!” ",
       avatar: "static/assets/rajiv_icon.jpg",
    },
    {
      name: "Neha Verma",
      date: "02.10.24",
      title: "I'm delighted!",
      content:
        `“The starters were absolutely delightful — crispy, flavorful, and perfectly spiced.
The fish curry was the highlight, rich, aromatic, and cooked to perfection.
Every bite showcased the freshness of the ingredients.
The balance of spices made it unforgettable without being too heavy.
I can’t wait to come back for more of these amazing dishes!”`,
avatar: "static/assets/Neha_icon.jpg",
    },
    {
      name: "Arjun .K",
      date: "02.02.21",
      title: "I will visit again.",
      content:
        `Visiting Ocean Pearl was a wonderful experience.
The ambience was cozy, elegant, and perfect for a relaxing meal.
The staff were welcoming and attentive, making us feel right at home.
Every dish we tried, from starters to main course, was fresh and delicious.
I’ll definitely be coming back for another memorable dining experience!`,
      avatar: "static/assets/Arjun_icon.jpg",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What Our visitors say</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Porro eveniet, autem ipsam corrupti consectetur cum.
            <br />
            Repudiandae dignissimos fugiat sit nam.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="mb-6">
                { <div className="text-orange-500 text-6xl font-serif mb-4">"</div>}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{testimonial.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{testimonial.content}</p>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 mr-4">MORE ABOUT US</Button>

          
        </div>
      </div>
    </section>
  )
}

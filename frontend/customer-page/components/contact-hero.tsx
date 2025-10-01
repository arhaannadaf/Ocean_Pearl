export default function ContactHero() {
  return (
    <section className="relative h-[60vh] bg-gray-900 flex items-center justify-center">
      {/* Background with map overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('/dark-map-with-location-marker.jpg')`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl font-serif mb-4">CONTACT</h1>
        <p className="text-lg">Ocean Pearl Goa</p>
      </div>

      {/* Location marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
       
         
        
      </div>
    </section>
  )
}

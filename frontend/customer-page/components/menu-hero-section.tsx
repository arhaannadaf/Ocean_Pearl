import Image from "next/image"

export default function MenuHeroSection() {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/seafood-platter-with-crab-and-wine.jpg" alt="Menu Hero Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <div className="mb-4">
          <span className="text-orange-500 text-sm font-semibold tracking-wider uppercase">Our Menu</span>
        </div>
        <h1 className="text-6xl font-bold mb-4 text-balance">MENU LIST</h1>
      </div>
    </section>
  )
}

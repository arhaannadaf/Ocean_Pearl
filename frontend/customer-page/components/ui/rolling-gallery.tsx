"use client"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"

interface RollingGalleryProps {
  images: string[]
  speed?: number // pixels per second
  height?: number
  thumbWidth?: number
  thumbHeight?: number
  pauseOnHover?: boolean
}

export default function RollingGallery({
  images,
  speed = 40,
  height = 120,
  thumbWidth = 100,
  thumbHeight = 100,
  pauseOnHover = true,
}: RollingGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationFrame: number
    let offset = 0

    const animate = () => {
      if (!isPaused) {
        offset -= speed / 60
        if (Math.abs(offset) >= track.scrollWidth / 2) {
          offset = 0
        }
        track.style.transform = `translateX(${offset}px)`
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrame)
  }, [speed, isPaused])

  return (
    <div
      className="overflow-hidden relative w-full"
      style={{ height }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex absolute left-0 top-0"
        style={{ willChange: "transform" }}
      >
        {/* duplicate images for seamless loop */}
        {images.concat(images).map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              width: thumbWidth,
              height: thumbHeight,
              marginRight: 12,
            }}
          >
            <Image
              src={src}
              alt={`Gallery ${i}`}
              width={thumbWidth}
              height={thumbHeight}
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

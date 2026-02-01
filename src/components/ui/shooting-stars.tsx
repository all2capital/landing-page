"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface ShootingStar {
  id: number
  x: number
  y: number
  angle: number
  scale: number
  speed: number
  distance: number
}

export interface ShootingStarsProps {
  className?: string
  children?: React.ReactNode
  /** Minimum star speed */
  minSpeed?: number
  /** Maximum star speed */
  maxSpeed?: number
  /** Minimum delay between stars (ms) */
  minDelay?: number
  /** Maximum delay between stars (ms) */
  maxDelay?: number
  /** Color of the star head */
  starColor?: string
  /** Color of the gradient trail */
  trailColor?: string
  /** Width of the star */
  starWidth?: number
  /** Height of the star */
  starHeight?: number
  /** Opacity of the star (0–1), for a fainter look */
  starOpacity?: number
  /** Bias toward spawning from top (0–1). 0.65 = 65% from top, rest from other edges */
  topBias?: number
  /** When from top: angle range for downward diagonal. [min, max] in degrees, e.g. [40, 140] = down-right to down-left */
  topAngleRange?: [number, number]
}

export function ShootingStars({
  className,
  children,
  minSpeed = 5,
  maxSpeed = 15,
  minDelay = 1500,
  maxDelay = 4000,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 12,
  starHeight = 2,
  starOpacity = 1,
  topBias = 0.5,
  topAngleRange = [40, 140],
}: ShootingStarsProps) {
  const [stars, setStars] = useState<ShootingStar[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const getRandomStartPoint = useCallback(() => {
    const container = containerRef.current
    if (!container) return { x: 0, y: 0, angle: 90 }

    const { width, height } = container.getBoundingClientRect()
    // Bias toward top: topBias chance for top, else one of the other three edges
    const fromTop = Math.random() < topBias
    const side = fromTop ? 0 : Math.floor(Math.random() * 3) + 1

    const [topMin, topMax] = topAngleRange
    const topAngle = topMin + Math.random() * (topMax - topMin)

    switch (side) {
      case 0: // Top edge — downward diagonal
        return { x: Math.random() * width, y: 0, angle: topAngle }
      case 1: // Right edge
        return { x: width, y: Math.random() * height, angle: 135 }
      case 2: // Bottom edge
        return { x: Math.random() * width, y: height, angle: 225 }
      case 3: // Left edge
        return { x: 0, y: Math.random() * height, angle: 315 }
      default:
        return { x: Math.random() * width, y: 0, angle: topAngle }
    }
  }, [topBias, topAngleRange])

  const createStar = useCallback(() => {
    if (typeof document !== "undefined" && document.hidden) return
    const { x, y, angle } = getRandomStartPoint()
    const newStar: ShootingStar = {
      id: Date.now() + Math.random(),
      x,
      y,
      angle,
      scale: 1,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      distance: 0,
    }
    setStars(prev => [...prev, newStar])
    if (!document.hidden) {
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay
      timeoutRef.current = setTimeout(createStar, randomDelay)
    }
  }, [getRandomStartPoint, minSpeed, maxSpeed, minDelay, maxDelay])

  useEffect(() => {
    const initialDelay = setTimeout(createStar, 100)
    return () => {
      clearTimeout(initialDelay)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [createStar])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = undefined
        }
      } else {
        timeoutRef.current = setTimeout(createStar, 100)
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)
    return () => document.removeEventListener("visibilitychange", handleVisibility)
  }, [createStar])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const moveStars = () => {
      const { width, height } = container.getBoundingClientRect()

      setStars(prevStars =>
        prevStars
          .map(star => {
            const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180)
            const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180)
            const newDistance = star.distance + star.speed
            const newScale = 1 + newDistance / 100

            // Remove if out of bounds
            if (newX < -50 || newX > width + 50 || newY < -50 || newY > height + 50) {
              return null
            }

            return {
              ...star,
              x: newX,
              y: newY,
              distance: newDistance,
              scale: newScale,
            }
          })
          .filter((star): star is ShootingStar => star !== null)
      )

      animationRef.current = requestAnimationFrame(moveStars)
    }

    animationRef.current = requestAnimationFrame(moveStars)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("fixed inset-0 overflow-hidden bg-neutral-950", className)}>
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="shooting-star-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={trailColor} stopOpacity={0} />
            <stop offset="100%" stopColor={starColor} stopOpacity={starOpacity} />
          </linearGradient>
        </defs>

        {stars.map(star => (
          <rect
            key={star.id}
            fill="url(#shooting-star-gradient)"
            width={starWidth * star.scale}
            height={starHeight}
            x={star.x}
            y={star.y}
            transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
          />
        ))}
      </svg>

      {/* Content layer */}
      {children && (
        <div className="relative z-10 h-full w-full">{children}</div>
      )}
    </div>
  )
}

export default function ShootingStarsDemo() {
  return <ShootingStars />
}

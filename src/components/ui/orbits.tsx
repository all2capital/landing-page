"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface OrbitsBackgroundProps {
  className?: string
  children?: React.ReactNode
  /** Number of orbital rings */
  count?: number
  /** Base color */
  color?: string
  /** Animation speed */
  speed?: number
  /** Transparent background (no center star/glow, no fill - for overlaying on content) */
  transparentBackground?: boolean
  /** Min radius as fraction of container (0.5 = orbits start at 50% from center). Larger = orbits further from center. */
  minRadiusFraction?: number
  /** Inclination of orbital plane in degrees (0 = face-on circle, 45 = tilted for depth, 30 = less tilt). */
  inclinationDegrees?: number
}

interface Orbit {
  radius: number
  tiltX: number
  tiltY: number
  rotationSpeed: number
  particles: { angle: number; size: number }[]
  orbitLineOpacity: number
  lineWidth: number
  planetColor: string
}

export function OrbitsBackground({
  className,
  children,
  count = 5,
  color = "#06b6d4",
  speed = 1,
  transparentBackground = false,
  minRadiusFraction = 0.5,
  inclinationDegrees = 45,
}: OrbitsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = container.getBoundingClientRect()
    let width = rect.width
    let height = rect.height

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    let animationId: number
    let lastTime = 0

    // Parse color
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : { r: 6, g: 182, b: 212 }
    }

    // Planet colors — solar system inspired (Mercury→Neptune)
    const planetColors = [
      "#8B3A3A", "#4A7C4A", "#5B8FB8", "#C4A574", "#D4A574", "#5A9B5A", "#6BB5C4", "#E8B85C",
    ]
    // Relative planet sizes (Mercury→Neptune). Scaled so Jupiter/Saturn are largest, inner small, not exact.
    const planetSizes = [1.4, 2.2, 2.5, 1.6, 5.2, 4.4, 3.0, 2.9]
    // Semi-major axes in AU (Mercury→Neptune). Inner planets close, outer much farther — normalized to 0–1.
    const orbitDistancesAU = [0.39, 0.72, 1.0, 1.52, 5.2, 9.5, 19.2, 30.1]
    const distMin = orbitDistancesAU[0]
    const distMax = orbitDistancesAU[orbitDistancesAU.length - 1]
    const normalizeDist = (d: number) => (d - distMin) / (distMax - distMin)

    const createOrbits = (): Orbit[] => {
      const minDim = Math.min(width, height)
      const orbits: Orbit[] = []
      const radiusRange = 1 - minRadiusFraction

      for (let i = 0; i < count; i++) {
        const au = orbitDistancesAU[i % orbitDistancesAU.length] ?? orbitDistancesAU[0] + (i / Math.max(count - 1, 1)) * (distMax - distMin)
        const t = normalizeDist(au)
        const radius = minDim * (minRadiusFraction + t * radiusRange)
        // Same rotation speed for all orbits — the slower (outer) speed
        const rotationSpeed = 0.0004 * speed
        const size = planetSizes[i % planetSizes.length] ?? 2 + (i / count) * 2
        const particles = [{
          angle: Math.random() * Math.PI * 2,
          size,
        }]
        const inclinationRad = (inclinationDegrees * Math.PI) / 180
        const tiltX = Math.cos(inclinationRad)
        const tiltY = 0.2

        orbits.push({
          radius,
          tiltX,
          tiltY,
          rotationSpeed,
          particles,
          orbitLineOpacity: 0.35,
          lineWidth: 0.8,
          planetColor: planetColors[i % planetColors.length],
        })
      }

      return orbits
    }

    let orbits = createOrbits()

    // Resize handler
    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      orbits = createOrbits()
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    const cx = () => width / 2
    const cy = () => height / 2

    // Light grey orbit paths (reference style — thin, subtle)
    const orbitLineRgb = { r: 160, g: 162, b: 172 }

    const drawOrbit = (orbit: Orbit) => {
      ctx.beginPath()
      ctx.ellipse(
        cx(),
        cy(),
        orbit.radius,
        orbit.radius * orbit.tiltX,
        orbit.tiltY,
        0,
        Math.PI * 2
      )
      ctx.strokeStyle = `rgba(${orbitLineRgb.r}, ${orbitLineRgb.g}, ${orbitLineRgb.b}, ${orbit.orbitLineOpacity})`
      ctx.lineWidth = orbit.lineWidth
      ctx.stroke()
    }

    const hexToRgbForPlanet = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : { r: 200, g: 200, b: 200 }
    }

    // Draw planet — solid colored circle (no glow, reference style)
    const drawParticle = (orbit: Orbit, particle: { angle: number; size: number }) => {
      const x = cx() + Math.cos(particle.angle) * orbit.radius * Math.cos(orbit.tiltY) -
                Math.sin(particle.angle) * orbit.radius * orbit.tiltX * Math.sin(orbit.tiltY)
      const y = cy() + Math.cos(particle.angle) * orbit.radius * Math.sin(orbit.tiltY) +
                Math.sin(particle.angle) * orbit.radius * orbit.tiltX * Math.cos(orbit.tiltY)

      const prgb = hexToRgbForPlanet(orbit.planetColor)
      ctx.fillStyle = `rgb(${prgb.r}, ${prgb.g}, ${prgb.b})`
      ctx.beginPath()
      ctx.arc(x, y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      // Subtle darker outline for definition
      ctx.strokeStyle = `rgba(${Math.max(0, prgb.r - 40)}, ${Math.max(0, prgb.g - 40)}, ${Math.max(0, prgb.b - 40)}, 0.6)`
      ctx.lineWidth = 0.6
      ctx.stroke()
    }

    // Animation — time-based so rotation speed is constant regardless of frame rate / mouse
    const animate = (now: number) => {
      const deltaMs = lastTime ? now - lastTime : 16.67
      lastTime = now
      const deltaFrames = deltaMs * (60 / 1000)

      if (transparentBackground) {
        ctx.clearRect(0, 0, width, height)
      } else {
        ctx.fillStyle = "#030712"
        ctx.fillRect(0, 0, width, height)
      }

      for (const orbit of orbits) {
        drawOrbit(orbit)

        for (const particle of orbit.particles) {
          particle.angle += orbit.rotationSpeed * deltaFrames
          drawParticle(orbit, particle)
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
    }
  }, [count, color, speed, transparentBackground, minRadiusFraction, inclinationDegrees])

  return (
    <div
      ref={containerRef}
      className={cn(
        transparentBackground ? "absolute inset-0 overflow-hidden pointer-events-none" : "fixed inset-0 overflow-hidden bg-[#030712]",
        className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Vignette - only when not transparent */}
      {!transparentBackground && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, #030712 100%)",
          }}
        />
      )}

      {/* Content layer */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}

export default function OrbitsBackgroundDemo() {
  return <OrbitsBackground />
}

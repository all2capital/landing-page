"use client"

import { useRef, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PARTICLE_COUNT = 180
const CONNECTION_DISTANCE = 4.5
const MOUSE_RADIUS = 5
const MOUSE_PUSH = 0.8
const DRIFT_SPEED = 0.15
const BOUNDS = 18
const MAX_LINES = 1080

// ---------------------------------------------------------------------------
// Shaders for particles
// ---------------------------------------------------------------------------

const particleVertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float depth = -mvPosition.z;
    // Size attenuation: closer = larger
    gl_PointSize = aSize * (300.0 / depth);
    // Alpha attenuation: farther = dimmer
    vAlpha = clamp(1.0 - (depth - 10.0) / 40.0, 0.15, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const particleFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Round glowing point via gl_PointCoord
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;
    // Soft glow falloff
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    gl_FragColor = vec4(vColor * glow, glow * vAlpha);
  }
`

// ---------------------------------------------------------------------------
// ParticleNetwork — the inner R3F component
// ---------------------------------------------------------------------------

function ParticleNetwork({ scrollY }: { scrollY: React.RefObject<number> }) {
  const { camera } = useThree()

  // Mouse position in 3D (projected to z=0 plane)
  const mouse3D = useRef(new THREE.Vector3(9999, 9999, 0))
  const raycaster = useRef(new THREE.Raycaster())
  const mouseNDC = useRef(new THREE.Vector2(9999, 9999))
  const planeZ = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])

  // Track mouse via window event
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseNDC.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseNDC.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const handleMouseLeave = () => {
      mouseNDC.current.set(9999, 9999)
    }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Pre-allocate particle data
  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      // Random position within bounds
      positions[i3] = (Math.random() - 0.5) * BOUNDS * 2
      positions[i3 + 1] = (Math.random() - 0.5) * BOUNDS * 2
      positions[i3 + 2] = (Math.random() - 0.5) * BOUNDS * 2

      // Random slow drift velocity
      velocities[i3] = (Math.random() - 0.5) * DRIFT_SPEED
      velocities[i3 + 1] = (Math.random() - 0.5) * DRIFT_SPEED
      velocities[i3 + 2] = (Math.random() - 0.5) * DRIFT_SPEED

      // Pure R, G, or B color
      const channel = Math.floor(Math.random() * 3)
      colors[i3] = channel === 0 ? 1 : 0
      colors[i3 + 1] = channel === 1 ? 1 : 0
      colors[i3 + 2] = channel === 2 ? 1 : 0

      // Slight size variation
      sizes[i] = 1.5 + Math.random() * 1.5
    }
    return { positions, velocities, colors, sizes }
  }, [])

  // Refs for Three.js objects
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  // Pre-allocate line geometry buffers
  const lineData = useMemo(() => {
    const positions = new Float32Array(MAX_LINES * 2 * 3) // 2 vertices per line, 3 coords each
    const colors = new Float32Array(MAX_LINES * 2 * 3)
    return { positions, colors }
  }, [])

  // Create shader material for particles
  const particleMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  )

  // Create line material
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.5,
      }),
    []
  )

  // Temp vector for intersection
  const intersectPoint = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05) // cap delta to avoid jumps

    // Update mouse 3D position via raycaster
    raycaster.current.setFromCamera(mouseNDC.current, camera)
    const hit = raycaster.current.ray.intersectPlane(planeZ, intersectPoint.current)
    if (hit) {
      mouse3D.current.copy(intersectPoint.current)
    } else {
      mouse3D.current.set(9999, 9999, 0)
    }

    // Scroll parallax — shift camera Y slightly
    const scrollOffset = (scrollY.current ?? 0) * 0.003
    camera.position.y = 2 - scrollOffset

    // Update particle positions
    const pos = particleData.positions
    const vel = particleData.velocities
    const mx = mouse3D.current.x
    const my = mouse3D.current.y

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Mouse push (on XY plane — compare x,y only)
      const dx = pos[i3] - mx
      const dy = pos[i3 + 1] - my
      const distSq = dx * dx + dy * dy
      if (distSq < MOUSE_RADIUS * MOUSE_RADIUS && distSq > 0.001) {
        const dist = Math.sqrt(distSq)
        const force = (1 - dist / MOUSE_RADIUS) * MOUSE_PUSH * dt
        const nx = dx / dist
        const ny = dy / dist
        vel[i3] += nx * force
        vel[i3 + 1] += ny * force
      }

      // Apply velocity
      pos[i3] += vel[i3]
      pos[i3 + 1] += vel[i3 + 1]
      pos[i3 + 2] += vel[i3 + 2]

      // Gentle velocity damping
      vel[i3] *= 0.998
      vel[i3 + 1] *= 0.998
      vel[i3 + 2] *= 0.998

      // Wrap around bounds
      if (pos[i3] > BOUNDS) pos[i3] = -BOUNDS
      else if (pos[i3] < -BOUNDS) pos[i3] = BOUNDS
      if (pos[i3 + 1] > BOUNDS) pos[i3 + 1] = -BOUNDS
      else if (pos[i3 + 1] < -BOUNDS) pos[i3 + 1] = BOUNDS
      if (pos[i3 + 2] > BOUNDS) pos[i3 + 2] = -BOUNDS
      else if (pos[i3 + 2] < -BOUNDS) pos[i3 + 2] = BOUNDS
    }

    // Update particle buffer attribute
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute
      posAttr.needsUpdate = true
    }

    // Rebuild connections
    const linePos = lineData.positions
    const lineCol = lineData.colors
    const pColors = particleData.colors
    let lineCount = 0
    const connDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE

    for (let i = 0; i < PARTICLE_COUNT && lineCount < MAX_LINES; i++) {
      const i3 = i * 3
      const ax = pos[i3]
      const ay = pos[i3 + 1]
      const az = pos[i3 + 2]

      for (let j = i + 1; j < PARTICLE_COUNT && lineCount < MAX_LINES; j++) {
        const j3 = j * 3
        const dx = ax - pos[j3]
        const dy = ay - pos[j3 + 1]
        const dz = az - pos[j3 + 2]
        const dSq = dx * dx + dy * dy + dz * dz

        if (dSq < connDistSq) {
          const idx = lineCount * 6 // 2 vertices * 3 coords
          // Vertex 1 (particle i)
          linePos[idx] = ax
          linePos[idx + 1] = ay
          linePos[idx + 2] = az
          // Vertex 2 (particle j)
          linePos[idx + 3] = pos[j3]
          linePos[idx + 4] = pos[j3 + 1]
          linePos[idx + 5] = pos[j3 + 2]

          // Fade opacity with distance — encode in color intensity
          const opacity = 1 - Math.sqrt(dSq) / CONNECTION_DISTANCE

          // Vertex 1 color (particle i's color, faded)
          lineCol[idx] = pColors[i3] * opacity
          lineCol[idx + 1] = pColors[i3 + 1] * opacity
          lineCol[idx + 2] = pColors[i3 + 2] * opacity
          // Vertex 2 color (particle j's color, faded)
          lineCol[idx + 3] = pColors[j3] * opacity
          lineCol[idx + 4] = pColors[j3 + 1] * opacity
          lineCol[idx + 5] = pColors[j3 + 2] * opacity

          lineCount++
        }
      }
    }

    // Update line geometry
    if (linesRef.current) {
      const linePosAttr = linesRef.current.geometry.getAttribute("position") as THREE.BufferAttribute
      linePosAttr.needsUpdate = true
      const lineColAttr = linesRef.current.geometry.getAttribute("color") as THREE.BufferAttribute
      lineColAttr.needsUpdate = true
      linesRef.current.geometry.setDrawRange(0, lineCount * 2)
    }
  })

  return (
    <>
      {/* Particles */}
      <points ref={pointsRef} material={particleMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aColor"
            args={[particleData.colors, 3]}
          />
          <bufferAttribute
            attach="attributes-aSize"
            args={[particleData.sizes, 1]}
          />
        </bufferGeometry>
      </points>

      {/* Connection Lines */}
      <lineSegments ref={linesRef} material={lineMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lineData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineData.colors, 3]}
          />
        </bufferGeometry>
      </lineSegments>
    </>
  )
}

// ---------------------------------------------------------------------------
// Exported wrapper
// ---------------------------------------------------------------------------

export function SolarSystem3D({
  className,
  scrollY,
}: {
  className?: string
  scrollY: React.RefObject<number>
}) {
  return (
    <div className={className}>
      <Canvas
        gl={{
          alpha: false,
          antialias: true,
          toneMapping: THREE.NoToneMapping,
        }}
        camera={{ fov: 50, near: 0.1, far: 200, position: [0, 2, 30] }}
        style={{ background: "#050510" }}
      >
        <ParticleNetwork scrollY={scrollY} />
      </Canvas>
    </div>
  )
}

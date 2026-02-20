# All2 Capital Project Instructions

## Skills & Expertise

### Remotion
When working with Remotion (React video framework):
- Use `@remotion/cli` for rendering and previewing
- Components use `useCurrentFrame()` and `useVideoConfig()` hooks
- Compositions define video dimensions, fps, and duration
- Use `interpolate()` for animations between keyframes
- Use `spring()` for physics-based animations
- `Sequence` component for timing different sections
- `AbsoluteFill` for full-frame positioning
- Audio via `<Audio>` component with `startFrom` and `endAt` props
- Export with `npx remotion render <comp-id> out.mp4`
- Preview with `npx remotion preview`

### Three.js
When working with Three.js (3D graphics):
- For React projects, prefer `@react-three/fiber` (R3F) and `@react-three/drei`
- Core concepts: Scene, Camera, Renderer, Mesh, Geometry, Material
- R3F uses `<Canvas>` as the root component
- Use `useFrame()` hook for animation loops
- `useThree()` for accessing scene, camera, renderer
- Drei helpers: `OrbitControls`, `Environment`, `useGLTF`, `Text3D`, `Float`
- For shaders: `shaderMaterial` from drei or raw `THREE.ShaderMaterial`
- Post-processing via `@react-three/postprocessing`
- Performance: use `instancedMesh` for many identical objects
- Loading models: GLTF/GLB format preferred, use `useGLTF` or `useLoader`

## Project Context
This is the All2 Capital investment fund website built with:
- Next.js 16
- Tailwind CSS v4
- Framer Motion for animations
- Dark mode default with theme toggle

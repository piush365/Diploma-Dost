import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default function HeroScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 6.5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.4
    mount.appendChild(renderer.domElement)

    // ── LIGHTS ─────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xfff5e0, 0.4))

    const keyLight = new THREE.DirectionalLight(0xffd97a, 3.5)
    keyLight.position.set(-3, 4, 3)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x4488ff, 0.6)
    fillLight.position.set(4, 0, 2)
    scene.add(fillLight)

    const accentLight = new THREE.PointLight(0xe8453c, 4.0, 8)
    accentLight.position.set(0, -0.5, 2)
    scene.add(accentLight)

    const wingGlow = new THREE.PointLight(0xe8453c, 2.5, 12)
    wingGlow.position.set(0, 0.2, 1.5)
    scene.add(wingGlow)

    const rimLight = new THREE.DirectionalLight(0xff8c30, 1.6)
    rimLight.position.set(2, 1, -4)
    scene.add(rimLight)

    const topLight = new THREE.DirectionalLight(0xffffff, 1.2)
    topLight.position.set(0, 6, 2)
    scene.add(topLight)

    const eyeLight = new THREE.PointLight(0xe8453c, 6.0, 3)
    eyeLight.position.set(0, 0.8, 2.8)
    scene.add(eyeLight)

    // ── GROUP ──────────────────────────────────────────────
    const group = new THREE.Group()
    scene.add(group)

    // ── LOADERS ────────────────────────────────────────────
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    dracoLoader.preload()

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    let eagleMixer = null
    let capMixer = null
    const clock = new THREE.Clock()

    // ── CAP MATERIALS (no baked textures, flat colors) ─────
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a, metalness: 0.8, roughness: 0.4, side: THREE.DoubleSide
    })
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xe8453c, emissive: 0xe8453c, emissiveIntensity: 3.5,
      metalness: 0.1, roughness: 0.4, side: THREE.DoubleSide
    })

    // ── LOAD EAGLE ─────────────────────────────────────────
    // Eagle has baked PBR textures — preserve them, don't override
    let eagleRef = null
    loader.load(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/model/mechanical_eagle.glb`, (gltf) => {
      const eagle = gltf.scene

      eagle.traverse(child => {
        if (!child.isMesh) return
        child.castShadow = true
        if (child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material]
          mats.forEach(mat => {
            if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace
            if (mat.emissiveMap) mat.emissiveMap.colorSpace = THREE.SRGBColorSpace
            mat.needsUpdate = true
          })
        }
      })

      const box = new THREE.Box3().setFromObject(eagle)
      const size = new THREE.Vector3()
      box.getSize(size)
      const maxDim = Math.max(size.x, size.y, size.z)
      eagle.scale.setScalar(4.5 / maxDim)

      const box2 = new THREE.Box3().setFromObject(eagle)
      const center = new THREE.Vector3()
      box2.getCenter(center)
      eagle.position.sub(center)
      eagle.position.y += 0.6
      eagle.rotation.y = -0.3

      eagleRef = eagle
      group.add(eagle)

      if (gltf.animations?.length > 0) {
        eagleMixer = new THREE.AnimationMixer(eagle)
        gltf.animations.forEach(clip => eagleMixer.clipAction(clip).play())
      }
    }, undefined, (err) => console.error('Eagle load error:', err))

    // ── LOAD CAP ───────────────────────────────────────────
    // Hat has no textures — flat material colors only
    loader.load(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/model/graduation_hat.glb`, (gltf) => {
      const cap = gltf.scene

      cap.traverse(child => {
        if (!child.isMesh) return
        const name = (child.name || '').toLowerCase()
        const matName = child.material
          ? (Array.isArray(child.material)
              ? child.material[0]?.name || ''
              : child.material.name || '').toLowerCase()
          : ''

        if (
          name.includes('tassel') || name.includes('string') || name.includes('roope') ||
          matName.includes('yellow') || matName.includes('gold') || matName.includes('tassel')
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xc8a84b, metalness: 0.8, roughness: 0.25, side: THREE.DoubleSide
          })
        } else if (
          name.includes('bood') || name.includes('sphere') ||
          matName.includes('bood')
        ) {
          child.material = glowMat
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x111111, metalness: 0.6, roughness: 0.35, side: THREE.DoubleSide
          })
        }
        child.castShadow = true
      })

      const capBox = new THREE.Box3().setFromObject(cap)
      const capSize = new THREE.Vector3()
      capBox.getSize(capSize)
      const capMax = Math.max(capSize.x, capSize.y, capSize.z)
      cap.scale.setScalar(1.2 / capMax)

      const capBox2 = new THREE.Box3().setFromObject(cap)
      const capCenter = new THREE.Vector3()
      capBox2.getCenter(capCenter)
      cap.position.sub(capCenter)
      cap.position.y -= 1.1
      cap.rotation.y = 0.5

      group.add(cap)

      if (gltf.animations?.length > 0) {
        capMixer = new THREE.AnimationMixer(cap)
        gltf.animations.forEach(clip => capMixer.clipAction(clip).play())
      }
    }, undefined, (err) => console.error('Cap load error:', err))

    // ── PARTICLES ──────────────────────────────────────────
    const particleCount = 120
    const pPositions = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 2.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      pPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pPositions[i * 3 + 1] = r * Math.cos(phi)
      pPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 1

      if (Math.random() > 0.75) {
        pColors[i * 3] = 0.91; pColors[i * 3 + 1] = 0.27; pColors[i * 3 + 2] = 0.24
      } else {
        pColors[i * 3] = 0.78; pColors[i * 3 + 1] = 0.66; pColors[i * 3 + 2] = 0.29
      }
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))
    const particleMat = new THREE.PointsMaterial({
      vertexColors: true, size: 0.025, transparent: true,
      opacity: 0.55, sizeAttenuation: true
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── EXCELLENCE TEXT ────────────────────────────────────
    const canvas2d = document.createElement('canvas')
    canvas2d.width = 512
    canvas2d.height = 96
    const ctx2d = canvas2d.getContext('2d')
    ctx2d.clearRect(0, 0, 512, 96)

    ctx2d.fillStyle = 'rgba(20, 20, 20, 0)'
    ctx2d.strokeStyle = 'rgba(200, 169, 75, 0)'
    ctx2d.lineWidth = 1.5
    const rx = 12
    const rw = 480, rh = 72, rx0 = 16, ry0 = 12
    ctx2d.beginPath()
    ctx2d.moveTo(rx0 + rx, ry0)
    ctx2d.lineTo(rx0 + rw - rx, ry0)
    ctx2d.arcTo(rx0 + rw, ry0, rx0 + rw, ry0 + rx, rx)
    ctx2d.lineTo(rx0 + rw, ry0 + rh - rx)
    ctx2d.arcTo(rx0 + rw, ry0 + rh, rx0 + rw - rx, ry0 + rh, rx)
    ctx2d.lineTo(rx0 + rx, ry0 + rh)
    ctx2d.arcTo(rx0, ry0 + rh, rx0, ry0 + rh - rx, rx)
    ctx2d.lineTo(rx0, ry0 + rx)
    ctx2d.arcTo(rx0, ry0, rx0 + rx, ry0, rx)
    ctx2d.closePath()
    ctx2d.fill()
    ctx2d.stroke()

    ctx2d.font = '500 13px "JetBrains Mono", monospace'
    ctx2d.fillStyle = 'rgba(232, 69, 60, 0.75)'
    ctx2d.letterSpacing = '0px'
    ctx2d.textAlign = 'center'
    ctx2d.textBaseline = 'middle'

    ctx2d.font = 'italic 700 34px serif'
    ctx2d.letterSpacing = '4px'
    const grad = ctx2d.createLinearGradient(140, 0, 370, 0)
    grad.addColorStop(0,   'rgba(232, 69, 60, 0.95)')
    grad.addColorStop(0.5, 'rgba(200, 168, 75, 1.0)')
    grad.addColorStop(1,   'rgba(232, 69, 60, 0.95)')
    ctx2d.fillStyle = grad
    ctx2d.fillText('Excellence', 256, 62)

    const textTexture = new THREE.CanvasTexture(canvas2d)
    const textGeo = new THREE.PlaneGeometry(2.2, 0.42)
    const textMat = new THREE.MeshBasicMaterial({
      map: textTexture, transparent: true,
      depthWrite: false, side: THREE.DoubleSide,
    })
    const textMesh = new THREE.Mesh(textGeo, textMat)
    textMesh.position.set(0, -1.9, 0)
    scene.add(textMesh)

    // ── DRAG + PARALLAX STATE ──────────────────────────────
    const mouse = { x: 0, y: 0 }
    const smoothMouse = { x: 0, y: 0 }
    const MAX_X = Math.PI

    const drag = {
      active: false,
      startX: 0, startY: 0,
      rotX: 0, rotY: 0,
      lastRotY: 0,
    }

    const handleMouseDown = (e) => {
      drag.active = true
      drag.startX = e.clientX
      drag.startY = e.clientY
      mount.style.cursor = 'grabbing'
    }

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      mouse.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2

      if (!drag.active) return
      const dx = (e.clientX - drag.startX) * 0.005
      const dy = (e.clientY - drag.startY) * 0.005
      drag.rotY += dx
      drag.rotX += dy
      drag.startX = e.clientX
      drag.startY = e.clientY
    }

    const handleMouseUp = () => {
      drag.active = false
      mount.style.cursor = 'grab'
    }

    const handleMouseLeave = () => {
      drag.active = false
      mount.style.cursor = 'grab'
    }

    const handleTouchStart = (e) => {
      const t = e.touches[0]
      drag.active = true
      drag.startX = t.clientX
      drag.startY = t.clientY
    }

    const handleTouchMove = (e) => {
      if (!drag.active) return
      const t = e.touches[0]
      const dx = (t.clientX - drag.startX) * 0.005
      const dy = (t.clientY - drag.startY) * 0.005
      drag.rotY += dx
      drag.rotX += dy
      drag.rotX = Math.max(-MAX_X, Math.min(MAX_X, drag.rotX))
      drag.startX = t.clientX
      drag.startY = t.clientY
    }

    const handleTouchEnd = () => { drag.active = false }

    mount.style.pointerEvents = 'auto'
    mount.style.cursor = 'grab'
    mount.addEventListener('mousedown', handleMouseDown)
    mount.addEventListener('mouseleave', handleMouseLeave)
    mount.addEventListener('touchstart', handleTouchStart, { passive: true })
    mount.addEventListener('touchmove', handleTouchMove, { passive: true })
    mount.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // ── ANIMATE ────────────────────────────────────────────
    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      if (eagleMixer) eagleMixer.update(delta)
      if (capMixer) capMixer.update(delta)

      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.03
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.03

      if (drag.active) {
        group.rotation.x = drag.rotX
        group.rotation.y = drag.rotY
      } else {
        drag.lastRotY += delta * 0.12
        group.rotation.y = drag.rotY + drag.lastRotY + smoothMouse.x * 0.3
        group.rotation.x += (drag.rotX + smoothMouse.y * -0.12 - group.rotation.x) * 0.05
      }

      group.position.y = Math.sin(elapsed * 0.5) * 0.06

      particles.rotation.y = elapsed * 0.03
      particles.rotation.x = elapsed * 0.015

      const pulse = Math.sin(elapsed * 2.2) * 0.8
      accentLight.intensity = 3.5 + pulse
      wingGlow.intensity    = 2.0 + Math.sin(elapsed * 1.8 + 1) * 0.6
      eyeLight.intensity    = 5.0 + Math.sin(elapsed * 3.0) * 2.0

      if (eagleRef) {
        eyeLight.position.x = Math.sin(group.rotation.y) * 0.3
      }

      textMesh.position.y = -1.9 + Math.sin(elapsed * 0.7 + 1.5) * 0.04
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      mount.removeEventListener('mousedown', handleMouseDown)
      mount.removeEventListener('mouseleave', handleMouseLeave)
      mount.removeEventListener('touchstart', handleTouchStart)
      mount.removeEventListener('touchmove', handleTouchMove)
      mount.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleResize)
      dracoLoader.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
      }}
    />
  )
}
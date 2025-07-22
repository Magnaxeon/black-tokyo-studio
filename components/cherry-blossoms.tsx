"use client"

import { useEffect, useState } from "react"

interface Petal {
  id: number
  x: number
  y: number
  rotation: number
  speed: number
  size: number
}

export function CherryBlossoms() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const initialPetals: Petal[] = []
    for (let i = 0; i < 15; i++) {
      initialPetals.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * -500,
        rotation: Math.random() * 360,
        speed: Math.random() * 2 + 1,
        size: Math.random() * 20 + 10,
      })
    }
    setPetals(initialPetals)

    const interval = setInterval(() => {
      setPetals((prevPetals) =>
        prevPetals.map((petal) => ({
          ...petal,
          y: petal.y > window.innerHeight ? -50 : petal.y + petal.speed,
          x: petal.x + Math.sin(petal.y * 0.01) * 0.5,
          rotation: petal.rotation + 1,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute text-pink-300 opacity-70"
          style={{
            left: `${petal.x}px`,
            top: `${petal.y}px`,
            transform: `rotate(${petal.rotation}deg)`,
            fontSize: `${petal.size}px`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  )
}

import React, { useEffect, useState } from "react"
import styled from "styled-components" // ✅ make sure this is installed

// 🧠 Hook: usePokemon
export function usePokemon(name) {
  const [data, setData] = useState(null)
  const [errors, setErrors] = useState(null)
  const [status, setStatus] = useState("idle")

  useEffect(() => {
    if (!name) return

    setStatus("pending")
    setData(null)
    setErrors(null)

    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not found")
        }
        return res.json()
      })
      .then((data) => {
        setData(data)
        setStatus("fulfilled") // ✅ match test
      })
      .catch((error) => {
        setErrors([error.message]) // ✅ errors is an array
        setStatus("rejected")
      })
  }, [name])

  return { data, errors, status }
}

// 🖱️ Hook: useMouseCoordinates
export function useMouseCoordinates() {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMouseMove(event) {
      setCoords({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return coords
}

// 💅 Wrapper component (used in render)
const Wrapper = styled.section`
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.15);
  display: grid;
  place-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background: papayawhip;
  text-align: center;

  h1 {
    background: #ef5350;
    color: white;
    display: block;
    margin: 0;
    padding: 1rem;
    font-size: 2rem;
  }

  form {
    display: grid;
    grid-template-columns: 1fr auto;
    width: 100%;
  }
`

export { Wrapper } //

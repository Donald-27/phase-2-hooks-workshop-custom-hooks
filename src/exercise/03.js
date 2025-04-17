import { useEffect, useState } from "react"

function useMouseCoordinates() {
  const [coords, setCoords] = useState({ clientX: 0, clientY: 0 })

  useEffect(() => {
    function handleMouseMove(event) {
      setCoords({ clientX: event.clientX, clientY: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return coords
}

export default useMouseCoordinates

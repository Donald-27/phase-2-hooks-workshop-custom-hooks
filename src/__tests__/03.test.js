import { renderHook, act } from "@testing-library/react-hooks"
import useMouseCoordinates from "../exercise/03"

describe("Exercise 03", () => {
  test("returns an initial state with 0, 0 as the mouse coordinates", () => {
    const { result } = renderHook(() => useMouseCoordinates())
    expect(result.current).toMatchObject({ clientX: 0, clientY: 0 })
  })

  test("returns the mouse coordinates after the mouse has moved", () => {
    const { result } = renderHook(() => useMouseCoordinates())

    act(() => {
      const event = new MouseEvent("mousemove", {
        clientX: 100,
        clientY: 200,
      })
      window.dispatchEvent(event)
    })

    expect(result.current).toMatchObject({ clientX: 100, clientY: 200 })
  })

  test("the event handler function is removed when the component unmounts", () => {
    const { unmount } = renderHook(() => useMouseCoordinates())
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener")
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function)
    )
    removeEventListenerSpy.mockRestore()
  })
})

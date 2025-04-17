import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../exercise/04";

test("syncs value with storage events", () => {
  const { result } = renderHook(() => useLocalStorage("foo", "bar"));

  act(() => {
    localStorage.setItem("foo", JSON.stringify("baz"));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "foo",
        newValue: JSON.stringify("baz"),
      })
    );
  });

  expect(result.current[0]).toBe("baz");
});

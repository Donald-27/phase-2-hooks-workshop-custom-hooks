import { useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue = null) {
  const [state, setState] = useState(() => {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === key) {
        const newValue = event.newValue ? JSON.parse(event.newValue) : null;
        setState(newValue);
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key]);

  return [state, setState];
}

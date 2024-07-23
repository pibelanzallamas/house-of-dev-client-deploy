import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storeValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem("text", user);
    } catch (error) {
      console.error(error);
    }
  };

  return [storeValue, setValue];
}

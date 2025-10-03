import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const raw = localStorage.getItem(key);
      return raw == null ? initialValue : JSON.parse(raw);
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  const clearValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {}
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, setValue, clearValue];
}

import { useEffect, useState } from "react";

const defaultValue = null;

export const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      return defaultValue;
    }
    if (typeof storedValue !== "string") {
      return defaultValue;
    }
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);
  return { value, setValue };
};

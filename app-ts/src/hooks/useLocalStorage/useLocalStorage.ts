import { useEffect, useState } from "react";

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  }
];

export function useLocalStorage(key: string): UseLocalStorage {
  const [value, setValue] = useState<LocalStorageReturnValue>(() => {
    const jsonValue = localStorage.getItem(key);
    return JSON.parse(jsonValue!) || null;
  });

  useEffect(() => {
    if (value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, [key, value]);

  const setItem = (newValue: LocalStorageSetValue) => setValue(newValue);
  const removeItem = () => setValue(null);

  return [value, { setItem, removeItem }];
}

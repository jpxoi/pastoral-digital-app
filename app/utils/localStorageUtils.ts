export const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const getLocalStorageItems = (
  keys: string[]
): Record<string, string> => {
  const items: Record<string, string> = {};

  keys.forEach((key) => {
    items[key] = localStorage.getItem(key) as string;
  });

  return items;
};

export const setLocalStorageItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const setLocalStorageItems = (items: Record<string, string>): void => {
  Object.entries(items).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

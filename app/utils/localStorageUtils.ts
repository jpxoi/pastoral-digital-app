export const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const setLocalStorageItems = (items: Record<string, string>): void => {
  Object.entries(items).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
}

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

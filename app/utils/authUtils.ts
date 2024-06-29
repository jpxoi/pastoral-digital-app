import { clearLocalStorage, getLocalStorageItems } from "./localStorageUtils";

export function checkExpiryDate(expiryDate: string): boolean {
  return new Date(expiryDate) > new Date();
}

export function calculateExpiryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString();
}

export function checkUserLoggedIn(): boolean {
  const {
    id: savedID,
    token: savedToken,
    expiryDate,
  } = getLocalStorageItems(["id", "token", "expiryDate"]);

  const idPattern = /^[A-Za-z]{2}-\d{3}$/;

  return (
    checkExpiryDate(expiryDate) &&
    idPattern.test(savedID) &&
    savedID != null &&
    savedToken != null
  );
}

export function logOut(): void {
  clearLocalStorage();
}
const TOKEN_KEY = "backoffice_access_token";

export function getBackOfficeToken() {
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function setBackOfficeToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearBackOfficeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

const STORAGE_KEY = "tcs-user";

export const loginUser = (userData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};

export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isLoggedIn = () => {
  return !!localStorage.getItem(STORAGE_KEY);
};
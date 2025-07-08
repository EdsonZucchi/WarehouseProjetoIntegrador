const TOKEN_KEY = 'auth_token';
const USER = 'user';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};


export const setUser = (user) => {
  localStorage.setItem(USER, JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"))
};

export const removeUser = () => {
  localStorage.removeItem(USER);
};

export const formatDate = (dataISO) => {
  if (!dataISO) return '';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
} 

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  
  const pad = num => num.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); 
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

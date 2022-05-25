import { getCookie, setCookie } from './cookie';

export const getAuthToken = () => {
  return getCookie('token')
}

export const getRefreshToken = () => {
  return localStorage.getItem('token');
}

export const saveTokens = (authToken, refreshToken) => {
  if (authToken.indexOf('Bearer') === 0) {
    authToken = authToken.split('Bearer ')[1];
  }
  setCookie('token', authToken, { expires: 20 * 60 });
  localStorage.setItem('token', refreshToken);
}

export const clearTokens = () => {
  setCookie('token', null, { expires: -1 });
  localStorage.removeItem('token');
}
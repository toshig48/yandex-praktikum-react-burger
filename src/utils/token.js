import { getCookie, setCookie } from './cookie';

export const GetAuthToken = () => {
  return getCookie('token')
}

export const GetRefreshToken = () => {
  return localStorage.getItem('token');
}

export const SaveTokens = (authToken, refreshToken) => {
  if (authToken.indexOf('Bearer') === 0) {
    authToken = authToken.split('Bearer ')[1];
  }
  setCookie('token', authToken, { expires: 20 * 60 });
  localStorage.setItem('token', refreshToken);
}

export const ClearTokens = () => {
  setCookie('token', null, { expires: -1 });
  localStorage.removeItem('token');
}
import { registerUser, loginUser, logoutUser, getInfoUser, setInfoUser } from '../../utils/burger-api';
import { getRefreshToken, saveTokens, clearTokens, getAuthToken } from '../../utils/token';
import { userLoginLoading, userLoginReceived, userLogoutLoading, userLogoutReceived, userInfoLoading, userInfoReceived, userError } from '../slices';

export const fetchRegisterUser = (name: string, email: string, password: string) => async (dispatch: any) => {
  dispatch(userLoginLoading());
  await registerUser(name, email, password)
    .then((data) => {
      dispatch(userLoginReceived(data.user));
      saveTokens(data.accessToken, data.refreshToken);
    })
    .catch((ex) => {
      dispatch(userError(ex.message));
      console.error(ex);
    });
}

export const fetchLoginUser = (email: string, password: string) => async (dispatch: any) => {
  dispatch(userLoginLoading());
  await loginUser(email, password)
    .then((data) => {
      dispatch(userLoginReceived(data.user));
      saveTokens(data.accessToken, data.refreshToken);
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(userError(ex.message));
    });
}

export const fetchLogoutUser = () => async (dispatch: any) => {
  dispatch(userLogoutLoading());
  await logoutUser(getRefreshToken())
    .then(() => {
      dispatch(userLogoutReceived());
      clearTokens();
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(userError(ex.message));
    });
}

export const fetchGetInfoUser = () => async (dispatch: any) => {
  dispatch(userInfoLoading());
  await getInfoUser(getAuthToken())
    .then((data) => {
      dispatch(userInfoReceived(data.user));
    })
    .catch((ex) => {      
      console.error(ex);  
      dispatch(userError(ex.message)); 
    });
}

export const fetchSetInfoUser = (name: string, email: string, password: string) => async (dispatch: any) => {
  dispatch(userInfoLoading());
  await setInfoUser(getAuthToken(), name, email, password)
    .then((data) => {
      dispatch(userInfoReceived(data.user));
    })
    .catch((ex) => {   
      console.error(ex);  
      dispatch(userError(ex.message));      
    });
}
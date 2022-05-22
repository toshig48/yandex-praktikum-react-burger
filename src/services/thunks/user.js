import { registerUser, loginUser, logoutUser, getInfoUser, setInfoUser } from '../../utils/burger-api';
import { GetAuthToken, GetRefreshToken, SaveTokens, ClearTokens } from '../../utils/token';
import { userLoginLoading, userLoginReceived, userLogoutLoading, userLogoutReceived, userInfoLoading, userInfoReceived, userError } from '../slices';

export const fetchRegisterUser = (name, email, password) => async (dispatch) => {  
  dispatch(userLoginLoading());
  await registerUser(name, email, password)
    .then((data) => {
      dispatch(userLoginReceived(data.user));
      SaveTokens(data.accessToken, data.refreshToken);
    })
    .catch((ex) => {
      dispatch(userError(ex.message));
      console.error(ex);
    });
}

export const fetchLoginUser = (email, password) => async (dispatch) => {  
  dispatch(userLoginLoading());
  await loginUser(email, password)
    .then((data) => {
      dispatch(userLoginReceived(data.user));
      SaveTokens(data.accessToken, data.refreshToken);
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(userError(ex.message));      
    });
}

export const fetchLogoutUser = () => async (dispatch) => {  
  dispatch(userLogoutLoading());
  await logoutUser(GetRefreshToken())
    .then(() => {
      dispatch(userLogoutReceived());
      ClearTokens();
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(userError(ex.message));      
    });
}

export const fetchGetInfoUser = () => async (dispatch) => {  
  dispatch(userInfoLoading());
  await getInfoUser(GetAuthToken())
    .then((data) => {
      dispatch(userInfoReceived(data.user));
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(userError(ex.message));      
    });
}

export const fetchSetInfoUser = (name, email, password) => async (dispatch) => {  
  dispatch(userInfoLoading());
  await setInfoUser(GetAuthToken(), name, email, password)
    .then((data) => {
      dispatch(userInfoReceived(data.user));
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(userError(ex.message));      
    });
}
import { tokenUser } from '../../utils/burger-api';
import { SaveTokens } from '../../utils/token';
import { userLoginByToken, tokenLoading, tokenReceived, tokenError } from '../slices';

export const fetchTokenUser = (refreshToken) => async (dispatch) => {  
  dispatch(tokenLoading());
  await tokenUser(refreshToken)
    .then((data) => {
      dispatch(tokenReceived());
      SaveTokens(data.accessToken, data.refreshToken);
      dispatch(userLoginByToken());
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(tokenError(ex.message));      
    });
}
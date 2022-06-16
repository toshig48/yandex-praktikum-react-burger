import { tokenUser } from '../../utils/burger-api';
import { saveTokens, clearTokens } from '../../utils/token';
import { userLoginByToken, tokenLoading, tokenReceived, tokenError } from '../slices';

export const fetchTokenUser = (refreshToken: string) => async (dispatch: any) => {
  dispatch(tokenLoading());
  await tokenUser(refreshToken)
    .then((data) => {
      dispatch(tokenReceived());
      saveTokens(data.accessToken, data.refreshToken);
      dispatch(userLoginByToken());
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(tokenError(ex.message));
      clearTokens();
    });
}


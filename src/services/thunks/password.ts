import { forgotPasswordUser, resetPasswordUser } from '../../utils/burger-api';
import { passwordLoading, forgotPasswordReceived, resetPasswordReceived, passwordError } from '../slices';

export const fetchForgotPasswordUser = (email: string) => async (dispatch: any) => {
  dispatch(passwordLoading());
  await forgotPasswordUser(email)
    .then(() => {
      dispatch(forgotPasswordReceived());
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(passwordError(ex.message));
    });
}

export const fetchResetPasswordUser = (password: string, code: string) => async (dispatch: any) => {
  dispatch(passwordLoading());
  await resetPasswordUser(password, code)
    .then(() => {
      dispatch(resetPasswordReceived());
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(passwordError(ex.message));
    });
}
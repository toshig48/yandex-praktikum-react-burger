import { forgotPasswordUser, resetPasswordUser } from '../../utils/burger-api';
import { passwordLoading, forgotPasswordReceived, resetPasswordReceived, passwordError } from '../slices';

export const fetchForgotPasswordUser = (email) => async (dispatch) => {  
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

export const fetchResetPasswordUser = (password, token) => async (dispatch) => {  
  dispatch(passwordLoading());
  await resetPasswordUser(password, token)
    .then(() => {
      dispatch(resetPasswordReceived());
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(passwordError(ex.message));      
    });
}
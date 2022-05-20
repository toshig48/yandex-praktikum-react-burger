import { registerUser } from '../../utils/burger-api';
import { userLoading, userReceived, userError } from '../slices';

export const fetchRegisterUser = (name, email, password) => async (dispatch) => {  
  dispatch(userLoading());
  await registerUser(name, email, password)
    .then((data) => {
      dispatch(userReceived(data.user));
    })
    .catch((ex) => {
      dispatch(userError(ex.message));
      console.error(ex);
    });
}
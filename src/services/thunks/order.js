import { createOrder } from '../../utils/burger-api';
import { orderLoading, orderReceived, orderError, clearIngredients } from '../slices';
import { getAuthToken } from '../../utils/token';

export const fetchCreateOrder = (ingredients) => async (dispatch) => {
  dispatch(orderLoading());
  await createOrder(getAuthToken(), ingredients)
    .then((data) => {
      dispatch(orderReceived(data));
    })
    .then(() => {
      dispatch(clearIngredients());
    })
    .catch((ex) => {
      dispatch(orderError(ex.message));
      console.error(ex);
    });
}
import { createOrder } from '../../utils/burger-api';
import { orderLoading, orderReceived, orderError } from '../slices';

export const fetchCreateOrder = (ingredients) => async (dispatch) => {
  dispatch(orderLoading());
  await createOrder(ingredients)
    .then((data) => {
      dispatch(orderReceived(data));
    })
    .catch((ex) => {
      dispatch(orderError(ex.message));
      console.error(ex);
    });
}
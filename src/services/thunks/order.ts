import { createOrder } from '../../utils/burger-api';
import { orderLoading, orderReceived, orderError, clearIngredients } from '../slices';
import { getAuthToken } from '../../utils/token';

export const fetchCreateOrder = (ingredientIds: Array<string>) => async (dispatch: any) => {
  dispatch(orderLoading());
  await createOrder(getAuthToken(), ingredientIds)
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
import { createOrder } from '../utils/burger-api';
import { orderLoading, orderReceived, orderError, clearIngredients } from '../slices';
import { getAuthToken } from '../utils/token';
import { AppDispatch, AppThunk } from '../types';

export const fetchCreateOrder = (ingredientIds: Array<string>): AppThunk => async (dispatch: AppDispatch) => {
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
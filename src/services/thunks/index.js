import { getIngredientsData, createOrder } from '../../utils/burger-api';
import { allIngredientsLoading, allIngredientsReceived, allIngredientsError, orderLoading, orderReceived, orderError } from '../slices';

export const fetchAllIngredients = () => async (dispatch) => {
  dispatch(allIngredientsLoading());
  await getIngredientsData()
    .then((data) => {
      dispatch(allIngredientsReceived(data));
    })
    .catch((ex) => {
      dispatch(allIngredientsError(ex.message));
      console.error(ex);
    });
}

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
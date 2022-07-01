import { getIngredientsData } from '../utils/burger-api';
import { allIngredientsLoading, allIngredientsReceived, allIngredientsError } from '../slices';
import { AppDispatch, AppThunk } from '../types';

export const fetchAllIngredients = (): AppThunk => async (dispatch: AppDispatch) => {
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

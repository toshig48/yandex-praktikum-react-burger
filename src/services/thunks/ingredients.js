import { getIngredientsData } from '../../utils/burger-api';
import { allIngredientsLoading, allIngredientsReceived, allIngredientsError } from '../slices';

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

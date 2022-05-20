import { combineReducers } from 'redux';
import { allIngredientsReducer, selectedIngredientsReducer, curentIngredientReducer, orderReducer, modalReducer, userReducer } from '../slices'


export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  curentIngredient: curentIngredientReducer,
  order: orderReducer,
  modal: modalReducer,
  user: userReducer
});
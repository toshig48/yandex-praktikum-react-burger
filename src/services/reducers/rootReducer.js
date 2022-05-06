import { combineReducers } from 'redux';
import { allIngredientsReducer, selectedIngredientsReducer, curentIngredientReducer, orderReducer, totalPriceReducer, modalReducer } from '../slices'

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  curentIngredient: curentIngredientReducer,
  order: orderReducer,
  totalPrice: totalPriceReducer,
  modal: modalReducer,
});
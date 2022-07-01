import { combineReducers } from 'redux';
import {
  allIngredientsReducer, selectedIngredientsReducer, curentIngredientReducer,
  orderReducer, modalReducer, userReducer, passwordReducer, tokenReducer, wsUserOrdersReducer, wsAllOrdersReducer
} from '../slices'

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  curentIngredient: curentIngredientReducer,
  order: orderReducer,
  modal: modalReducer,
  user: userReducer,
  password: passwordReducer,
  token: tokenReducer,
  wsUserOrders: wsUserOrdersReducer,
  wsAllOrders: wsAllOrdersReducer
});
// Cписок всех полученных ингредиентов:
import {allIngredientsReducer, allIngredientsLoading, allIngredientsReceived, allIngredientsError} from './all-ingredients';
// Cписок всех ингредиентов в текущем конструкторе бургера:
import {selectedIngredientsReducer, addIngredient, removeIngredient, moveIngredient} from './selected-ingredients';
// Объект текущего просматриваемого ингредиента:
import {curentIngredientReducer, setCurentIngredient, unSetCurentIngredient} from './curent-ingredients';
// Объект созданного заказа:
import {orderReducer, orderLoading, orderReceived, orderError} from './order';
// Объект модального окна:
import {modalReducer, showModal, closeModal} from './modal';
// Объект модального окна:
import {userReducer, userLoading, userReceived, userError} from './user';

export { allIngredientsReducer, selectedIngredientsReducer, curentIngredientReducer, orderReducer, modalReducer, userReducer}
export { allIngredientsLoading, allIngredientsReceived, allIngredientsError, 
         addIngredient, removeIngredient, moveIngredient,
         setCurentIngredient, unSetCurentIngredient,
         orderLoading, orderReceived, orderError,
         showModal, closeModal,
         userLoading, userReceived, userError };
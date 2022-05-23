// Cписок всех полученных ингредиентов:
import {allIngredientsReducer, allIngredientsLoading, allIngredientsReceived, allIngredientsError} from './all-ingredients';
// Cписок всех ингредиентов в текущем конструкторе бургера:
import {selectedIngredientsReducer, addIngredient, removeIngredient, moveIngredient} from './selected-ingredients';
// Объект текущего просматриваемого ингредиента:
import {curentIngredientReducer, setCurentIngredient, unSetCurentIngredient, setFlagClear} from './curent-ingredients';
// Объект созданного заказа:
import {orderReducer, orderLoading, orderReceived, orderError} from './order';
// Объект модального окна:
import {modalReducer, showModal, closeModal} from './modal';
// Объект пользователя:
import {userReducer, userLoginLoading, userLoginReceived, userLoginByToken, userLogoutLoading,  
        userLogoutReceived, userInfoLoading, userInfoReceived, userError, userClearError} from './user';
// Объект восстановаления/сброса пароля:
import {passwordReducer, passwordLoading, forgotPasswordReceived, resetPasswordReceived, passwordError, passwordClearError} from './password';
// Объект токена:
import {tokenReducer, tokenLoading, tokenReceived, tokenError} from './token';

export { allIngredientsReducer, selectedIngredientsReducer, curentIngredientReducer, 
         orderReducer, modalReducer, userReducer, passwordReducer, tokenReducer }
export { allIngredientsLoading, allIngredientsReceived, allIngredientsError, 
         addIngredient, removeIngredient, moveIngredient,
         setCurentIngredient, unSetCurentIngredient, setFlagClear,
         orderLoading, orderReceived, orderError,
         showModal, closeModal,
         userLoginLoading, userLoginReceived, userLoginByToken, userLogoutLoading, userLogoutReceived, userInfoLoading, userInfoReceived, userError, userClearError,
         passwordLoading, forgotPasswordReceived, resetPasswordReceived, passwordError, passwordClearError,
         tokenLoading, tokenReceived, tokenError };
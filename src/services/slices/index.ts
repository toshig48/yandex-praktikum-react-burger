// Cписок всех полученных ингредиентов:
import { allIngredientsReducer, allIngredientsLoading, allIngredientsReceived, allIngredientsError } from './all-ingredients';
// Cписок всех ингредиентов в текущем конструкторе бургера:
import { selectedIngredientsReducer, addIngredient, removeIngredient, moveIngredient, clearIngredients } from './selected-ingredients';
// Объект текущего просматриваемого ингредиента:
import { curentIngredientReducer, setCurentIngredient, unSetCurentIngredient, setFlagClear } from './curent-ingredients';
// Объект созданного заказа:
import { orderReducer, orderLoading, orderReceived, orderError } from './order';
// Объект модального окна:
import { modalReducer, showModal, closeModal } from './modal';
// Объект пользователя:
import {
        userReducer, userLoginLoading, userLoginReceived, userLoginByToken, userLogoutLoading,
        userLogoutReceived, userInfoLoading, userInfoReceived, userError, userClear
} from './user';
// Объект восстановаления/сброса пароля:
import { passwordReducer, passwordLoading, forgotPasswordReceived, resetPasswordReceived, passwordError, passwordClearError } from './password';
// Объект токена:
import { tokenReducer, tokenLoading, tokenReceived, tokenError } from './token';

// web-socket:
import { wsUserOrdersReducer, wsUserOrdersInit, wsUserOrdersConnectionSuccess, wsUserOrdersConnectionError, wsUserOrdersConnectionClosed, onUserOrdersMessage } from './ws-user-orders';
import { wsAllOrdersReducer, wsAllOrdersInit, wsAllOrdersConnectionSuccess, wsAllOrdersConnectionError, wsAllOrdersConnectionClosed, onAllOrdersMessage } from './ws-all-orders';


export {
        allIngredientsReducer, selectedIngredientsReducer, curentIngredientReducer,
        orderReducer, modalReducer, userReducer, passwordReducer, tokenReducer, wsUserOrdersReducer, wsAllOrdersReducer
}
export {
        allIngredientsLoading, allIngredientsReceived, allIngredientsError,
        addIngredient, removeIngredient, moveIngredient, clearIngredients,
        setCurentIngredient, unSetCurentIngredient, setFlagClear,
        orderLoading, orderReceived, orderError,
        showModal, closeModal,
        userLoginLoading, userLoginReceived, userLoginByToken, userLogoutLoading, userLogoutReceived, userInfoLoading, userInfoReceived, userError, userClear,
        passwordLoading, forgotPasswordReceived, resetPasswordReceived, passwordError, passwordClearError,
        tokenLoading, tokenReceived, tokenError,
        wsUserOrdersInit, wsUserOrdersConnectionSuccess, wsUserOrdersConnectionError, wsUserOrdersConnectionClosed, onUserOrdersMessage,
        wsAllOrdersInit, wsAllOrdersConnectionSuccess, wsAllOrdersConnectionError, wsAllOrdersConnectionClosed, onAllOrdersMessage
};
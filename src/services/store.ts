import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers/root-reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import { URL_WS } from './utils/config';
import {
  wsUserOrdersInit, wsUserOrdersConnectionSuccess, wsUserOrdersConnectionError, wsUserOrdersConnectionClosed, onUserOrdersMessage,
  wsAllOrdersInit, wsAllOrdersConnectionSuccess, wsAllOrdersConnectionClosed, wsAllOrdersConnectionError, onAllOrdersMessage
} from './slices';
import { TWSAction } from './types';

const wsUserOrdersActions: TWSAction = {
  wsInit: wsUserOrdersInit.type,
  onOpen: wsUserOrdersConnectionSuccess.type,
  onClose: wsUserOrdersConnectionClosed.type,
  onError: wsUserOrdersConnectionError.type,
  onMessage: onUserOrdersMessage.type
};

const wsAllOrdersActions: TWSAction = {
  wsInit: wsAllOrdersInit.type,
  onOpen: wsAllOrdersConnectionSuccess.type,
  onClose: wsAllOrdersConnectionClosed.type,
  onError: wsAllOrdersConnectionError.type,
  onMessage: onAllOrdersMessage.type
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, socketMiddleware(URL_WS, wsUserOrdersActions), socketMiddleware(URL_WS, wsAllOrdersActions)],
  devTools: process.env.NODE_ENV !== 'production',
})

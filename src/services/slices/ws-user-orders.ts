import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TWebSocketState, TWSOrders } from "../types";
import { SliceNames } from '../constant'
import { getDateStringForOrdersList } from '../utils/func';

const webSocketInitialState: TWebSocketState = {
  isConnected: false,
  error: '',
  orders: null
};

const webSocketUserOrdersSlice = createSlice({
  name: SliceNames.WS,
  initialState: webSocketInitialState,
  reducers: {
    wsUserOrdersInit: (state: TWebSocketState) => {
      state.isConnected = false;
      state.error = '';
    },

    wsUserOrdersConnectionSuccess: (state: TWebSocketState) => {
      state.isConnected = true;
      state.error = '';
    },

    wsUserOrdersConnectionError: (state: TWebSocketState, action: PayloadAction<string>) => {
      state.isConnected = false;
      state.error = action.payload;
      state.orders = null;
    },

    wsUserOrdersConnectionClosed: (state: TWebSocketState) => {
      state.isConnected = false;
      state.error = '';
      state.orders = null;
    },

    onUserOrdersMessage: (state: TWebSocketState, action: PayloadAction<TWSOrders>) => {
      action.payload.orders.forEach(item => {
        item.createdAt = new Date(item.createdAt);
        item.updatedAt = new Date(item.updatedAt);
        item.dateBeautifulString = getDateStringForOrdersList(item.createdAt);
      });
      action.payload.orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      state.orders = action.payload;
    },
  }
})

export const { wsUserOrdersInit, wsUserOrdersConnectionSuccess, wsUserOrdersConnectionError, wsUserOrdersConnectionClosed, onUserOrdersMessage } = webSocketUserOrdersSlice.actions;
export const wsUserOrdersReducer = webSocketUserOrdersSlice.reducer;

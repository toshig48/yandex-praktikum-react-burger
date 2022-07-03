import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TWebSocketState, TWSOrders } from "../types";
import { SliceNames } from '../constant'
import { getDateStringForOrdersList } from '../utils/func';

const webSocketInitialState: TWebSocketState = {
  isConnected: false,
  error: '',
  orders: null
};

const webSocketAllOrdersSlice = createSlice({
  name: SliceNames.WS,
  initialState: webSocketInitialState,
  reducers: {
    wsAllOrdersInit: (state: TWebSocketState) => {
      state.isConnected = false;
      state.error = '';
    },

    wsAllOrdersConnectionSuccess: (state: TWebSocketState) => {
      state.isConnected = true;
      state.error = '';
    },

    wsAllOrdersConnectionError: (state: TWebSocketState, action: PayloadAction<string>) => {
      state.isConnected = false;
      state.error = action.payload;
      state.orders = null;
    },

    wsAllOrdersConnectionClosed: (state: TWebSocketState) => {
      state.isConnected = false;
      state.error = '';
      state.orders = null;
    },

    onAllOrdersMessage: (state: TWebSocketState, action: PayloadAction<TWSOrders>) => {
      action.payload.orders.forEach(item => {
        item.createdAt = new Date(item.createdAt);
        item.updatedAt = new Date(item.updatedAt);
        item.dateBeautifulString = getDateStringForOrdersList(item.createdAt);
      });
      state.orders = action.payload;
    },
  }
})

export const { wsAllOrdersInit, wsAllOrdersConnectionSuccess, wsAllOrdersConnectionError, wsAllOrdersConnectionClosed, onAllOrdersMessage } = webSocketAllOrdersSlice.actions;
export const wsAllOrdersReducer = webSocketAllOrdersSlice.reducer;

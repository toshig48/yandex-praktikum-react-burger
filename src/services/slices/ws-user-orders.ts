import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TWebSocketState, TWSOrders } from "../types";
import { SliceNames } from '../constant'

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
    },

    wsUserOrdersConnectionClosed: (state: TWebSocketState) => {
      state.isConnected = false;
      state.error = '';
    },

    onUserOrdersMessage: (state: TWebSocketState, action: PayloadAction<TWSOrders>) => {
      state.orders = action.payload;
    },
  }
})

export const { wsUserOrdersInit, wsUserOrdersConnectionSuccess, wsUserOrdersConnectionError, wsUserOrdersConnectionClosed, onUserOrdersMessage } = webSocketUserOrdersSlice.actions;
export const wsUserOrdersReducer = webSocketUserOrdersSlice.reducer;

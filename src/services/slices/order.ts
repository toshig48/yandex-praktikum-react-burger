import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrderState } from "../types";
import { SliceNames } from '../constant'

const orderInitialState: TOrderState = {
  loading: false,
  order: null,
  error: ''
};

const orderSlice = createSlice({
  name: SliceNames.ORDER,
  initialState: orderInitialState,
  reducers: {
    orderLoading: (state: TOrderState) => {
      state.loading = true;
      state.order = null;
      state.error = '';
    },

    orderReceived: (state: TOrderState, action: PayloadAction<TOrder>) => {
      state.loading = false;
      state.order = action.payload;
      state.error = '';
    },

    orderError: (state: TOrderState, action: PayloadAction<string>) => {
      state.loading = false;
      state.order = null;
      state.error = action.payload;
    },
  }
})
export const { orderLoading, orderReceived, orderError } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
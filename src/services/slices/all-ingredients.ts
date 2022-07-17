import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBurger, TAllIngredientsState } from "../types";
import { SliceNames } from '../constant'

const allIngredientsInitialState: TAllIngredientsState = {
  items: [],
  loading: false,
  error: ''
};

const allIngredientsSlice = createSlice({
  name: SliceNames.ALL_INGREDIENTS,
  initialState: allIngredientsInitialState,
  reducers: {
    allIngredientsLoading: (state: TAllIngredientsState) => {
      state.loading = true;
      state.items = [];
      state.error = '';
    },

    allIngredientsReceived: (state: TAllIngredientsState, action: PayloadAction<Array<TBurger>>) => {
      state.loading = false;
      state.items = action.payload;
      state.error = '';
    },

    allIngredientsError: (state: TAllIngredientsState, action: PayloadAction<string>) => {
      state.loading = false;
      state.items = [];
      state.error = action.payload;
    },
  }
})
export const { allIngredientsLoading, allIngredientsReceived, allIngredientsError } = allIngredientsSlice.actions;
export const allIngredientsReducer = allIngredientsSlice.reducer;
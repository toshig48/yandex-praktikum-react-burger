import { createSlice } from '@reduxjs/toolkit';

const allIngredientsInitialState = {
  loading: false,
  items: [],
  error: ''
};

const allIngredientsSlice = createSlice({
  name: 'allIngredients',
  initialState: allIngredientsInitialState,
  reducers: {
    allIngredientsLoading: (state) => {
      state.loading = true;
      state.items = [];
      state.error = '';
    },

    allIngredientsReceived: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = '';
    },

    allIngredientsError: (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.payload;
    },
  }
})
export const { allIngredientsLoading, allIngredientsReceived, allIngredientsError } = allIngredientsSlice.actions;
export const allIngredientsReducer = allIngredientsSlice.reducer;
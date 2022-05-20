import { createSlice } from '@reduxjs/toolkit';

const curentIngredientSlice = createSlice({
  name: 'curentIngredient',
  initialState: [],
  reducers: {
    setCurentIngredient: (state, action) => action.payload,
    unSetCurentIngredient: (state) => []
  }
})

export const { setCurentIngredient, unSetCurentIngredient } = curentIngredientSlice.actions;
export const curentIngredientReducer = curentIngredientSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const curentIngredientInitialState = {
  flagClear: false,
  item: null
};

const curentIngredientSlice = createSlice({
  name: 'curentIngredient',
  initialState: curentIngredientInitialState,
  reducers: {
    setCurentIngredient: (state, action) => {
      state.item = action.payload;
    },
    setFlagClear: (state) => {
      state.flagClear = true;
    },
    unSetCurentIngredient: (state) => curentIngredientInitialState
  }
})

export const { setCurentIngredient, unSetCurentIngredient, setFlagClear } = curentIngredientSlice.actions;
export const curentIngredientReducer = curentIngredientSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBurger, TCurentIngredientState } from "../types";
import { SliceNames } from '../constant'

const curentIngredientInitialState: TCurentIngredientState = {
  flagClear: false,
  item: null
};

const curentIngredientSlice = createSlice({
  name: SliceNames.CURENT_INGREDIENT,
  initialState: curentIngredientInitialState,
  reducers: {
    setCurentIngredient: (state: TCurentIngredientState, action: PayloadAction<TBurger>) => {
      state.item = action.payload;
    },
    setFlagClear: (state: TCurentIngredientState) => {
      state.flagClear = true;
    },
    unSetCurentIngredient: (state: TCurentIngredientState) => curentIngredientInitialState
  }
})

export const { setCurentIngredient, unSetCurentIngredient, setFlagClear } = curentIngredientSlice.actions;
export const curentIngredientReducer = curentIngredientSlice.reducer;
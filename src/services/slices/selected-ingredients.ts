import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INGREDIENT_BUN } from "../utils/config";
import { TBurger, TMoveIngredient, TSelectedIngredientsState } from "../types";
import { SliceNames } from '../constant'

const selectedIngredientsInitialState: TSelectedIngredientsState = {
  items: []
};

// Cписок всех ингредиентов в текущем конструкторе бургера:
const selectedIngredientsSlice = createSlice({
  name: SliceNames.SELECTED_INGREDIENTS,
  initialState: selectedIngredientsInitialState,
  reducers: {
    addIngredient: (state: TSelectedIngredientsState, action: PayloadAction<TBurger>) => {
      state.items = action.payload.type !== INGREDIENT_BUN.key ?
        ([...state.items.filter(x => x.type !== INGREDIENT_BUN.key), action.payload, ...state.items.filter(x => x.type === INGREDIENT_BUN.key)]) :
        ([...state.items.filter(x => x.type !== INGREDIENT_BUN.key), action.payload, action.payload]);
    },
    removeIngredient: (state: TSelectedIngredientsState, action: PayloadAction<number>) => {
      state.items = [...state.items.filter(x => x !== state.items[action.payload])];
    },
    moveIngredient: (state: TSelectedIngredientsState, action: PayloadAction<TMoveIngredient>) => {
      const data = JSON.parse(JSON.stringify(state.items));
      let { dragIndex, hoverIndex } = action.payload;
      if (dragIndex > hoverIndex) {
        const buf = dragIndex;
        dragIndex = hoverIndex;
        hoverIndex = buf;
      }
      data.splice(dragIndex, 2, data[hoverIndex], data[dragIndex]);
      state.items = data;
    },
    clearIngredients: () => selectedIngredientsInitialState,
  }
})

export const { addIngredient, removeIngredient, moveIngredient, clearIngredients } = selectedIngredientsSlice.actions;
export const selectedIngredientsReducer = selectedIngredientsSlice.reducer;

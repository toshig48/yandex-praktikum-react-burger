import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENT_BUN } from "../../utils/config.js";

// Cписок всех ингредиентов в текущем конструкторе бургера:
const selectedIngredientsInitialState = {
  items: []
};

const selectedIngredientsSlice = createSlice({
  name: 'selectedIngredients',
  initialState: selectedIngredientsInitialState,
  reducers: {
    addIngredient: (state, action) => {
      state.items = action.payload.type !== INGREDIENT_BUN.key ?
        ([...state.items.filter(x => x.type !== INGREDIENT_BUN.key), action.payload, ...state.items.filter(x => x.type === INGREDIENT_BUN.key)]) :
        ([...state.items.filter(x => x.type !== INGREDIENT_BUN.key), action.payload, action.payload]);
    },
    removeIngredient: (state, action) => {
      state.items = [...state.items.filter(x => x !== state.items[action.payload])];
    },
    moveIngredient: (state, action) => {
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
  }
})

export const { addIngredient, removeIngredient, moveIngredient } = selectedIngredientsSlice.actions;
export const selectedIngredientsReducer = selectedIngredientsSlice.reducer;

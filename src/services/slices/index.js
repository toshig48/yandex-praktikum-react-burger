import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENT_BUN } from "../../utils/config.js";

// Cписок всех полученных ингредиентов:
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

// Объект текущего просматриваемого ингредиента:
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

// Объект созданного заказа:
const orderInitialState = {
  loading: false,
  order: [],
  error: ''
};

const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    orderLoading: (state) => {
      state.loading = true;
      state.order = [];
      state.error = '';
    },

    orderReceived: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = '';
    },

    orderError: (state, action) => {
      state.loading = false;
      state.order = [];
      state.error = action.payload;
    },
  }
})
export const { orderLoading, orderReceived, orderError } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;

// Объект полной цены:
const totalPriceSlice = createSlice({
  name: 'totalPrice',
  initialState: 0,
  reducers: {
    setTotalPrice: (state, action) => action.payload,
    unSetTotalPrice: (state) => 0,
  }
})

export const { setTotalPrice, unSetTotalPrice } = totalPriceSlice.actions;
export const totalPriceReducer = totalPriceSlice.reducer;

// Объект модального окна:
const modalInitialState = {
  isShowModal: false,
  titleModal: '',
  contentModal: null
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: modalInitialState,
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = true;
      state.titleModal = action.payload.title;
      state.contentModal = action.payload.content;
    },
    closeModal: (state) => {
      state.isShowModal = false;
      state.titleModal = '';
      state.contentModal = null;
    },
  }
})

export const { showModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
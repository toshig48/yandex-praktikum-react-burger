import { createSlice } from '@reduxjs/toolkit';

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

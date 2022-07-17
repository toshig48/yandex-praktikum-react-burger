import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TModalState, TShowModal } from "../types";
import { SliceNames } from '../constant'

const modalInitialState: TModalState = {
  isShowModal: false,
  isNavigateGoBack: false,
  titleModal: '',
  contentModal: null
};

const modalSlice = createSlice({
  name: SliceNames.MODAL,
  initialState: modalInitialState,
  reducers: {
    showModal: (state: TModalState, action: PayloadAction<TShowModal>) => {
      state.isShowModal = true;
      state.titleModal = action.payload.title;
      state.contentModal = action.payload.content;
      state.isNavigateGoBack = action.payload.isNavigateGoBack;
    },
    closeModal: () => modalInitialState,
  }
})

export const { showModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

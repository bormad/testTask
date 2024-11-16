import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalType: null, // Тип модального окна: 'createProject', 'editProject', 'editTask'
  id: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.id = action.payload.id || null;
    },
    closeModal(state) {
      state.isOpen = false;
      state.modalType = null;
      state.id = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

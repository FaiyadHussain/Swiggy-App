// Reducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CartItems: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.CartItems.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.CartItems.splice(action.payload, 1);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;

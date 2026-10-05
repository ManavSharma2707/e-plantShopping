import { createSlice } from '@reduxjs/toolkit';

// Each item in the cart has the shape: { name, image, cost, quantity }
// "cost" is stored as a NUMBER (e.g. 15) so calculations are safe.
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // addItem: payload is { name, image, cost }.
    // If a plant with this name is already in the cart, increase its quantity by 1;
    // otherwise add it as a new item with quantity 1.
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // removeItem: payload is the plant name (string).
    // Filters the matching item out of the cart.
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    // updateQuantity: payload is { name, quantity }.
    // Sets the quantity of the matching item. If the new quantity is less than 1,
    // the item is removed from the cart instead.
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      if (quantity < 1) {
        state.items = state.items.filter((item) => item.name !== name);
        return;
      }
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

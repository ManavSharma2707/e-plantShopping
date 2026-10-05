import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './CartSlice';

// Central Redux store; the cart slice is mounted at state.cart
const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});

export default store;

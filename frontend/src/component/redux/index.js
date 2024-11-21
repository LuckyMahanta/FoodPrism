import { configureStore } from '@reduxjs/toolkit';
import UserSliceReducer from './UserSlice';
import ProductSlideReducer from './ProductSlide';
import { saveState, loadState, saveCartState, loadCartState } from '../utility/SessionStorage';

const persistedState = loadState();
const persistedCartState = loadCartState();

export const store = configureStore({
  reducer: {
    user: UserSliceReducer,
    product: ProductSlideReducer,
  },
  preloadedState: {
    user: persistedState || {}, 
    product: {
      cartItem: persistedCartState ? persistedCartState.cartItem : [], 
      productList: [], 
    },
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveState(state.user); 
  saveCartState({ cartItem: state.product.cartItem }); 
});

export default store;

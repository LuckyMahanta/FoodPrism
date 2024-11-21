import { CLEAR_CART } from '../cart/CartActions'

const initialState = {
  cartItem: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return {
        ...state,
        cartItem: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
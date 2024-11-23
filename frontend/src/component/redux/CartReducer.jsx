import { CLEAR_CART, DELETE_CART_ITEM, INCREASE_QTY, DECREASE_QTY } from './CartActions';

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
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter(item => item.id !== action.payload.id),
      };
    case INCREASE_QTY:
      return {
        ...state,
        cartItem: state.cartItem.map(item => 
          item.id === action.payload.id 
            ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price }
            : item
        ),
      };
    case DECREASE_QTY:
      return {
        ...state,
        cartItem: state.cartItem.map(item => 
          item.id === action.payload.id && item.qty > 1
            ? { ...item, qty: item.qty - 1, total: (item.qty - 1) * item.price }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
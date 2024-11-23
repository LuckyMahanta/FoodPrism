// export const CLEAR_CART = 'CLEAR_CART';
// export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
// export const INCREASE_QTY = 'INCREASE_QTY';
// export const DECREASE_QTY = 'DECREASE_QTY';

// export const clearCart = () => ({
//   type: CLEAR_CART
// });

// export const deleteCartItem = (id) => ({
//   type: DELETE_CART_ITEM,
//   payload: { id } 
// });

// export const increaseQty = (id) => ({
//   type: INCREASE_QTY,
//   payload: { id }
// });

// export const decreaseQty = (id) => ({
//   type: DECREASE_QTY,
//   payload: { id }
// });

// // cartReducer.js
// const initialState = {
//   cartItem: [],
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CLEAR_CART:
//       return {
//         ...state,
//         cartItem: [],
//       };
//     case DELETE_CART_ITEM:
//       return {
//         ...state,
//         cartItem: state.cartItem.filter(item => item._id !== action.payload.id), 
//       };
//     case INCREASE_QTY:
//       return {
//         ...state,
//         cartItem: state.cartItem.map(item => 
//           item._id === action.payload.id 
//             ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * Number(item.price) }
//             : item
//         ),
//       };
//     case DECREASE_QTY:
//       return {
//         ...state,
//         cartItem: state.cartItem.map(item => 
//           item._id === action.payload.id && item.qty > 1 
//             ? { ...item, qty: item.qty - 1, total: (item.qty - 1) * Number(item.price) }
//             : item
//         ),
//       };
//     default:
//       return state;
//   }
// };
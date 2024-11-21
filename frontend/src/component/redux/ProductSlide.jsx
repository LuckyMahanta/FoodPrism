import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

const initialState = {
    productList: [],
    cartItem: []
}

export const productSlide = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = [...action.payload]
        },
        addCartItem: (state, action) => {

            const existingItem = state.cartItem.find((item) => item._id === action.payload._id);

            if (existingItem) {
                const updatedCartItem = state.cartItem.map(item =>
                    item._id === action.payload._id ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price } : item
                );
                state.cartItem = updatedCartItem;
                toast.success("Quantity updated in cart.");
            } else {
                const total = action.payload.price
                state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, total: total }]
                toast.success("Item successfully added to cart!");
            }

        },
        deleteCartItem: (state, action) => {
            const index = state.cartItem.findIndex((item) => item._id === action.payload.id);

            if (index !== -1) {
                state.cartItem.splice(index, 1);
                toast.success("Item deleted from cart.");
            } else {
                toast.error("Item not found in cart.");
            }
        },
        increaseQty: (state, action) => {
            const index = state.cartItem.findIndex((item) => item._id === action.payload.id);

            if (index !== -1) {
                state.cartItem[index].qty += 1;
                state.cartItem[index].total = state.cartItem[index].qty * state.cartItem[index].price;
            }
        },
        decreaseQty: (state, action) => {
            const index = state.cartItem.findIndex((item) => item._id === action.payload.id);
            if (index !== -1 && state.cartItem[index].qty > 1) {
                state.cartItem[index].qty -= 1;
                state.cartItem[index].total = state.cartItem[index].qty * state.cartItem[index].price;
            } else if (index !== -1 && state.cartItem[index].qty === 1) {
                state.cartItem = state.cartItem.filter(item => item._id !== action.payload.id);
                toast.success("Item deleted from cart.");
            }
        },
        clearCart: (state) => {
            state.cartItem = [];
        }
    }
})

export const { setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty, clearCart } = productSlide.actions

export default productSlide.reducer
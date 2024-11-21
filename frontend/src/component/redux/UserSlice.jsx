import { createSlice } from '@reduxjs/toolkit';
import { clearState } from '../utility/SessionStorage';

const initialState = {
    email: '',
    firstName: '',
    image: '',
    lastName: '',
    _id: '',
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            state._id = action.payload.data._id
            state.firstName = action.payload.data.firstName
            state.lastName = action.payload.data.lastName
            state.email = action.payload.data.email
            state.image = action.payload.data.image
        },

        logoutRedux: (state, action) => {
            state._id =""
            state.firstName = ""
            state.lastName = ""
            state.email = ""
            state.image = ""
            clearState();
            state = initialState;
        }
    }
})

export const { loginRedux, logoutRedux } = UserSlice.actions

export default UserSlice.reducer;
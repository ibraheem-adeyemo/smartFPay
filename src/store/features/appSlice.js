import { createSlice } from "@reduxjs/toolkit";
import { pageLinks } from "../../constants/pageLinks";

const initialState = {
    currentPage: pageLinks.dashboard,
    currentPageTitle: 'Dashboard'
}

const appSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id!== action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if(index!== -1) {
                state.users[index] = action.payload;
            }
        }
    }
})

export const { addUser, removeUser, updateUser } = appSlice.actions;
export default appSlice.reducer
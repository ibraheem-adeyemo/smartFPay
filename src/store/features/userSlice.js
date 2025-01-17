import { createSlice, current } from "@reduxjs/toolkit";
import { dummy } from "../dummy";

const initialState = {
    users: dummy.users,
    queriedUser: dummy.queriedUser,
    errorMsg: null
}

const userSlice = createSlice({
    name: 'users',
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
        },
        searchUser: (state, action) => {
            state.users = state.users.filter(user => user.id === action.pay);
        },
        resetQueriedUsers: (state, action) => {
            state.queriedUser = initialState.queriedUser;
        },
        searchUserAccount: (state, action) => {
            const aUser = state.users.filter(user => {
                return user.accountDetails.accountNumber === action.payload.accountNumber.toString();
            })[0]
            if (aUser) {
                state.queriedUser = aUser
            } else {
                state.errorMsg = 'User not found'
            }
        },
       
        updateQueriedUser: (state, action) => {
            state.queriedUser = action.payload;
        },
        clearErrorMsg: (state, action) => {
            state.errorMsg = null;
        }
    }
})

export const { addUser, removeUser, updateUser, searchUser, searchUserAccount, resetQueriedUsers, clearErrorMsg } = userSlice.actions;
export default userSlice.reducer
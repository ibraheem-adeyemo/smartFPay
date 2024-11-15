import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import tableReducer from './features/tableSlice'

export const store = configureStore({
    reducer: {
        userReducer: userReducer,
        tableReducer: tableReducer
    },
})
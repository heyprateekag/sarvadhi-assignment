import {configureStore} from "@reduxjs/toolkit";
import LoginSlice from "./loginSlice";

const ReduxStore = configureStore({
    reducer: {
        login: LoginSlice.reducer,
    }
});

export const loginActions = LoginSlice.actions;

export default ReduxStore;
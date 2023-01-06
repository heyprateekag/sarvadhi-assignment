import {configureStore} from "@reduxjs/toolkit";
import LoginSlice from "./loginSlice";
import UserSlice from "./userSlice";

const ReduxStore = configureStore({
    reducer: {
        login: LoginSlice.reducer,
        user: UserSlice.reducer
    }
});

export const loginActions = LoginSlice.actions;
export const userActions = UserSlice.actions;

export default ReduxStore;
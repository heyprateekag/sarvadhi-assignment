import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name: 'loginSlice',
    initialState: {
        isLoggedIn: false,
        username: ''
    },
    reducers: {
        login: function(state){
            //loginDetails will be in action.payload
            state.isLoggedIn = true;
        },
        setName: function(state, action){
            state.username = action.payload;
        },
        logout: function(state){
                state.isLoggedIn = false;
                state.username = '';
        }
    }
});

export default LoginSlice;
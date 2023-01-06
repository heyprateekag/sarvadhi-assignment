import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'userSlice',
    initialState: {
        email: '',
        name: ''
    },
    reducers: {
        setUsername: function(state, action){
            state.name = action.payload
        },
        setUser: function(state, action){
            state.email = action.payload.email;
            state.name = action.payload.name;
        }
    }
});

export default UserSlice;
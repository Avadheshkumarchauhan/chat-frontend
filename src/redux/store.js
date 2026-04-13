import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../redux/Slices/authSlice"
import userReducer from "../redux/Slices/userSlice"
import messageReducer from "../redux/Slices/messageSlice"

const store =configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        message:messageReducer

    },
    devTools:true

});

export default store
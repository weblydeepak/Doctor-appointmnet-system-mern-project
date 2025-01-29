import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducer/userReducer";



const store = configureStore({
    reducer: {
    user:userReducer,
    }
})

export default store;
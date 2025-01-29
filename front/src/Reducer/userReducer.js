import { createReducer } from "@reduxjs/toolkit"


const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
    loading: false,
    error: null,
};
export const userReducer = createReducer(initialState,(builder)=>{
    
    builder
  
    .addCase("RegisterRequest", (state) => {
        state.loading = true;
    })
    .addCase("RegisterSuccess", (state, action) => {
        state.loading = false;
        state.user = action.payload; // Save user data if needed
    })
    .addCase("RegisterFailure", (state, action) => {
        state.loading = false; // Fix typo
        state.error = action.payload;
    })

    .addCase("LoginRequest",(state)=>{
    state.loading= true; 
    })
    .addCase("LoginSuccess", (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload; 
    })
    .addCase("LoginFailure",(state,action)=>{
        state.loading= false;
        state.error=action.payload;
        state.isAuthenticated=false;
    })

    .addCase("LoadUserRequest", (state) => {
        state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
    })
    .addCase("LoadUserFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null; 
        state.isAuthenticated = false;
    })
    .addCase("notificationRequest", (state) => {
        state.loading = true;
    })
    .addCase("notificationSuccess", (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    })
    .addCase("notificationFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null; 
        state.isAuthenticated = false;
    })

    // .addCase("ApplyDocRequest", (state) => {
    //     state.loading = true;
    // })
    // .addCase("ApplyDocSuccess", (state, action) => {
    //     state.loading = false;
    //     state.user = action.payload;
    // })
    // .addCase("ApplyDocFailure", (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    // })



    .addCase("LogoutRequest",(state)=>{
        state.loading= true;
    })
    .addCase("LogoutSuccess",(state)=>{
        state.loading= false;
        state.isAuthenticated=false;
        state.user=null;
    })
    .addCase("LogoutFailure",(state,action)=>{
        state.loading= false;
        state.error=action.payload;
        state.isAuthenticated=false;
    })

})

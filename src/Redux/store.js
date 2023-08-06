import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./contact";




const store = configureStore({
    reducer: contactReducer,
})
 


export default store;

import { configureStore } from "@reduxjs/toolkit";
import setupReducer from '../slices/setupSlice'

export default configureStore({
    reducer: {
        setup: setupReducer,
    }
})
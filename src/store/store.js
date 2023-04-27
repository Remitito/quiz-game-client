import { configureStore } from "@reduxjs/toolkit";
import gameReducer from '../slices/gameSlice'
import setupReducer from '../slices/setupSlice'

export default configureStore({
    reducer: {
        game: gameReducer,
        setup: setupReducer,
    }
})
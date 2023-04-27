import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        currentScreen: 'setup'
    },
    reducers: {
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload
        }
    }
})

export const {setCurrentScreen} = gameSlice.actions
export default gameSlice.reducer
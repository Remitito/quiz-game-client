import { createSlice } from "@reduxjs/toolkit";

export const setupSlice = createSlice({
    name: 'setup',
    initialState: {
        teams: 4,
        squares: 30,
        goodEvil: "all"
    },
    reducers: {
        setTeamsAction: (state, action) => {
            state.teams = action.payload
        },
        setSquaresAction: (state, action) => {
            state.squares = action.payload
        },
        setGoodEvilAction: (state, action) => {
            state.goodEvil = action.payload
        }
    }
})

export const {setTeamsAction, setSquaresAction, setGoodEvilAction} = setupSlice.actions
export default setupSlice.reducer
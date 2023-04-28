import { createSlice } from "@reduxjs/toolkit";

export const setupSlice = createSlice({
    name: 'setup',
    initialState: {
        teams: 4,
        squares: 40,
        powerups: "all"
    },
    reducers: {
        setTeamsAction: (state, action) => {
            state.teams = action.payload
        },
        setSquaresAction: (state, action) => {
            state.squares = action.payload
        },
        setPowerupsAction: (state, action) => {
            state.powerups = action.payload
        }
    }
})

export const {setTeamsAction, setSquaresAction, setPowerupsAction} = setupSlice.actions
export default setupSlice.reducer
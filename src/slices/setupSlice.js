import { createSlice } from "@reduxjs/toolkit";

export const setupSlice = createSlice({
    name: 'setup',
    initialState: {
        teams: 4,
        questions: [],
        good: [],
        evil: [],
        squareValues: [], // says if the square is good/evil/question
        squares: 30,
        goodEvil: "both"
    },
    reducers: {
        setSquareValues: (state, action) => {
            state.squareValues = action.payload
        },
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

export const {setTeamsAction, setSquaresAction, setGoodEvilAction, setSquareValues} = setupSlice.actions
export default setupSlice.reducer
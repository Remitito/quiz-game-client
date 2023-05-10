import { createSlice } from "@reduxjs/toolkit";

export const setupSlice = createSlice({
    name: 'setup',
    initialState: {
        bonusSquares: true,
        teams: 4,
        squareValues: [], // says if the square is bonus/special
        squares: 30,
        specialSquares: true,
    },
    reducers: {
        setBonusSquares: (state, action) => { // on or off
            state.bonusSquares = action.payload
        },
        setSpecialSquares: (state, action) => { // on or off
            state.specialSquares = action.payload
        },
        setSquareValues: (state, action) => {
            state.squareValues = action.payload
        },
        setTeamsAction: (state, action) => {
            state.teams = action.payload
        },
        setSquaresAction: (state, action) => {
            state.squares = action.payload
        },
    }
})

export const {setTeamsAction, setSquaresAction, setBonusSquares, setSquareValues, setSpecialSquares} = setupSlice.actions
export default setupSlice.reducer
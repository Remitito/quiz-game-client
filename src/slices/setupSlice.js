import { createSlice } from "@reduxjs/toolkit";

export const setupSlice = createSlice({
    name: 'setup',
    initialState: {
        bonusSquares: true,
        teams: 4,
        questions: [],
        good: [],
        evil: [],
        squareValues: [], // says if the square is bonus/special
        squares: 30,
        specialQuestions: true,
    },
    reducers: {
        setBonusSquares: (state, action) => {
            state.bonusSquares = action.payload
        },
        setSpecialQuestions: (state, action) => {
            state.specialQuestions = action.payload
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

export const {setTeamsAction, setSquaresAction, setBonusSquares, setSquareValues, setSpecialQuestions} = setupSlice.actions
export default setupSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

export const setupSlice = createSlice({
    name: 'setup',
    initialState: {
        bonusSquares: true,
        questions: [ // type, question, answer(s)
            ["normal", "1 + 1", 2],
            ["normal", "1 + 2", 3],
            ["normal", "1 + 3", 4],
            ["normal", "1 + 4", 5],
            ["normal", "1 + 5", 6],
            ["normal", "1 + 6", 7],
            ["normal", "1 + 7", 8],
            ["normal", "1 + 8", 9],
            ["normal", "1 + 9", 10],
            ["normal", "1 + 10", 11],
            ["normal", "1 + 11", 12],
            ["normal", "1 + 12", 13],
            ["normal", "1 + 13", 14],
            ["normal", "1 + 14", 15]
        ], // type, question, answer(s)
        squareValues: [], // is the square a bonus or question
        squares: 30,
        teams: 4
    },
    reducers: {
        setBonusSquares: (state, action) => { // on or off
            state.bonusSquares = action.payload
        },
        setQuestions: (state, action) => {
            state.questions = action.payload
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

export const {setTeamsAction, setSquaresAction, setBonusSquares, setSquareValues} = setupSlice.actions
export default setupSlice.reducer
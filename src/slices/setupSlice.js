import { createSlice } from "@reduxjs/toolkit";

export const setupSlice = createSlice({
    name: 'setup',
    initialState: {
        bonusSquares: true,
        questions: [], 
        squareValues: [], // is the square a bonus or question
        squares: 30,
        numOfTeams: 4
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
        setNumOfTeams: (state, action) => {
            state.teams = action.payload
        },
        setSquares: (state, action) => {
            state.squares = action.payload
        },
    }
})

export const {setNumOfTeams, setSquares, setQuestions, setBonusSquares, setSquareValues} = setupSlice.actions
export default setupSlice.reducer
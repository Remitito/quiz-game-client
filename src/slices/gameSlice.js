import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        currentScreen: 'finish',
        currentSquare: ['none', 0], // e.g. bonus, #4
        currentTeam: 1,
        teamScores: [20, 0, 0, 20]
    },
    reducers: {
        setTeamScore: (state, action) => {
            state.teamScores[action.payload.team] = action.payload.amount 
        },
        resetAllScores: (state, action) => {
            state.teamOneScore = 0
            state.teamTwoScore = 0
            state.teamThreeScore = 0
            state.teamFourScore = 0
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload
        },
        setCurrentSquare: (state, action) => {
            state.currentSquare = action.payload
        },
        setCurrentTeam: (state, action) => {
            state.currentTeam = action.payload
        }
    }
})

export const {setTeamScore, resetAllScores, setCurrentScreen, setCurrentSquare, setCurrentTeam} = gameSlice.actions
export default gameSlice.reducer
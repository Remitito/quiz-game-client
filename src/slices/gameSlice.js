import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        currentScreen: 'searchOfficial',
        currentSquare: ['none', 0], // e.g. bonus, #4
        currentTeam: 1,
        showScores: false,
        teamScores: [0, 0, 0, 0]
    },
    reducers: {
        setTeamScore: (state, action) => {
            state.teamScores[action.payload.team] = action.payload.amount 
        },
        resetAllScores: (state, action) => {
            state.teamScores = [0,0,0,0]
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload
        },
        setCurrentSquare: (state, action) => {
            state.currentSquare = action.payload
        },
        setCurrentTeam: (state, action) => {
            state.currentTeam = action.payload
        },
        showHideScores: (state) => {
            state.showScores = !state.showScores
        }
    }
})

export const {setTeamScore, resetAllScores, setCurrentScreen, setCurrentSquare, setCurrentTeam, showHideScores} = gameSlice.actions
export default gameSlice.reducer
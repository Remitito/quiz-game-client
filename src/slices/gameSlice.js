import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        currentScreen: 'setup',
        currentSquare: ['none', 0], // e.g. bonus, #4
        currentTeam: 1,
        teamOneScore: 0,
        teamTwoScore: 0,
        teamThreeScore: 0,
        teamFourScore: 0,
    },
    reducers: {
        setTeamOneScore: (state, action) => {
            state.teamOneScore = action.payload
        },
        setTeamTwoScore: (state, action) => {
            state.teamTwoScore = action.payload
        },
        setTeamThreeScore: (state, action) => {
            state.teamThreeScore = action.payload
        },
        setTeamFourScore: (state, action) => {
            state.teamFourScore = action.payload
        },
        resetScores: (state, action) => {
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

export const { setTeamOneScore, setTeamTwoScore, setTeamThreeScore, setTeamFourScore, resetScores, setCurrentScreen, setCurrentSquare, setCurrentTeam} = gameSlice.actions
export default gameSlice.reducer
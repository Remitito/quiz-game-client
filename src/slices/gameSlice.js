import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        currentScreen: 'setup',
        currentSquare: 'none', // shows type of square to load
        currentTeam: 1,
        teamOneScore: 0,
        teamTwoScore: 0,
        teamThreeScore: 0,
        teamFourScore: 0,
    },
    reducers: {
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload
        },
        setCurrentSquare: (state, action) => {
            state.currentSquare = action.payload
        },
        setCurrentTeam: (state, action) => {
            state.currentTeam = action.payload
        },
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
        }
    }
})

export const {setCurrentScreen, setCurrentSquare, setCurrentTeam, setTeamOneScore, setTeamTwoScore, setTeamThreeScore, setTeamFourScore} = gameSlice.actions
export default gameSlice.reducer
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
            if(state.teamOneScore += action.payload > 0) {
                state.teamOneScore += action.payload
            }
            {
                state.teamOneScore = 0
            }
        },
        setTeamTwoScore: (state, action) => {
            if(state.teamTwoScore += action.payload > 0) {
                state.teamTwoScore += action.payload
            }
            {
                state.teamTwoScore = 0
            }        },
        setTeamThreeScore: (state, action) => {
            if(state.teamThreeScore += action.payload > 0) {
                state.teamThreeScore += action.payload
            }
            {
                state.teamThreeScore = 0
            }        },
        setTeamFourScore: (state, action) => {
            if(state.teamFourScore += action.payload > 0) {
                state.teamFourScore += action.payload
            }
            {
                state.teamFourScore = 0
            }        }
    }
})

export const {setCurrentScreen, setCurrentSquare, setCurrentTeam, setTeamOneScore, setTeamTwoScore, setTeamThreeScore, setTeamFourScore} = gameSlice.actions
export default gameSlice.reducer
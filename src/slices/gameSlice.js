import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        currentScreen: 'setup',
        teamOneScore: 0,
        teamTwoScore: 0,
        teamThreeScore: 0,
        teamFourScore: 0
    },
    reducers: {
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload
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

export const {setCurrentScreen, setScore} = gameSlice.actions
export default gameSlice.reducer
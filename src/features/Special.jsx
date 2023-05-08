import { useDispatch, useSelector } from "react-redux"
import { setTeamOneScore } from "../slices/gameSlice"
import { setTeamTwoScore } from "../slices/gameSlice"
import { setTeamThreeScore } from "../slices/gameSlice"
import { setTeamFourScore } from "../slices/gameSlice"


const currentTeam = useSelector((state) => state.game.currentTeam)
const dispatch = useDispatch()

export const addFiftyPoints = () => {
    const actions = [setTeamOneScore(50), setTeamTwoScore(50), setTeamThreeScore(50), setTeamFourScore(50)]
    dispatch(setTeamOneScore(50))
}


import { useDispatch } from "react-redux"
import { addSubtractOneScore, addSubtractTwoScore, addSubtractThreeScore, addSubtractFourScore } from "../../slices/gameSlice"
import { resetScores } from "../../slices/gameSlice"
import { FaSkull} from "react-icons/fa";

export const ResetScores = ({finishTurn}) => {
    const dispatch = useDispatch()

    const confirmReset = () => {
        dispatch(resetScores())
        finishTurn()
    }

    return (
        <div className="bonusSubCont">
            <label className='bonusTitle'>Reset Scores to Zero</label>
            <FaSkull className='bonusIcon'/>
            <button className="okayButton" onClick={() => confirmReset()}>Reset</button>
        </div>
    )
}
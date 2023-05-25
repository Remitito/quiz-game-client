import { useDispatch, useSelector } from "react-redux"
import { setTeamScore } from "../../slices/gameSlice"
import { FaSkull} from "react-icons/fa";

export const ResetAllScores = ({finishTurn}) => {
    const dispatch = useDispatch()
    const teams = useSelector((state) => state.setup.teams)

    const confirmReset = () => {
        for(let i = 0; i < teams; i++) {
            dispatch(setTeamScore({team: i, amount: 0}))    
        }
        finishTurn()
    }

    return (
        <div className="bonusSubCont">
            <label className='bonusTitle'>Reset All Scores to Zero</label>
            <FaSkull className='bonusIcon'/>
            <button className="okayButton" onClick={() => confirmReset()}>Reset</button>
        </div>
    )
}
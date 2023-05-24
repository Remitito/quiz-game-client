import { TbRepeatOnce } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setCurrentScreen, setCurrentSquare } from "../../slices/gameSlice";

export const PickAgain = () => {
    const dispatch = useDispatch()

    const backToGrid = () => {
        dispatch(setCurrentSquare(["none", 0]))
        dispatch(setCurrentScreen("grid"))
    }

    return (
        <div className="bonusSubCont">
            <label className='bonusTitle'>Pick Again!</label>
            <TbRepeatOnce className='bonusIcon' style={{color: "#E40C2B"}}/>
            <button className="okayButton" onClick={() => backToGrid()}>Pick Again</button>
        </div>
    )
}
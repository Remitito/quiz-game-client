import { GiPlayerNext } from "react-icons/gi";

export const SkipTurn = ({finishTurn}) => {
    return (
        <div className="bonusSubCont">
            <label className='bonusTitle'>Skip a Turn</label>
            <GiPlayerNext className='bonusIcon' style={{color: "#E40C2B"}}/>
            <button className="okayButton" onClick={() => finishTurn()}>Skip Turn</button>
        </div>
    )
}
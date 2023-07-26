import { GiPlayerNext } from "react-icons/gi";
import { useEffect } from "react";
import sorrySound from '../../assets/audios/sorry.mp3'

export const SkipTurn = ({finishTurn}) => {

    return (
        <div className="bonusSubCont">
            <label className='bonusTitle'>Skip a Turn</label>
            <GiPlayerNext style={{color: "#E40C2B", fontSize: "15rem"}}/>
            <button className="okayButton" onClick={() => finishTurn()}>Skip Turn</button>
        </div>
    )
}
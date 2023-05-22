import { Question } from "./Question";
import { Bonus } from "./Bonus";

export const Testing = () => {
    return (
        <div>
            <Bonus bonusNumber={1}/>
            <div className="bonusSubCont">
            <label className='bonusTitle'>Switch Scores</label>
                <label className='statusMessage'>{statusMessage}</label>
                <button className="okayButton" onClick={() => finishTurn()}>Do it!</button>
        </div>
        </div>
    )
}
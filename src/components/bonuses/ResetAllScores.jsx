import { useDispatch, useSelector } from "react-redux"
import { setTeamScore } from "../../slices/gameSlice"
import {useEffect} from 'react'
import { FaSkull} from "react-icons/fa";
import laughSound from '../../assets/audios/laugh.mp3'

export const ResetAllScores = ({finishTurn}) => {
    const dispatch = useDispatch()
    const teams = useSelector((state) => state.setup.teams)

    useEffect(() => {
        const audio = new Audio(laughSound);
        audio.preload = 'auto';

        return () => {
            audio.pause()
            audio.src = ''
        }
      }, []);

    const playSound = () => {
        const audio = new Audio(laughSound);
        audio.play();
    };

    const confirmReset = () => {
        for(let i = 0; i < teams; i++) {
            dispatch(setTeamScore({team: i, amount: 0}))    
        }
        playSound()
        setTimeout(() => {
            finishTurn()
        }, 1500)
    }

    return (
        <div className="bonusSubCont">
            <label className='bonusTitle'>Reset All Scores to Zero</label>
            <FaSkull className='scaleIcon'/>
            <button className="okayButton" onClick={() => confirmReset()}>Reset</button>
        </div>
    )
}
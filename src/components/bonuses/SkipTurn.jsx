import { GiPlayerNext } from "react-icons/gi";
import { useEffect } from "react";
import sorrySound from '../../assets/audios/sorry.mp3'

export const SkipTurn = ({finishTurn}) => {
    
    useEffect(() => {
        const audio = new Audio(sorrySound);
        audio.preload = 'auto';

        return () => {
            audio.pause()
            audio.src = ''
        }
      }, []);

    const playSound = () => {
        const audio = new Audio(sorrySound);
        audio.play();
    };

    const confirmSkip = () => {
        playSound()
        setTimeout(() => {
            finishTurn()
        }, 1500)
    }

    return (
        <div className="bonusSubCont">
            <label className='bonusTitle'>Skip a Turn</label>
            <GiPlayerNext style={{color: "#E40C2B", fontSize: "15rem"}}/>
            <button className="okayButton" onClick={() => confirmSkip()}>Skip Turn</button>
        </div>
    )
}
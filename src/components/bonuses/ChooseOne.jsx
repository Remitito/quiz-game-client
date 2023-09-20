import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react";
import { setTeamScore } from "../../slices/gameSlice"
import { GiPresent } from "react-icons/gi";
import './bonusStylesheets/ChooseOne.css'

export const ChooseOne = ({finishTurn, wrongSound, correctSound}) => {
    const dispatch = useDispatch()
    const currentTeam = useSelector((state) => state.game.currentTeam)
    const teamScores = useSelector((state) => state.game.teamScores);
    const [boxContents, setBoxContents] = useState([0, 50, -50])
    const [points, setPoints] = useState(0)
    const [pointsMessage, setPointsMessage] = useState("");
    const soundRef = useRef(null);

    const playSound = (sound) => {
      const audio = soundRef.current;
      audio.src = sound;
      audio.play();
    };

    useEffect(() => {
        const shuffledArray = [...boxContents]
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
          }
          setBoxContents(shuffledArray)
            }, [])

    const handleClick = (index) => {
        setPoints(boxContents[index])
        setPointsMessage(boxContents[index] + ' Points!')
        if(boxContents[index] > 0) {
            playSound(correctSound)
        }
        else {
            playSound(wrongSound)
        }
        setTimeout(() => {
            const newPointTotal = teamScores[currentTeam - 1] + boxContents[index]
            dispatch(setTeamScore({ team: currentTeam - 1, amount: newPointTotal}));
            finishTurn()
        }, 1000)
    }

    return (
        <div className="bonusSubCont">
            <audio ref={soundRef} />
                {pointsMessage.length === 0 ?
                    <div>
                        <label className='bonusTitle'>Choose One</label>
                        <label className="chooseOneMobile">Choose One</label>
                        <div className="boxCont">
                            <GiPresent onClick={() => handleClick(0)} style={{color: "red"}} className='giftIcon'/>
                            <GiPresent onClick={() => handleClick(1)} style={{color: "blue"}} className='giftIcon'/>
                            <GiPresent onClick={() => handleClick(2)} style={{color: "green"}} className='giftIcon'/>
                        </div>
                    </div>
                        :
                        <div>
                            {points === 50 ?
                            <label style={{color: '#438945'}} className="pointsMessage">{pointsMessage}</label>
                                    :
                            <label style={{color: '#E40C2B'}} className="pointsMessage">{pointsMessage}</label>
                            }
                        </div>
                    }
        </div>
    )
}
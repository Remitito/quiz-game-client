import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { setTeamScore } from '../../slices/gameSlice';
import { FaGift } from "react-icons/fa";
import './bonusStylesheets/RockPaperScissors.css'
import winnerSound from '../../assets/audios/correct.mp3';

export const RockPaperScissors = ({image, points, finishTurn, teamColors}) => {
    const dispatch = useDispatch()
    const teams = useSelector((state) => state.setup.teams)
    let currentTeam = useSelector((state) => state.game.currentTeam)
    const teamScores = useSelector((state) => state.game.teamScores)

    useEffect(() => {
        const audio = new Audio(winnerSound);
        audio.preload = 'auto';

        return () => {
            audio.pause()
            audio.src = ''
        }
      }, []);
    
    const playSound = (sound) => {
        const audio = new Audio(winnerSound);
        audio.play();
    };

    const showTeamOptions = () => {
        let teamElements = []
        for(let i = 0; i < teams; i ++) { // add teams
            teamElements.push(
                <div className="bonusTeamOption" key={i + 1} style={{backgroundColor: teamColors[i]}}
                onClick={() => handleTeamClick(i + 1)}>
                    <label className='teamName'>Team {i + 1}</label>
                    <br/>
                </div>
            )
        }
        return teamElements
    }

    const handleTeamClick = (selectedTeam) => { 
        const selectedTeamNewTotal = teamScores[selectedTeam - 1] + points
        dispatch(setTeamScore({team: selectedTeam - 1, amount: selectedTeamNewTotal}))
        playSound(winnerSound)
        setTimeout(() => {
        }, 1500)
        finishTurn();
    }

    return (
        <div className='bonusSubCont'>
            <label className='bonusTitle'>Play Rock Paper Scissors for {points} points!</label>
            <p className='statusMessage'>Choose a team to play against then select the winner</p>
            <p className='statusMessageMobile'>Choose a team to play Rock Paper Scissors against then select the winner</p>
            <img className='rpsGif' src={image} alt="RPS"/>
            <div className='teamDiv'>
                {showTeamOptions()}
            </div>
        </div>
    )
}
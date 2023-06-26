import { useDispatch, useSelector } from 'react-redux'
import { setTeamScore } from '../../slices/gameSlice';
import { FaGift } from "react-icons/fa";
import './bonusStylesheets/RockPaperScissors.css'

export const RockPaperScissors = ({image, points, finishTurn, teamColors}) => {
    const dispatch = useDispatch()
    const teams = useSelector((state) => state.setup.teams)
    let currentTeam = useSelector((state) => state.game.currentTeam)
    const teamScores = useSelector((state) => state.game.teamScores)

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
        finishTurn()
    }

    return (
        <>
            <label className='bonusTitle'>Play Rock Paper Scissors for {points} points!</label>
            <p className='statusMessage'>Choose a team to play against then set the winner below</p>
            <img className='rpsGif' src={image} alt="RPS"/>
            <div className='teamDiv'>
                {showTeamOptions()}
            </div>
        </>
    )
}
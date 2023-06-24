import { useDispatch, useSelector } from 'react-redux'
import { setTeamScore } from '../../slices/gameSlice';
import { FaGift } from "react-icons/fa";
import { BsMagnetFill } from "react-icons/bs";

export const GiveTakePoints = ({points, finishTurn, teamColors}) => {
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
        // remove current team from selection
        let toRemove = 0
        for(let i = 0; i < teams; i++) {
            if(teamElements[i].key == currentTeam) {
                toRemove = i
            }
        }
        teamElements.splice(toRemove, 1)
        return teamElements
    }

    const handleTeamClick = (selectedTeam) => { 
        const currentTeamNewTotal = teamScores[currentTeam - 1] - points
        const selectedTeamNewTotal = teamScores[selectedTeam - 1] + points
        dispatch(setTeamScore({team: currentTeam - 1, amount: currentTeamNewTotal}))
        dispatch(setTeamScore({team: selectedTeam - 1, amount: selectedTeamNewTotal}))
        finishTurn()
    }

    return (
        <>
            <>
                {points > 0 ?
                    <>
                        <h4 className='bonusTitle'>Give {points} Points to another team</h4>
                        <FaGift className='bonusIcon' style={{color: "#438945"}}/>
                    </>
                :
                    <>
                        <h4 className='bonusTitle'>Take {points} Points from another team</h4>
                        <BsMagnetFill className='bonusIcon' style={{color: "#E40C2B"}}/>
                    </>
                }
            </>
            <div className='bonusTeamsCont'>
                {showTeamOptions()}
            </div>
        </>
    )
}
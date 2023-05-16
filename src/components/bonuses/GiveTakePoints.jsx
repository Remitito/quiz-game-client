import { useDispatch, useSelector } from 'react-redux'
import { FaGift } from "react-icons/fa";
import { BsMagnetFill } from "react-icons/bs";

export const GiveTakePoints = ({points, finishTurn, updateTeamScore}) => {
    const teams = useSelector((state) => state.setup.teams)
    let currentTeam = useSelector((state) => state.game.currentTeam)
    const teamColors = ["#3CBCC3","#EBA63F", "#438945", "#E40C2B"] 

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

    const handleTeamClick = (team) => {
        updateTeamScore(team - 1, points) // -1 to reflect function array indexes | 50 points added
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
import { useDispatch, useSelector } from 'react-redux'

export const GiveTakePoints = ({points, finishTurn, updateTeamScore}) => {
    const teams = useSelector((state) => state.setup.teams)
    const teamColors = ["#3CBCC3","#EBA63F", "#438945", "#E40C2B"] 

    const showTeamOptions = () => {
        let teamElements = []
        for(let i = 0; i < teams; i ++) {
            teamElements.push(
                <div className="bonusTeamOption" id={`team${i}`} style={{backgroundColor: teamColors[i]}}
                onClick={() => handleTeamClick(i + 1)}>
                    <label className='teamName'>Team {i + 1}</label>
                    <br/>
                </div>
            )
        }
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
                    <h4 className='bonusTitle'>Give {points} Points to another team</h4>
                    :
                    <h4 className='bonusTitle'>Take {points} Points from another team</h4>
                }
            </>
            <div className='bonusTeamsCont'>
                {showTeamOptions()}
            </div>
        </>
    )
}
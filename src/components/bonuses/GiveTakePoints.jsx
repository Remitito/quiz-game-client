import { useDispatch, useSelector } from 'react-redux'
import { setTeamScore } from '../../slices/gameSlice';
import { FaGift } from "react-icons/fa";
import { BsMagnetFill } from "react-icons/bs";
import { useEffect } from 'react';
import magnetSound from '../../assets/audios/magnet.mp3'

export const TakePoints = ({points, finishTurn, teamColors}) => {
    const dispatch = useDispatch()
    const teams = useSelector((state) => state.setup.teams)
    let currentTeam = useSelector((state) => state.game.currentTeam)
    const teamScores = useSelector((state) => state.game.teamScores)

    // preload audio for smooth playback
    useEffect(() => {
        const audio = new Audio(magnetSound);
        audio.preload = 'auto';

        return () => {
            audio.pause()
            audio.src = ''
        }
      }, []);

    const playSound = () => {
        const audio = new Audio(magnetSound);
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
        // remove current team from selection as they cannot give/take points from themselves
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
        playSound()
        finishTurn()
    }

    return (
        <div className='bonusSubCont'>
                {points > 0 ?
                    <>
                        <h4 className='mobileGiveTake'>Give {points} points to another team</h4>
                        <h4 className='bonusTitle'>Give {points} points to another team</h4>
                        <FaGift className='spinIcon' style={{color: "#438945"}}/>
                    </>
                :
                    <>
                        <h4 className='mobileGiveTake'>Take {points.toString().slice(1)} points from another team</h4>
                        <h4 className='bonusTitle'>Take {points.toString().slice(1)} points from another team</h4>
                        <BsMagnetFill className='spinIcon' style={{color: "#E40C2B"}}/>
                    </>
                }
            <div className='bonusTeamsCont'>
                {showTeamOptions()}
            </div>
        </div>
    )
}
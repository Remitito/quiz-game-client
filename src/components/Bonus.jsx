import '../assets/stylesheets/bonus.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setCurrentScreen, setCurrentSquare, setCurrentTeam} from '../slices/gameSlice'
import { TakePoints } from './bonuses/TakePoints'
import { ResetAllScores } from './bonuses/ResetAllScores'
import { SkipTurn } from './bonuses/SkipTurn'
import { PickAgain } from './bonuses/PickAgain'
import { StopMoving } from './bonuses/StopMoving'
import { SwitchScores } from './bonuses/SwitchPoints'
import { RockPaperScissors } from './bonuses/RockPaperScissors'
import rps from '../assets/images/rps.gif'
import { MysteryBox } from './bonuses/MysteryBox'
import { ChooseOne } from './bonuses/ChooseOne'
import { current } from '@reduxjs/toolkit'
import wrongSound from '../assets/audios/wrong.mp3'
import correctSound from '../assets/audios/correct.mp3'

export const Bonus = ({bonusNumber}) => {
    const dispatch = useDispatch()
    const currentTeam = useSelector((state) => state.game.currentTeam)
    const numOfTeams = useSelector((state) => state.setup.teams)
    const teamColors = ["#3CBCC3","#EBA63F", "#438945", "#E40C2B"] 

    const finishTurn = () => {
        if(currentTeam + 1 > numOfTeams) {
            dispatch(setCurrentTeam(1))
        }
        else {
            dispatch(setCurrentTeam(currentTeam + 1))
        }
        dispatch(setCurrentSquare(["none", 0]))
        dispatch(setCurrentScreen("grid"))
    }

    const bonusComponents = [
        <TakePoints teamColors={teamColors} points={50} finishTurn={finishTurn} />,
        <TakePoints teamColors={teamColors} points={25} finishTurn={finishTurn} />,
        <TakePoints teamColors={teamColors} points={-50} finishTurn={finishTurn} />,
        <TakePoints teamColors={teamColors} points={-25} finishTurn={finishTurn} />,
        <ResetAllScores finishTurn={finishTurn}/>,
        <ResetAllScores finishTurn={finishTurn}/>,
        <SkipTurn finishTurn={finishTurn}/>,
        <PickAgain/>,
        <SwitchScores currentTeam={currentTeam} finishTurn={finishTurn} numOfTeams={numOfTeams} teamColors={teamColors}/>,
        <SwitchScores currentTeam={currentTeam} finishTurn={finishTurn} numOfTeams={numOfTeams} teamColors={teamColors}/>,
        <MysteryBox correctSound={correctSound} currentTeam={currentTeam} finishTurn={finishTurn} wrongSound={wrongSound}/>,
        <MysteryBox correctSound={correctSound} currentTeam={currentTeam} finishTurn={finishTurn} wrongSound={wrongSound}/>,
        <MysteryBox correctSound={correctSound} currentTeam={currentTeam} finishTurn={finishTurn} wrongSound={wrongSound}/>,
        <MysteryBox correctSound={correctSound} currentTeam={currentTeam} finishTurn={finishTurn} wrongSound={wrongSound}/>,
        <RockPaperScissors image={rps} teamColors={teamColors} points={50} finishTurn={finishTurn}/>,
        <RockPaperScissors image={rps} teamColors={teamColors} points={50} finishTurn={finishTurn}/>,
        <RockPaperScissors image={rps} teamColors={teamColors} points={50} finishTurn={finishTurn}/>,
        <ChooseOne correctSound={correctSound} wrongSound={wrongSound} finishTurn={finishTurn}/>,
        <ChooseOne correctSound={correctSound} wrongSound={wrongSound} finishTurn={finishTurn}/>,
        <ChooseOne correctSound={correctSound} wrongSound={wrongSound} finishTurn={finishTurn}/>,
        <StopMoving finishTurn={finishTurn}/>,
        <StopMoving finishTurn={finishTurn}/>,
        <StopMoving finishTurn={finishTurn}/>
    ]

    return (
        <div className='bonusCont'>
            {bonusComponents[bonusNumber]}
            {/* {bonusComponents[bonusComponents.length - 1]} */}
            {/* {bonusComponents[0]} */}
        </div>
    )
}
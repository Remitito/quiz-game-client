import {Col, Row} from 'antd'
import '../assets/stylesheets/bonus.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentScreen, setCurrentSquare, setCurrentTeam} from '../slices/gameSlice'
import { GiveTakePoints } from './bonuses/GiveTakePoints'
import { ResetScores } from './bonuses/ResetScores'
import { SkipTurn } from './bonuses/SkipTurn'
import { PickAgain } from './bonuses/PickAgain'
import { SwitchScores } from './bonuses/SwitchPoints'

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
        <GiveTakePoints teamColors={teamColors} points={50} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={30} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={10} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={-50} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={-30} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={-10} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={-1} finishTurn={finishTurn} />,
        <ResetScores finishTurn={finishTurn}/>,
        <SkipTurn finishTurn={finishTurn}/>,
        <PickAgain/>,
        <SwitchScores currentTeam={currentTeam} finishTurn={finishTurn} numOfTeams={numOfTeams} teamColors={teamColors}/>
    ]

    return (
        <Row>
            <Col span={5}/>
            <Col className='bonusCont' span={14}>
                {/* {bonusComponents[bonusNumber]} */}
                {bonusComponents[10]}
            </Col>
            <Col span={5}/>
        </Row>
    )
}
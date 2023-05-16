import {Col, Row} from 'antd'
import '../assets/stylesheets/bonus.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentScreen, setCurrentSquare, setCurrentTeam, addSubtractOneScore, addSubtractTwoScore, addSubtractThreeScore, addSubtractFourScore } from '../slices/gameSlice'
import { GiveTakePoints } from './bonuses/GiveTakePoints'
import { ResetScores } from './bonuses/ResetScores'
import { SkipTurn } from './bonuses/SkipTurn'
import { PickAgain } from './bonuses/PickAgain'

export const Bonus = ({bonusNumber}) => {
    const dispatch = useDispatch()
    const currentTeam = useSelector((state) => state.game.currentTeam)
    const numOfTeams = useSelector((state) => state.setup.teams)
    
    const updateTeamScore = (team, amount) => {
        const scoreFunctions = [addSubtractOneScore(amount), addSubtractTwoScore(amount), addSubtractThreeScore(amount), addSubtractFourScore(amount)]
        dispatch(scoreFunctions[team])
    }

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
        <GiveTakePoints points={50} updateTeamScore={updateTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints points={30} updateTeamScore={updateTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints points={10} updateTeamScore={updateTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints points={-50} updateTeamScore={updateTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints points={-30} updateTeamScore={updateTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints points={-10} updateTeamScore={updateTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints points={-1} updateTeamScore={updateTeamScore} finishTurn={finishTurn} />,
        <ResetScores finishTurn={finishTurn}/>,
        <SkipTurn finishTurn={finishTurn}/>,
        <PickAgain/>
    ]

    return (
        <Row>
            <Col span={5}/>
            <Col className='bonusCont' span={14}>
                {/* {bonusComponents[bonusNumber]} */}
                {bonusComponents[9]}
            </Col>
            <Col span={5}/>
        </Row>
    )
}
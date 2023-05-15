import {Col, Row} from 'antd'
import '../assets/stylesheets/bonus.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentScreen, setCurrentSquare, setCurrentTeam, setTeamOneScore, setTeamTwoScore, setTeamThreeScore, setTeamFourScore } from '../slices/gameSlice'
import { GiveTakePoints } from '../features/bonuses/GiveTakePoints'

export const Bonus = ({bonusNumber}) => {
    const dispatch = useDispatch()
    const currentTeam = useSelector((state) => state.game.currentTeam)
    const numOfTeams = useSelector((state) => state.setup.teams)
    
    const updateTeamScore = (team, amount) => {
        const scoreFunctions = [setTeamOneScore(amount), setTeamTwoScore(amount), setTeamThreeScore(amount), setTeamFourScore(amount)]
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
    ]

    return (
        <Row>
            <Col span={5}/>
            <Col className='bonusCont' span={14}>
                {bonusComponents[bonusNumber]}
            </Col>
            <Col span={5}/>
        </Row>
    )
}
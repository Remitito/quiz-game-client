import {Col, Row} from 'antd'
import '../assets/stylesheets/bonus.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentScreen, setCurrentSquare, setCurrentTeam, setTeamOneScore, setTeamTwoScore, setTeamThreeScore, setTeamFourScore } from '../slices/gameSlice'
import { GiveTakePoints } from './bonuses/GiveTakePoints'
import { ResetScores } from './bonuses/ResetScores'
import { SkipTurn } from './bonuses/SkipTurn'
import { PickAgain } from './bonuses/PickAgain'
import { SwitchScores } from './bonuses/SwitchPoints'

export const Bonus = ({bonusNumber}) => {
    const dispatch = useDispatch()
    const teamOneScore = useSelector((state) => state.game.teamOneScore)
    const teamTwoScore = useSelector((state) => state.game.teamTwoScore)
    const teamThreeScore = useSelector((state) => state.game.teamThreeScore)
    const teamFourScore = useSelector((state) => state.game.teamFourScore)
    const currentTeam = useSelector((state) => state.game.currentTeam)
    const numOfTeams = useSelector((state) => state.setup.teams)
    const teamColors = ["#3CBCC3","#EBA63F", "#438945", "#E40C2B"] 
    
    const setTeamScore = (team, amount, plusMinus) => {
        if(plusMinus) {
            if(team === 1) {dispatch(setTeamOneScore(teamOneScore + amount))}
            if(team === 2) {dispatch(setTeamTwoScore(teamTwoScore + amount))}
            if(team === 3) {dispatch(setTeamThreeScore(teamThreeScore + amount))}
            if(team === 4) {dispatch(setTeamFourScore(teamFourScore + amount))}
        }
        else {
            if(team === 1) {dispatch(setTeamOneScore(amount))}
            if(team === 2) {dispatch(setTeamTwoScore(amount))}
            if(team === 3) {dispatch(setTeamThreeScore(amount))}
            if(team === 4) {dispatch(setTeamFourScore(amount))}
        }
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
        <GiveTakePoints teamColors={teamColors} points={50} setTeamScore={setTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={30} setTeamScore={setTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={10} setTeamScore={setTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={-50} setTeamScore={setTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={-30} setTeamScore={setTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={-10} setTeamScore={setTeamScore} finishTurn={finishTurn} />,
        <GiveTakePoints teamColors={teamColors} points={-1} setTeamScore={setTeamScore} finishTurn={finishTurn} />,
        <ResetScores finishTurn={finishTurn}/>,
        <SkipTurn finishTurn={finishTurn}/>,
        <PickAgain/>,
        <SwitchScores currentTeam={currentTeam} finishTurn={finishTurn} numOfTeams={numOfTeams} teamColors={teamColors} setTeamScore={setTeamScore}/>
    ]

    return (
        <Row>
            <Col span={5}/>
            <Col className='bonusCont' span={14}>
                {bonusComponents[bonusNumber]}
                {/* {bonusComponents[10]} */}
            </Col>
            <Col span={5}/>
        </Row>
    )
}
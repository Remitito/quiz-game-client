import { useDispatch, useSelector } from 'react-redux'
import {Col, Row} from 'antd'
import '../assets/stylesheets/question.css'
import { setCurrentTeam, setCurrentScreen, setCurrentSquare } from '../slices/gameSlice'


export const Special = ({question, answer, points}) => {
    const dispatch = useDispatch()
    const currentTeam = useSelector((state) => state.game.currentTeam)
    const numOfTeams = useSelector((state) => state.setup.teams)
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
    return (
        <Row>
            <Col span={5}/>
            <Col className='questionCont' span={14}>
                SPECIAL QUESTION
            </Col>
            <button onClick={() => finishTurn()}>OKAY</button>
            <Col span={5}/>
        </Row>
    )
}
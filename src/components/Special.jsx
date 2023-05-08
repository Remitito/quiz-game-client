import {Col, Row} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSquare, setCurrentTeam } from '../slices/gameSlice'
import '../assets/stylesheets/question.css'

export const Special = () => {
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
        dispatch(setCurrentSquare("none"))
    }

    return (
        <Row>
            <Col span={5}/>
            <Col className='questionCont' span={14}>
                <Row className='sectionRow'>
                    <h4 className='questionTitle'>Special Question</h4>
                    <button className='okayButton' onClick={() => finishTurn()}>
                    OKAY
                    </button>                
                </Row>
            </Col>
            <Col span={5}/>
        </Row>
    )
}
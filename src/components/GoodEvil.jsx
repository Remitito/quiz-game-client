import {Col, Row} from 'antd'
import '../assets/stylesheets/goodEvil.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSquare, setCurrentTeam } from '../slices/gameSlice'

export const GoodEvil = () => {
    const dispatch = useDispatch()
    const currentTeam = useSelector((state) => state.game.currentTeam)
    const goodOrEvil = useSelector((state) => state.game.currentSquare)
    const numOfTeams = useSelector((state) => state.setup.teams)

    const finishTurn = () => {
        if(numOfTeams === currentTeam) {
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
            <Col className='mainContEvil' span={14}>
                <Row className='sectionRow'>
                    <h4 className={`${goodOrEvil}Title`}>Hello</h4>
                    <button className='okayButton' onClick={() => finishTurn()}>
                    OKAY
                    </button>
                </Row>
            </Col>
            <Col span={5}/>
        </Row>
    )
}
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {Col, Row} from 'antd'
import '../assets/stylesheets/question.css'
import { setCurrentTeam, setCurrentScreen, setCurrentSquare } from '../slices/gameSlice'

export const Question = ({questionNumber}) => {
    const [answer, showAnswer] = useState(false)
    const dispatch = useDispatch()
    const currentTeam = useSelector((state) => state.game.currentTeam)
    const numOfTeams = useSelector((state) => state.setup.teams)
    const questions = useSelector((state) => state.setup.questions)

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
                <h4 className='questionTitle'>{questions[questionNumber][1]}</h4>
                {answer ? 
                    <>
                        <h4 className='answer'>{questions[questionNumber][2]}</h4>
                        <button className='showAnswer' 
                        onClick={() => finishTurn()}>RETURN TO GRID</button>
                    </> :
                    <>
                        <button className='showAnswer' 
                        onClick={() => showAnswer(true)}>SHOW ANSWER</button>
                    </>
                }
            </Col>
            <Col span={5}/>
        </Row>
    )
}
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {Col, Row} from 'antd'
import {TiTimes, TiTick} from 'react-icons/ti'
import '../assets/stylesheets/question.css'
import {setTeamScore, setCurrentTeam, setCurrentScreen, setCurrentSquare } from '../slices/gameSlice'
import { BsPatchQuestionFill } from "react-icons/bs";

export const Question = ({questionNumber}) => {
    const [answer, showAnswer] = useState(false)
    const dispatch = useDispatch()
    const currentTeam = useSelector((state) => state.game.currentTeam)
    const numOfTeams = useSelector((state) => state.setup.teams)
    const questions = useSelector((state) => state.setup.questions)
    const teamScores = useSelector((state) => state.game.teamScores)

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

    // just add 50 points per question for now
    const correctAnswer = () => {
        const newPointTotal = teamScores[currentTeam - 1] + 50  
        dispatch(setTeamScore({team: currentTeam - 1, amount: newPointTotal}))
        finishTurn()
    }
    
    return (
        <Row>
            <Col span={5}/>
            <Col className='questionCont' span={14}>
                <label className='questionTitle'>{questions[questionNumber][1]}</label>
                {answer ? 
                    <>
                        <label className='answer'>{questions[questionNumber][2]}</label>
                        <div className='correctWrongCont'>
                            <TiTick className='correctIcon' onClick={() => correctAnswer()}/>
                            <TiTimes className='wrongIcon' onClick={() => finishTurn()}/>
                        </div>
                    </> :
                    <>
                        <BsPatchQuestionFill className='questionIcon'/>
                        <button className='showAnswer' 
                        onClick={() => showAnswer(true)}>SHOW ANSWER</button>
                    </>
                }
            </Col>
            <Col span={5}/>
        </Row>
    )
}
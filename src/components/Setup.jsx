import {Button, Col, ConfigProvider, InputNumber, Radio, Row, Slider} from 'antd'
import {Circle, CircleCont, SetupSquare, SetupSquareCont} from '../assets/styledComponents/NumberShapes'
import '../assets/stylesheets/setup.css'
import {useState} from 'react'
import {RightCircleOutlined, UserOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setNumOfTeams, setSquares, setBonusSquares } from '../slices/setupSlice'
import { assignSquareValues } from './functions/setupFunctions'
import { setCurrentScreen } from '../slices/gameSlice'
import { setSquareValues } from '../slices/setupSlice'
import { Bonus } from './Bonus'
import Toggle from 'react-styled-toggle'
import { current } from '@reduxjs/toolkit'


export const Setup = () => {
    const [numberOfTeams, setNumberOfTeams] = useState(2)
    const [squares, setSquaresLocal] = useState(20)
    const [bonusSquares, setBonusSquaresLocal] = useState(true) 
    const questions = useSelector((state) => state.setup.questions)
    const dispatch = useDispatch()

    const confirm = () => {
        const squareValues = assignSquareValues(squares, bonusSquares, questions.length)
        dispatch(setSquareValues(squareValues))
        dispatch(setNumOfTeams(numberOfTeams))
        dispatch(setSquares(squares))
        dispatch(setBonusSquares(bonusSquares))
        dispatch(setCurrentScreen("grid"))
    }

    return (
        <Row>
            <Col span={4}/>
            <Col className='setupCont' span={16}>
                <Row className='sectionRow'>
                    <h4 className='sectionName' span={7}>Teams</h4>
                    <div className='teamContainer'>
                        <div className={numberOfTeams === 2 ? 'teamOptionSelected' : 'teamOption'}
                        onClick={() => setNumberOfTeams(2)}>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                        </div>
                        <div className={numberOfTeams === 3 ? 'teamOptionSelected' : 'teamOption'}
                        onClick={() => setNumberOfTeams(3)}>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                        </div>
                        <div className={numberOfTeams === 4 ? 'teamOptionSelected' : 'teamOption'}
                        onClick={() => setNumberOfTeams(4)}>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                        </div>
                    </div>
                </Row>
                <Row className='sectionRow'>
                        <h4 className='sectionName'>Squares</h4>
                        <SetupSquareCont>
                            <SetupSquare selected={squares === 20} onClick={() => setSquaresLocal(20)}>20</SetupSquare>
                            <SetupSquare selected={squares === 30} onClick={() => setSquaresLocal(30)}>30</SetupSquare>
                            <SetupSquare selected={squares === 40} onClick={() => setSquaresLocal(40)}>40</SetupSquare>
                        </SetupSquareCont>
                </Row>
                <Row className='sectionRow'> 
                    <div>
                        <div>
                        <h4 className='sectionName'>Bonuses</h4>
                            <Toggle translate={45} sliderWidth={25} width={80} height={40} 
                            backgroundColorChecked={"#EBA63F"} backgroundColorUnchecked={"#1d1d2c"}
                            backgroundColorButton={"#F7F4E9"} checked={bonusSquares} 
                            onChange={() => setBonusSquaresLocal(currentState => !currentState)}
                            />
                        </div>
                    </div>
                </Row>
                <Row className='sectionRow'>
                    <button className='startGameButton' onClick={() => confirm()}>
                        <RightCircleOutlined className='startGameIcon'/>
                        Start Game
                    </button>
                </Row>
            </Col>
            <Col span={4}/>
        </Row>
    )
}
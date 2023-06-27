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
    const [numberOfTeams, setNumberOfTeams] = useState(4)
    const [squares, setSquaresLocal] = useState(30)
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
                <Row className='setupRow'>
                    <Col span={12} className='setupColumn'>
                        <h4 className='sectionName' span={7}>Teams</h4>
                    </Col>
                    <Col span={12} className='setupColumn'>
                        <h4 className='sectionName'>Squares</h4>
                    </Col>
                </Row>
                <Row className='setupRow'>
                    <Col span={12} className='setupColumn'>
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
                    </Col>
                <Col span={12} className='setupColumn'>
                        <SetupSquareCont>
                            <SetupSquare selected={squares === 20} onClick={() => setSquaresLocal(20)}>20</SetupSquare>
                            <SetupSquare selected={squares === 30} onClick={() => setSquaresLocal(30)}>30</SetupSquare>
                            <SetupSquare selected={squares === 40} onClick={() => setSquaresLocal(40)}>40</SetupSquare>
                        </SetupSquareCont>
                </Col>
                </Row>
                <Row className='setupRow'>
                    <Col span={12} className='setupColumn'> 
                        <div>
                            <h4 className='sectionName'>Bonuses</h4>
                                <Toggle translate={45} sliderWidth={25} width={80} height={40} 
                                backgroundColorChecked={"#EBA63F"} backgroundColorUnchecked={"#1d1d2c"}
                                backgroundColorButton={"#F7F4E9"} checked={bonusSquares} 
                                onChange={() => setBonusSquaresLocal(currentState => !currentState)}
                                />
                        </div>
                    </Col>
                    <Col span={12} className='setupColumn'>
                        <button className='startGameButton' onClick={() => confirm()}>
                            <RightCircleOutlined className='startGameIcon'/>
                            Start Game
                        </button>
                    </Col>
                </Row>
                <div style={{marginBottom: "50px"}}></div>
            </Col>
            <Col span={4}/>
        </Row>
    )
}
import {Button, Col, ConfigProvider, InputNumber, Radio, Row, Slider} from 'antd'
import {Circle, CircleCont, SetupSquare, SetupSquareCont} from '../assets/styledComponents/NumberShapes'
import '../assets/stylesheets/setup.css'
import {useEffect, useState} from 'react'
import {RightCircleOutlined, UserOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setNumOfTeams, setSquares, setBonusSquares } from '../slices/setupSlice'
import { assignSquareValues } from './functions/setupFunctions'
import { setSquareValues } from '../slices/setupSlice'
import { Bonus } from './Bonus'
import Toggle from 'react-styled-toggle'
import { current } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router';
import { setCurrentSquare } from '../slices/gameSlice'
import popSound from '../assets/audios/pop.mp3'

export const Setup = () => {
    const [numberOfTeams, setNumberOfTeams] = useState(4)
    const [squares, setSquaresLocal] = useState(30)
    const [bonusSquares, setBonusSquaresLocal] = useState(true) 
    const questions = useSelector((state) => state.setup.questions)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const audio = new Audio(popSound);
        audio.preload = 'auto';

        return () => {
            audio.pause()
            audio.src = ''
        }
      }, []);

    const playSound = () => {
        const audio = new Audio(popSound);
        audio.play();
    };

    const handleSettingChange = (func) => {
        playSound()
        setTimeout(() => {
            func()
        }, 100)
    }

    const confirm = () => {
        const squareValues = assignSquareValues(squares, bonusSquares, questions.length)
        dispatch(setSquareValues(squareValues))
        dispatch(setNumOfTeams(numberOfTeams))
        dispatch(setSquares(squares))
        dispatch(setBonusSquares(bonusSquares))
        dispatch(setCurrentSquare(["none", 0]))
        navigate('/grid')
    }

    return (
        <Row>
            <Col span={4}/>
            <Col className='setupCont' span={16}>
                <Row className='setupRow'>
                    <Col span={12} className='setupColumn'>
                        <label className='sectionName' span={7}>Teams</label>
                    </Col>
                    <Col span={12} className='setupColumn'>
                        <label className='sectionName'>Squares</label>
                    </Col>
                </Row>
                <Row className='setupRow'>
                    <Col span={12} className='setupColumn'>
                        <div className='teamContainer'>
                            <div className={numberOfTeams === 2 ? 'teamOptionSelected' : 'teamOption'}
                            onClick={() => handleSettingChange(() => setNumberOfTeams(2))}>
                                <UserOutlined className='teamIcon'/>
                                <UserOutlined className='teamIcon'/>
                            </div>
                            <div className={numberOfTeams === 3 ? 'teamOptionSelected' : 'teamOption'}
                            onClick={() => handleSettingChange(() => setNumberOfTeams(3))}>
                                <UserOutlined className='teamIcon'/>
                                <UserOutlined className='teamIcon'/>
                                <UserOutlined className='teamIcon'/>
                            </div>
                            <div className={numberOfTeams === 4 ? 'teamOptionSelected' : 'teamOption'}
                            onClick={() => handleSettingChange(() => setNumberOfTeams(4))}>
                                <UserOutlined className='teamIcon'/>
                                <UserOutlined className='teamIcon'/>
                                <UserOutlined className='teamIcon'/>
                                <UserOutlined className='teamIcon'/>
                            </div>
                        </div>
                    </Col>
                <Col span={12} className='setupColumn'>
                        <SetupSquareCont>
                            <SetupSquare selected={squares === 20} onClick={() => handleSettingChange(() => setSquaresLocal(20))}>20</SetupSquare>
                            <SetupSquare selected={squares === 30} onClick={() => handleSettingChange(() => setSquaresLocal(30))}>30</SetupSquare>
                            <SetupSquare selected={squares === 40} onClick={() => handleSettingChange(() => setSquaresLocal(40))}>40</SetupSquare>
                        </SetupSquareCont>
                </Col>
                </Row>
                <Row className='setupRow'>
                    <Col span={12} className='setupColumn'> 
                        <div>
                            <label className='sectionName'>Bonuses</label>
                                <Toggle translate={45} sliderWidth={25} width={80} height={40} 
                                backgroundColorChecked={"#EBA63F"} backgroundColorUnchecked={"#1d1d2c"}
                                backgroundColorButton={"#F7F4E9"} checked={bonusSquares} 
                                onChange={() => handleSettingChange(() => setBonusSquaresLocal(currentState => !currentState))}
                                />
                        </div>
                    </Col>
                    <Col span={12} className='setupColumn'>
                        <button className='startGameButton' onClick={() => handleSettingChange(() => confirm())}>
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
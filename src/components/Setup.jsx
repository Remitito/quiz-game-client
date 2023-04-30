import {Button, Col, InputNumber, Radio, Row, Slider, ConfigProvider} from 'antd'
import {Circle, CircleCont, SetupSquare, SetupSquareCont} from '../assets/styledComponents/NumberShapes'
import '../assets/stylesheets/setup.css'
import {useState} from 'react'
import {CheckCircleOutlined, CloseCircleOutlined, RightCircleOutlined, UserOutlined} from '@ant-design/icons'
import { VscSmiley } from "react-icons/vsc";
import { ImEvil } from "react-icons/im";
import { useDispatch } from 'react-redux'
import { setTeamsAction, setSquaresAction, setGoodEvilAction } from '../slices/setupSlice'
import { setCurrentScreen } from '../slices/gameSlice'

export const Setup = () => {
    const [teams, setTeams] = useState(2)
    const [squares, setSquares] = useState(20)
    const [goodEvil, setGoodEvil] = useState("all") 
    const dispatch = useDispatch()

    const confirm = () => {
        dispatch(setTeamsAction(teams))
        dispatch(setSquaresAction(squares))
        dispatch(setGoodEvilAction(goodEvil))
        dispatch(setCurrentScreen("grid"))
    }

    return (
        <Row>
            <Col span={4}/>
            <Col className='mainCont' span={16}>
                <Row className='sectionRow'>
                    <h4 className='sectionName' span={7}>Teams:</h4>
                    <div className='teamContainer'>
                        <div className={teams === 1 ? 'teamOptionSelected' : 'teamOption'}
                        onClick={() => setTeams(1)}>
                            <UserOutlined className='teamIcon'/>
                        </div>
                        <div className={teams === 2 ? 'teamOptionSelected' : 'teamOption'}
                        onClick={() => setTeams(2)}>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                        </div>
                        <div className={teams === 3 ? 'teamOptionSelected' : 'teamOption'}
                        onClick={() => setTeams(3)}>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                        </div>
                        <div className={teams === 4 ? 'teamOptionSelected' : 'teamOption'}
                        onClick={() => setTeams(4)}>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                            <UserOutlined className='teamIcon'/>
                        </div>
                    </div>
                </Row>
                <Row className='sectionRow'>
                        <h4 className='sectionName'>Squares:</h4>
                        <SetupSquareCont>
                            <SetupSquare selected={squares === 20} onClick={() => setSquares(20)}>20</SetupSquare>
                            <SetupSquare selected={squares === 30} onClick={() => setSquares(30)}>30</SetupSquare>
                            <SetupSquare selected={squares === 40} onClick={() => setSquares(40)}>40</SetupSquare>
                        </SetupSquareCont>
                </Row>
                <Row className='sectionRow'> 
                    <h4 className='sectionName'>
                        <label style={{color: "#438945"}}>Good</label> and 
                        <label style={{color: "#E40C2B"}}> Evil</label> Squares:</h4>
                    <div className='goodEvilCont'>
                        <div className={goodEvil === "both" ? 'goodEvilOptionSelected' : 'goodEvilOption'}  
                        onClick={() => setGoodEvil("both")}>
                        <VscSmiley className='goodIcon'/>
                        <ImEvil className='evilIcon'/>
                        <CheckCircleOutlined className='tickIcon'/>
                        <CheckCircleOutlined className='tickIcon'/>
                        </div>
                        <div className={goodEvil === "good" ? 'goodEvilOptionSelected' : 'goodEvilOption'}  
                        onClick={() => setGoodEvil("good")}>
                        <VscSmiley className='goodIcon'/>
                        <ImEvil className='evilIcon'/>
                        <CheckCircleOutlined className='tickIcon'/>
                        <CloseCircleOutlined className='crossIcon'/>
                        </div>
                        <div className={goodEvil === "evil" ? 'goodEvilOptionSelected' : 'goodEvilOption'} 
                        onClick={() => setGoodEvil("evil")}>
                        <VscSmiley className='goodIcon'/>
                        <ImEvil className='evilIcon'/>
                        <CloseCircleOutlined className='crossIcon'/>
                        <CheckCircleOutlined className='tickIcon'/>
                        </div>
                        <div className={goodEvil === "none" ? 'goodEvilOptionSelected' : 'goodEvilOption'} 
                        onClick={() => setGoodEvil("none")}>
                        <VscSmiley className='goodIcon'/>
                        <ImEvil className='evilIcon'/>
                        <CloseCircleOutlined className='crossIcon'/>
                        <CloseCircleOutlined className='crossIcon'/>
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
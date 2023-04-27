import {Button, Col, InputNumber, Radio, Row, Slider, ConfigProvider} from 'antd'
import {Circle, CircleCont, Square, SquareCont} from '../assets/styledComponents/NumberShapes'
import '../assets/stylesheets/setup.css'
import {useState} from 'react'
import {CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined, RightCircleOutlined, UserOutlined} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setTeamsAction, setSquaresAction, setPowerupsAction } from '../slices/setupSlice'
import { setCurrentScreen } from '../slices/gameSlice'

export const Setup = () => {
    const [teams, setTeams] = useState(2)
    const [squares, setSquares] = useState(20)
    const [powerups, setPowerups] = useState("all") 
    const dispatch = useDispatch()

    const confirm = () => {
        dispatch(setTeamsAction(teams))
        dispatch(setSquaresAction(squares))
        dispatch(setPowerupsAction(powerups))
        dispatch(setCurrentScreen("grid"))
    }

    return (
        <Row>
            <Col span={5}/>
            <Col className='mainCont' span={14}>
                <Row className='sectionRow'>
                    <h4 className='sectionName' span={7}>Teams:</h4>
                        <Row className='teamCont'>
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
                        </Row>
                </Row>
                <Row className='sectionRow'>
                        <h4 className='sectionName'>Squares:</h4>
                        <SquareCont>
                            <Square selected={squares === 10} onClick={() => setSquares(10)}>10</Square>
                            <Square selected={squares === 20} onClick={() => setSquares(20)}>20</Square>
                            <Square selected={squares === 30} onClick={() => setSquares(30)}>30</Square>
                        </SquareCont>
                </Row>
                <Row className='sectionRow'>
                    <h4 className='sectionName'>Powerups:</h4>
                    <div className='powerupsCont'>
                        <CheckCircleOutlined onClick={() => setPowerups("all")} 
                        className={powerups === "all" ? 'allPowerupsSelected' : 'allPowerups'}/>
                        <CloseCircleOutlined onClick={() => setPowerups("none")}
                        className={powerups === "none" ? 'nonePowerupsSelected' : 'nonePowerups'}/>
                        {/* <QuestionCircleOutlined onClick={() => setpowerups("some")}
                        className={powerups === "some" ? 'somePowerupsSelected' : 'somePowerups'}/> */}
                    </div>
                </Row>
                <Row className='sectionRow'>
                    <button className='startGameButton' onClick={() => confirm()}>
                        <RightCircleOutlined className='startGameIcon'/>
                        Start Game
                    </button>
                </Row>
            </Col>
            <Col span={5}/>
        </Row>
    )
}
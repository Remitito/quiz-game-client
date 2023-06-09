import {Col, Row, Avatar, Space, Button} from 'antd'
import '../assets/stylesheets/navbar.css'
import { setCurrentScreen, resetAllScores } from '../slices/gameSlice';
import { useSelector, useDispatch } from 'react-redux';
import {UserOutlined, SearchOutlined} from '@ant-design/icons'
import 'animate.css';

export const Navbar = () => {
    const dispatch = useDispatch()

    const handleClick = (nextScreen) => {
        dispatch(resetAllScores())
        dispatch(setCurrentScreen(nextScreen))
    }

    return (
        <Row className='navbarCont'>
            <Col span={5} className='findCont'>
            <Row>
                <Space>
                    <Avatar onClick={() => handleClick('searchOfficial')} size="large" className="navbarIcon" icon={<SearchOutlined/>}/>
                    <label className='findCont'>Find a quiz</label>
                    <label style={{fontSize: "30px"}}></label>
                </Space>
            </Row>
            </Col>
            <Col className='titleCont' span={14}>
                <label style={{color: "#1d1d2c"}}>In</label>
                <label style={{color: "#E40C2B", fontSize: "90px"}}>QUIZ</label>
                <label style={{color: "#1d1d2c"}}>itive</label>
            </Col>
            <Col className='accountCont' span={5}>
                <Row>
                    <Space>
                        <Avatar onClick={() => handleClick('create')} size="large" className="navbarIcon" icon={<UserOutlined/>}/>
                        <label className='accountCont'>Guest User</label>
                    </Space>
                </Row>
            </Col>
        </Row>
    )
}
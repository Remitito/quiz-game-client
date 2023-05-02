import {Col, Row, Avatar, Space, Button} from 'antd'
import '../assets/stylesheets/navbar.css'
import { useSelector } from 'react-redux';
import {UserOutlined, SearchOutlined} from '@ant-design/icons'
import 'animate.css';

export const Navbar = () => {
    const currentTeam = useSelector((state) => state.game.currentTeam)
    return (
        <Row className='navbarCont'>
            <Col span={5} className='findCont'>
            {/* <label>{currentTeam}</label> */}
            <Row>
                <Space>
                    <Avatar size="large" className="navbarIcon" icon={<SearchOutlined/>}/>
                    <label className='findCont'>Find a quiz</label>
                    <label style={{fontSize: "30px"}}></label>
                </Space>
            </Row>
            </Col>
            <Col className='titleCont' span={14}>
                <h1 className='animate__animated animate__backInDown'>inQUIZitive</h1>
            </Col>
            <Col className='accountCont' span={5}>
                <Row>
                    <Space>
                        <Avatar size="large" className="navbarIcon" icon={<UserOutlined/>}/>
                        <label className='accountCont'>Guest User</label>
                    </Space>
                </Row>
            </Col>
        </Row>
    )
}
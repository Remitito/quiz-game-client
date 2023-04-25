import {Col, Row, Avatar, Space, Button} from 'antd'
import '../assets/stylesheets/navbar.css'
import {UserOutlined, SearchOutlined} from '@ant-design/icons'
import 'animate.css';

export const Navbar = () => {
    return (
        <Row className='navbarCont'>
            <Col span={5} className='findCont'>
            <Row>
                <Space>
                    <Avatar size="large" className="navbarIcon" icon={<SearchOutlined/>}/>
                    <label className='findCont'>Find a quiz</label>
                </Space>
            </Row>
            </Col>
            <Col className='titleCont' span={14}>
                <h1 className='animate__animated animate__backInDown'>Quiz Game</h1>
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
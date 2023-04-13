import {Col, Row, Avatar, Space, Button} from 'antd'
import '../assets/stylesheets/navbar.css'
import {UserOutlined, SearchOutlined} from '@ant-design/icons'

export const Navbar = () => {
    return (
        <Row className='navbarCont'>
            <Col span={8} className='findCont'>
            <Row>
                <Space>
                    <Avatar size="large" className="navbarIcon" icon={<SearchOutlined/>}/>
                    <label className='findCont'>Find a quiz</label>
                </Space>
            </Row>
            </Col>
            <Col className='titleCont' span={8}>
                <h1 className='title'>Quiz Game</h1>
            </Col>
            <Col className='accountCont' span={8}>
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
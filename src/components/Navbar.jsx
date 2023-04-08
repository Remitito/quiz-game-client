import {Col, Row, Avatar, Space, Button} from 'antd'
import {FindQuizButton} from '../assets/styledComponents/Buttons' 
import '../assets/stylesheets/navbar.css'
import {UserOutlined, SearchOutlined} from '@ant-design/icons'

export const Navbar = () => {
    return (
        <Row className='navbarCont'>
            <Col span={8}>
                <FindQuizButton className='findQuiz'>
                <SearchOutlined className='searchIcon' />
                    Find a quiz
                </FindQuizButton>
            </Col>
            <Col className='titleCont' span={8}>
                <h1 className='title'>Quiz Game</h1>
            </Col>
            <Col className='accountCont' span={8}>
                <Row>
                    <Space>
                        <Avatar icon={<UserOutlined/>}/>
                        <label className='accountCont'>Guest User</label>
                    </Space>
                </Row>
            </Col>
        </Row>
    )
}
import {Col, Row} from 'antd'
import '../assets/stylesheets/powerup.css'

export const Powerup = () => {
    return (
        <Row>
            <Col span={5}/>
            <Col span={14}>
                <Row className='sectionRow'>
                    <h4 className='sectionName'>Bonus</h4>
                        
                </Row>
            </Col>
            <Col span={5}/>
        </Row>
    )
}
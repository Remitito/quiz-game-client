import {Col, Row} from 'antd'
import { useSelector } from "react-redux"
import '../assets/stylesheets/scores.css'

export const Scores = () => {
    const teams = useSelector((state) => state.setup.teams)
    const scores = [
        useSelector((state) => state.game.teamOneScore),
        useSelector((state) => state.game.teamTwoScore),
        useSelector((state) => state.game.teamThreeScore),
        useSelector((state) => state.game.teamFourScore)
    ]
    const teamColors = ["#3CBCC3","#EBA63F", "#438945", "#E40C2B"] 

    const addTeams = () => {
        let teamElements = []
        for(let i = 0; i < teams; i ++) {
            teamElements.push(
                <div className="teamCont" id={`team${i}`} 
                style={{backgroundColor: teamColors[i]}}>
                    <label className='teamName'>Team {i + 1}</label>
                    <br/>
                    <label className='teamScore'>{scores[i]}</label>
                </div>
            )
        }
        return teamElements
    } 

    return (
        <Row>
            <Col span={1}/>
            <Col span={20} className="scoresCont">
                {addTeams()}
            </Col>
            <Col span={1}/>
        </Row>
    )
}

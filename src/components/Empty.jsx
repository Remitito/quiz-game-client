import { TbRepeatOnce } from "react-icons/tb";
import {Row, Col} from 'antd'
import { useDispatch } from "react-redux";
import {setCurrentScreen, setCurrentSquare } from "../slices/gameSlice";
import '../assets/stylesheets/empty.css'


// This page loads when bonuses are off and there are more grid squares than questions 

export const Empty = () => {
    const dispatch = useDispatch()

    const backToGrid = () => {
        dispatch(setCurrentSquare(["none", 0]))
        dispatch(setCurrentScreen("grid"))
    }

    return (
        <Row>
            <Col span={5}/>
            <Col className='emptyCont' span={14}>
                <label className='emptyTitle'>Bonuses are off but there aren't enough questions. Try again!</label>
                <TbRepeatOnce className='emptyIcon' style={{color: "#E40C2B"}}/>
                <button className="okayButton" onClick={() => backToGrid()}>Pick Again</button>
            </Col>
            <Col span={5}/>
    </Row>
    )
}
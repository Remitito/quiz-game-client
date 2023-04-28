import { useSelector } from 'react-redux'
import {Row, Col} from 'antd'
import { GridSquareCont, GridSquare } from '../assets/styledComponents/NumberShapes'
import '../assets/stylesheets/grid.css'

export const Grid = () => {
    const squares = useSelector((state) => state.setup.squares)
    const fonts = ["5rem", "4rem", "3rem"] 
    const addGridSquares = () => {
        let squareElements = []
        for(let i = 1; i <= squares; i += 5) { // add them in rows of 5
            squareElements.push(
                <GridSquareCont>
                    <GridSquare font={fonts[squares / 10 - 2]}  size={squares} className='gridSquare' id={`Square${i}`}>{i}</GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} className='gridSquare' id={`Square${i + 1}`}>{i + 1}</GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} className='gridSquare' id={`Square${i + 2}`}>{i + 2}</GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} className='gridSquare' id={`Square${i + 3}`}>{i + 3}</GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} className='gridSquare' id={`Square${i + 4}`}>{i + 4}</GridSquare>
                </GridSquareCont>
            )
        }
        return squareElements
    } 

    return (
        <Row>
            <Col span={3}/>
            <Col className='mainCont' span={18}>
                <div className='grid'>
                    {addGridSquares()}
                </div>
                {/* <button onClick={() => console.log(window.innerWidth)}>Width</button> */}
            </Col>
            <Col span={3}/>
        </Row>
    )
}
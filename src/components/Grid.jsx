import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Bonus } from './Bonus'
import { Empty } from './Empty'
import { Question } from './Question'
import {Row, Col} from 'antd'
import { setCurrentSquare, setCurrentScreen } from '../slices/gameSlice'
import { GridSquareCont, GridSquare } from '../assets/styledComponents/NumberShapes'
import '../assets/stylesheets/grid.css'


export const Grid = () => {
    const [completedSquares, setCompletedSquares] = useState([]);
    let currentSquare = useSelector((state) => state.game.currentSquare)
    const dispatch = useDispatch()
    const squares = useSelector((state) => state.setup.squares)
    const squareValues = useSelector((state) => state.setup.squareValues)
    const fonts = ["5rem", "3.5rem", "3rem"] 

    const loadSquare = (squareId) => {
        dispatch(setCurrentSquare(squareValues[squareId]))
        setCompletedSquares(current => [...current, squareId + 1])
    }

    const loadGridSquares = () => {
        if(completedSquares.length === squares) {
            dispatch(setCurrentScreen("finish"))
            return
        }
        let squareElements = []
        for(let i = 0; i < squares; i += 5) { // add them in rows of 5
            squareElements.push(
                <GridSquareCont>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} id={`Square${i + 1}`}
                    className={!completedSquares.includes(i + 1) ? 'gridSquare' : 'gridSquareComplete'}
                    onClick={() => {!completedSquares.includes(i + 1) ? loadSquare(i) : undefined}}>{i + 1}
                    </GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} id={`Square${i + 2}`}
                    className={!completedSquares.includes(i + 2) ? 'gridSquare' : 'gridSquareComplete'}
                    onClick={() => {!completedSquares.includes(i + 2) ? loadSquare(i + 1) : undefined}}>{i + 2}
                     </GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} id={`Square${i + 3}`}
                    className={!completedSquares.includes(i + 3) ? 'gridSquare' : 'gridSquareComplete'}
                    onClick={() => {!completedSquares.includes(i + 3) ? loadSquare(i + 2) : undefined}}>{i + 3}
                    </GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} id={`Square${i + 4}`}
                    className={!completedSquares.includes(i + 4) ? 'gridSquare' : 'gridSquareComplete'}
                    onClick={() => {!completedSquares.includes(i + 4) ? loadSquare(i + 3) : undefined}}>{i + 4}
                     </GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} id={`Square${i + 5}`}
                    className={!completedSquares.includes(i + 5) ? 'gridSquare' : 'gridSquareComplete'}
                    onClick={() => {!completedSquares.includes(i + 5) ? loadSquare(i + 4) : undefined}}>{i + 5}
                    </GridSquare>
                </GridSquareCont>
            )
        }
        return squareElements
    } 

    return (
        <Row>
            <Col span={3}/>
            <Col span={18}>
                {currentSquare[0] == "none" ?
                <div className='gridCont'>
                    {loadGridSquares()}
                </div>
                    :
                    <>
                        {currentSquare[0] == "question" ?
                        <Question questionNumber={currentSquare[1]}/>
                        : 
                        <>
                            {currentSquare[0] == "bonus" ?
                            <Bonus bonusNumber={currentSquare[1]}/> 
                            :
                            <Empty/>
                            }
                        </>
                        }
                    </>
                }  
            </Col>
            <Col span={3}/>
        </Row>
    )
}
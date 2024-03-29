import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Bonus } from './Bonus'
import { Empty } from './Empty'
import { Question } from './Question'
import {Scores} from './Scores'
import {Row, Col} from 'antd'
import { setCurrentSquare } from '../slices/gameSlice'
import { GridSquareCont, GridSquare } from '../assets/styledComponents/NumberShapes'
import '../assets/stylesheets/grid.css'

export const Grid = () => {
    const [completedSquares, setCompletedSquares] = useState([]);
    let currentSquare = useSelector((state) => state.game.currentSquare)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const squares = useSelector((state) => state.setup.squares)
    const squareValues = useSelector((state) => state.setup.squareValues)
    const fonts = ["4rem", "3rem", "3rem"] // depending on number of squares
    const squaresPerRow = [5,6,8] // depending on number of squares

    const loadSquare = (squareId) => {
        dispatch(setCurrentSquare(squareValues[squareId]))
        setCompletedSquares(current => [...current, squareId + 1])
    }

    const loadGridSquares = () => {
        if(completedSquares.length === squares) {
            navigate('/finish')
            return
        }
        let squareElements = []
        for(let i = 0; i < squares; i += squaresPerRow[squares / 10 - 2]) { // add them in rows of 5
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
                    {squares > 20 ?
                        <GridSquare font={fonts[squares / 10 - 2]} size={squares} id={`Square${i + 6}`}
                        className={!completedSquares.includes(i + 6) ? 'gridSquare' : 'gridSquareComplete'}
                        onClick={() => {!completedSquares.includes(i + 6) ? loadSquare(i + 5) : undefined}}>{i + 6}
                        </GridSquare>
                    : 
                        <></>
                    }
                    {squares > 30 ?
                        <>
                            <GridSquare font={fonts[squares / 10 - 2]} size={squares} id={`Square${i + 7}`}
                            className={!completedSquares.includes(i + 7) ? 'gridSquare' : 'gridSquareComplete'}
                            onClick={() => {!completedSquares.includes(i + 7) ? loadSquare(i + 6) : undefined}}>{i + 7}
                            </GridSquare>
                            <GridSquare font={fonts[squares / 10 - 2]} size={squares} id={`Square${i + 8}`}
                            className={!completedSquares.includes(i + 8) ? 'gridSquare' : 'gridSquareComplete'}
                            onClick={() => {!completedSquares.includes(i + 8) ? loadSquare(i + 7) : undefined}}>{i + 8}
                            </GridSquare>
                        </>
                    : 
                        <></>
                    }
                </GridSquareCont>
            )
        }
        return squareElements
    } 

    return (
        <div className='gridScoreCont'>
            <div className='scoresCont'>
                <Scores/>
            </div>
                <div className='mainCont'>
                    {currentSquare[0] == "none" ?
                        <div>
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
            </div>
        </div>
    )
}
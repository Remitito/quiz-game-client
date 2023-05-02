import { useSelector, useDispatch } from 'react-redux'
import { GoodEvil } from './GoodEvil'
import { Question } from './Question'
import {Row, Col} from 'antd'
import { useState } from 'react'
import { setCurrentSquare } from '../slices/gameSlice'
import { GridSquareCont, GridSquare } from '../assets/styledComponents/NumberShapes'
import '../assets/stylesheets/grid.css'


export const Grid = () => {
    let currentSquare = useSelector((state) => state.game.currentSquare)
    const dispatch = useDispatch()
    const squares = useSelector((state) => state.setup.squares)
    const squareValues = useSelector((state) => state.setup.squareValues)
    const fonts = ["5rem", "3.5rem", "3rem"] 

    const loadSquare = (squareId) => {
        if(squareValues[squareId] == "question") {
            dispatch(setCurrentSquare("question"))
        }
        else if(squareValues[squareId] == "good") {
            dispatch(setCurrentSquare("good"))
        }
        else {
            dispatch(setCurrentSquare("evil"))
        }
    }

    const loadGridSquares = () => {
        let squareElements = []
        for(let i = 0; i < squares; i += 5) { // add them in rows of 5
            squareElements.push(
                <GridSquareCont>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} 
                    className='gridSquare' id={`Square${i + 1}`} onClick={() => loadSquare(i)}>{i + 1}
                    </GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} 
                    className='gridSquare' id={`Square${i + 2}`} onClick={() => loadSquare(i + 1)}>{i + 2}
                    </GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} 
                    className='gridSquare' id={`Square${i + 3}`} onClick={() => loadSquare(i + 2)}>{i + 3}
                    </GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} 
                    className='gridSquare' id={`Square${i + 4}`} onClick={() => loadSquare(i + 3)}>{i + 4}
                    </GridSquare>
                    <GridSquare font={fonts[squares / 10 - 2]} size={squares} 
                    className='gridSquare' id={`Square${i + 5}`} onClick={(square) => loadSquare(i + 4)}>{i + 5}
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
                {currentSquare == "none" ?
                <div className='gridCont'>
                    {loadGridSquares()}
                </div>
                    :
                    <>
                        {currentSquare == "question" ?
                        <Question/>
                        :
                        <GoodEvil/> 
                        }
                    </>
                }
                    
                {/* <button onClick={() => console.log(window.innerWidth)}>Width</button> */}
            </Col>
            <Col span={3}/>
        </Row>
    )
}
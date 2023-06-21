import '../assets/stylesheets/finish.css'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentScreen, resetAllScores } from '../slices/gameSlice';
import { useState, useRef } from 'react';
import {Col, Row} from 'antd'
import saxMan from '../assets/images/saxMan.gif'
import saxManSound from '../assets/audios/saxMan.mp3'


export const Finish = () => {
    const teamScores = useSelector((state) => state.game.teamScores);
    const dispatch = useDispatch()
    const [showWinner, setShowWinner] = useState(false)
    const [winningTeams, setWinningTeams] = useState([])
    const soundRef = useRef(null);

    const findWinners = () => {
        const max = Math.max(...teamScores);
        const updatedWinningTeams = []
        teamScores.forEach((val, index) => {
            if(val === max) {
                updatedWinningTeams.push(index + 1)
            }
        })
        setWinningTeams(updatedWinningTeams)
    }

    const playSong = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    const show = () => {
        findWinners()
        playSong(saxManSound)
        setShowWinner(true)
    }

    const playAgain = () => {
        dispatch(resetAllScores())
        dispatch(setCurrentScreen('setup'))
    }


    return (
        <Row>
            <Col span={5}/>
                {!showWinner ?
                    <Col className='mainCont' span={14}>
                        <button onClick={show} className='revealButton'>CLICK TO REVEAL WINNER</button>
                    </Col>
                :
                    <Col className='mainCont' span={14}>
                        <div className='winnerMessageCont'>
                            {winningTeams[0].length === 1 ?
                            <>
                                <p className='winnerMessage'>Congratulations to Team {winningTeams[0]}! </p>
                                <label className='winnerMessage'>You win!</label>
                            </>
                            :
                            <div className='winnerMessage'>
                                <p>Winners:</p>
                                <div className='winningTeams'>
                                    {winningTeams.map((team) => (
                                        <label>Team {team}</label>    
                                    ))}
                                </div>
                            </div>
                            }
                        </div>      
                        <div className='lowerCont'>
                            <button onClick={playAgain} className='playAgain'>Play Again</button>
                            <img className='saxManGif' src={saxMan} alt="Sax Gif"/>              
                        </div>
                    </Col>
                }
            <Col span={5}/>
        </Row>
    );
  };


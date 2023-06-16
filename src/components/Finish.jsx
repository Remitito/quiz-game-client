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
    const winningTeam = teamScores.indexOf(Math.max(...teamScores)) + 1
    const [showWinner, setShowWinner] = useState(false)
    const soundRef = useRef(null);

    const playSong = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    const show = () => {
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
            <Col className='bonusCont' span={14}>
                {!showWinner ?
                <>
                    <button onClick={show} className='revealButton'>CLICK TO REVEAL WINNER</button>
                </>
                :
                <>
                    {/* <audio src={saxManSound} ref={soundRef} controls={false} /> */}
                    <div className='winnerMessageCont'>
                        <p className='winnerMessage'>Congratulations to Team {winningTeam}! </p>
                        <p className='winnerMessage'>You win!</p>
                        <button onClick={playAgain} className='okayButton'>Play Again</button>
                        <img className='saxManGif' src={saxMan} alt="Sax Gif"/>
                    </div>
                </>
                }
            </Col>
            <Col span={5}/>
        </Row>
    );
  };


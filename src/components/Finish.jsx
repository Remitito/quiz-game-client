import '../assets/stylesheets/finish.css'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentScreen, resetAllScores } from '../slices/gameSlice';
import { useState, useRef, useEffect } from 'react';
import {Col, Row} from 'antd'
import saxMan from '../assets/images/saxMan.gif'
import saxManSound from '../assets/audios/saxMan.mp3'
import { useNavigate } from 'react-router';


export const Finish = () => {
    const teamScores = useSelector((state) => state.game.teamScores);
    const dispatch = useDispatch();
    const [showWinner, setShowWinner] = useState(false);
    const [winningTeams, setWinningTeams] = useState([]);
    const soundRef = useRef(null);
    const [audio, setAudio] = useState(null); 
    const navigate = useNavigate()
  
    useEffect(() => {
      return () => {
        if (audio) {
          audio.pause();
        }
      };
    }, [audio]);
  
    const findWinners = () => {
      const max = Math.max(...teamScores);
      const updatedWinningTeams = [];
      teamScores.forEach((val, index) => {
        if (val === max) {
          updatedWinningTeams.push(index + 1);
        }
      });
      setWinningTeams(updatedWinningTeams);
    };
  
    const playSong = (sound) => {
      const audio = new Audio(sound);
      audio.play();
      setAudio(audio);
    };
  
    const stopSong = () => {
      if (audio) {
        audio.pause();
      }
    };
  
    // Triggered after user clicks "Reveal Winner" button
    // It is not automatic because the winner song is triggered by a click
    const show = () => {
      findWinners();
      playSong(saxManSound);
      setShowWinner(true);
    };
  
    const playAgain = () => {
      stopSong(); 
      dispatch(resetAllScores());
      navigate('/setup')
    };


    return (
      <div className='finishCont'>
        {!showWinner ?
                <button onClick={show} className='revealButton'>CLICK TO REVEAL WINNER</button>
        :
            <div className='finishSubCont'>
                <div className='winnerMessageCont'>
                    {winningTeams.length === 1 ?
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
            </div>
        }
      </div>
    );
  };


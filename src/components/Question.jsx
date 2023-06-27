import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef } from 'react'
import {TiTimes, TiTick} from 'react-icons/ti'
import '../assets/stylesheets/question.css'
import {setTeamScore, setCurrentTeam, setCurrentScreen, setCurrentSquare } from '../slices/gameSlice'
import { BsPatchQuestionFill } from "react-icons/bs";
import wrongSound from '../assets/audios/wrong.mp3'
import correctSound from '../assets/audios/correct.mp3'

export const Question = ({ questionNumber }) => {
  const [answer, showAnswer] = useState(false);
  const [pointsMessage, setPointsMessage] = useState("");
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => state.game.currentTeam);
  const numOfTeams = useSelector((state) => state.setup.teams);
  const questions = useSelector((state) => state.setup.questions);
  const teamScores = useSelector((state) => state.game.teamScores);
  const soundRef = useRef(null);

  const playSound = (sound) => {
    const audio = soundRef.current;
    audio.src = sound;
    audio.play();
  };

  const finishTurn = () => {
    if (currentTeam + 1 > numOfTeams) {
      dispatch(setCurrentTeam(1));
    } else {
      dispatch(setCurrentTeam(currentTeam + 1));
    }
    dispatch(setCurrentSquare(["none", 0]));
    dispatch(setCurrentScreen("grid"));
  };

  const wrongAnswer = () => {
    playSound(wrongSound);
    setPointsMessage("wrong");
    setTimeout(() => {
      finishTurn();
    }, 1500);
  };

  // just add 50 points per question for now
  const correctAnswer = () => {
    playSound(correctSound);
    setPointsMessage("correct");
    setTimeout(() => {
      const newPointTotal = teamScores[currentTeam - 1] + 50;
      dispatch(setTeamScore({ team: currentTeam - 1, amount: newPointTotal }));
      finishTurn();
    }, 1000);
  };

  // Check if the question exists before rendering
  const currentQuestion = questions[questionNumber];
  if (!currentQuestion) {
    return null; // Or render an appropriate fallback component/error message
  }

  return (
    <div className="questionCont">
        <audio ref={soundRef} />
        <>
          {pointsMessage.length === 0 ? (
            <div className='questionSubCont'>
              <label className='questionPrompt'>{currentQuestion.prompt}</label>
              {answer ? (
                <>
                  <div className="answer">{currentQuestion.answer}</div>
                  <div className="correctWrongCont">
                    <TiTick className="correctIcon" onClick={() => correctAnswer()} />
                    <TiTimes className="wrongIcon" onClick={() => wrongAnswer()} />
                  </div>
                </>
              ) : (
                <>
                  <BsPatchQuestionFill className="questionIcon" />
                  <button
                    className="showAnswer"
                    onClick={() => showAnswer(true)}
                  >
                    SHOW ANSWER
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              {pointsMessage === "correct" ? (
                <label className="correctMessage">+50 Points!</label>
              ) : (
                <label className="wrongMessage">0 Points</label>
              )}
            </>
          )}
        </>
    </div>
  );
};

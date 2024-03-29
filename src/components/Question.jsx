import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import {TiTimes, TiTick} from 'react-icons/ti'
import '../assets/stylesheets/question.css'
import {setTeamScore, setCurrentTeam, setCurrentScreen, setCurrentSquare } from '../slices/gameSlice'
import { BsPatchQuestionFill } from "react-icons/bs";
import wrongSound from '../assets/audios/wrong.mp3';
import correctSound from '../assets/audios/correct.mp3';

export const Question = ({ questionNumber }) => {
  const [answer, showAnswer] = useState(false);
  const [pointsMessage, setPointsMessage] = useState("");
  const dispatch = useDispatch();
  const currentTeam = useSelector((state) => state.game.currentTeam);
  const numOfTeams = useSelector((state) => state.setup.teams);
  const questions = useSelector((state) => state.setup.questions);
  const teamScores = useSelector((state) => state.game.teamScores);

  // Preload audio for smoother playback
  useEffect(() => {
    const audioWrong = new Audio(wrongSound);
    audioWrong.preload = 'auto';
    const audioCorrect = new Audio(correctSound);
    audioCorrect.preload = 'auto';

    return () => {
      audioWrong.pause()
      audioWrong.src = ''
      audioCorrect.pause()
      audioCorrect.src = ''
    };
  }, []);

  const playSound = (sound) => {
    if(sound === 'wrong') {
      const audioWrong = new Audio(wrongSound)
      audioWrong.play();
    }
    else {
      const audioCorrect = new Audio(correctSound)
      audioCorrect.play();
    }
  };

  // Move to next team or back to first team if already on last team
  // Then set the most recent square to empty (finished) and go back to the grid screen
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
    playSound('wrong');
    setPointsMessage("wrong");
    setTimeout(() => {
      finishTurn();
    }, 1500);
  };

  // 50 points per correct answer
  const correctAnswer = () => {
    playSound('correct');
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
    return null;
  }

  return (
    <div className="questionCont">
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

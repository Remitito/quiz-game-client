import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import {Col, Row} from 'antd'
import {TiTimes, TiTick} from 'react-icons/ti'
import '../assets/stylesheets/question.css'
import {setTeamScore, setCurrentTeam, setCurrentScreen, setCurrentSquare } from '../slices/gameSlice'
import { BsPatchQuestionFill } from "react-icons/bs";
export const Question = ({ questionNumber }) => {
    const [answer, showAnswer] = useState(false);
    const dispatch = useDispatch();
    const currentTeam = useSelector((state) => state.game.currentTeam);
    const numOfTeams = useSelector((state) => state.setup.teams);
    const questions = useSelector((state) => state.setup.questions);
    const teamScores = useSelector((state) => state.game.teamScores);
  
    useEffect(() => {
      console.log(questions[24]);
      console.log(questionNumber);

    }, []);
  
    const finishTurn = () => {
      if (currentTeam + 1 > numOfTeams) {
        dispatch(setCurrentTeam(1));
      } else {
        dispatch(setCurrentTeam(currentTeam + 1));
      }
      dispatch(setCurrentSquare(["none", 0]));
      dispatch(setCurrentScreen("grid"));
    };
  
    // just add 50 points per question for now
    const correctAnswer = () => {
      const newPointTotal = teamScores[currentTeam - 1] + 50;
      dispatch(setTeamScore({ team: currentTeam - 1, amount: newPointTotal }));
      finishTurn();
    };
  
    // Check if the question exists before rendering
    const currentQuestion = questions[questionNumber];
    if (!currentQuestion) {
      return null; // Or render an appropriate fallback component/error message
    }
  
    return (
      <Row>
        <Col span={5} />
        <Col className="questionCont" span={14}>
          <label className="questionTitle">{currentQuestion.prompt}</label>
          {answer ? (
            <>
              <label className="answer">{currentQuestion.answer}</label>
              <div className="correctWrongCont">
                <TiTick className="correctIcon" onClick={() => correctAnswer()} />
                <TiTimes className="wrongIcon" onClick={() => finishTurn()} />
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
        </Col>
        <Col span={5} />
      </Row>
    );
  };
import {Row, Col} from 'antd'
import '../assets/stylesheets/search.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setQuestions} from '../slices/setupSlice'
import {setCurrentScreen} from '../slices/gameSlice'

export const Search = () => {
    const [quizzes, setQuizzes] = useState([]);
    const dispatch = useDispatch();
  
    useEffect(() => {
      axios
        .get("http://localhost:3000/quizzes")
        .then((response) => {
          setQuizzes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching quizzes:", error);
        });
    }, []);
  
    const selectQuiz = (quizIndex) => {
      const selectedQuiz = quizzes[quizIndex];
      const questions = [...selectedQuiz.questions]
      dispatch(setQuestions(questions));
      dispatch(setCurrentScreen("setup"));
    };

    const quizItems = quizzes.map((quiz, index) => {
        const className = index % 2 === 0 ? 'quizEven' : 'quizOdd';
        return (
            <div onClick={() => selectQuiz(index)} className={className} key={quiz._id}>
                <label>{quiz.title}</label>
            </div>
        )});

    return (
        <Row>
            <Col span={5}/>
            <Col className='mainCont' span={14}>
                    <Row className='sectionRow'>
                        <h4 className='sectionName'>Click to select</h4>
                        <div className='quizList'>
                            {quizItems}
                        </div>
                    </Row>
            </Col>
            <Col span={5}/>
        </Row>
    )
}
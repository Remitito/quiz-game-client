import {Row, Col} from 'antd'
import '../assets/stylesheets/search.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setQuestions} from '../slices/setupSlice'
import {setCurrentScreen} from '../slices/gameSlice'
import { LoadingContainer, LoadingSpinner } from '../assets/styledComponents/Loading'

// https://inquizitive-api.onrender.com

export const SearchOfficial = () => {
    const [quizzes, setQuizzes] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getOfficialQuizNames()
    }, []);

    const getOfficialQuizNames = () => {
        axios
        .get("https://inquizitive-api.onrender.com/names/official")
        .then((response) => {
          setQuizzes(response.data.files);
        })
        .catch((error) => {
          console.error("Error fetching quizzes:", error);
        });
    }

    const selectOfficialQuiz = (quizIndex) => {
      const selectedQuiz = quizzes[quizIndex];
      axios.get("https://inquizitive-api.onrender.com/quiz/official", {
      params: {
          filename: selectedQuiz
      },
    })
    .then(response => {
        dispatch(setQuestions(response.data.questions));
        dispatch(setCurrentScreen("setup"));
    })
    .catch(error => {
        console.log(error)
    })
    };

    const officialQuizItems = quizzes.map((quiz, index) => {
        const className = index % 2 === 0 ? 'quizEven' : 'quizOdd';
        return (
            <div onClick={() => selectOfficialQuiz(index)} className={className} key={index}>
                <label>{quiz.split('.')[0]}</label>
            </div>
        )});

    return (
        <Row>
            <Col span={5}/>
            <Col className='searchCont' span={14}>
                    <Row className='sectionRow'>
                        <div className='searchTopRow'>
                            <label className='sectionName'>Official Quizzes</label>
                            <button onClick={() => dispatch(setCurrentScreen('searchUser'))} className='searchButton'>View User Quizzes</button>
                        </div>
                        <>
                            {quizzes.length > 0 ? 
                                <div>
                                    {officialQuizItems}
                                </div>
                            :
                            <LoadingContainer>
                                <label className='loadingLabel'>Loading</label>
                                <LoadingSpinner/>
                            </LoadingContainer>
                            }
                        </>  
                    </Row>
            </Col>
            <Col span={5}/>
        </Row>
    )
}
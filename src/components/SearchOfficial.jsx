import {Row, Col} from 'antd'
import '../assets/stylesheets/search.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux'
import {setQuestions} from '../slices/setupSlice'
import { LoadingContainer, LoadingSpinner } from '../assets/styledComponents/Loading'

// https://inquizitive-api.onrender.com

export const SearchOfficial = () => {
    // set them manually to save initial load time
    const [quizzes, setQuizzes] = useState([
        "Country_Names.json", "First_and_Second_Conditional.json", "Past_Participles.json", 
        "Past_Simple_vs_Past_Continuous.json", "Present_Perfect.json"
    ]);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const selectOfficialQuiz = (quizIndex) => {
      const selectedQuiz = quizzes[quizIndex];
      axios.get("https://inquizitive-api.onrender.com/quiz/official", {
      params: {
          filename: selectedQuiz
      },
    })
    .then(response => {
        dispatch(setQuestions(response.data.questions));
        navigate('/setup')
    })
    .catch(error => {
        console.log(error)
    })
    };

    const officialQuizItems = quizzes.map((quiz, index) => {
        const className = index % 2 === 0 ? 'quizEven' : 'quizOdd';
        return (
            <div onClick={() => selectOfficialQuiz(index)} className={className} key={index}>
                <label>{quiz.replaceAll('_', ' ').split('.')[0]}</label>
            </div>
        )});

    return (
        <Row>
            <Col span={5}/>
            <Col className='searchCont' span={14}>
                <div className='searchTopRow'>
                    <label className='sectionName'>Official Quizzes</label>
                    <button onClick={() => navigate('/searchUser')} className='searchButton'>User Quizzes</button>
                </div>
                <>
                    {quizzes.length > 0 ? 
                        <div className='quizList'>
                            {officialQuizItems}
                        </div>
                    :
                    <LoadingContainer>
                        <label className='loadingLabel'>Loading</label>
                        <LoadingSpinner/>
                    </LoadingContainer>
                    }
                </>  
            </Col>
            <Col span={5}/>
        </Row>
    )
}
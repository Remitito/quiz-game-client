import {Row, Col} from 'antd'
import '../assets/stylesheets/search.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setQuestions} from '../slices/setupSlice'
import {setCurrentScreen} from '../slices/gameSlice'
import { LoadingContainer, LoadingSpinner } from '../assets/styledComponents/Loading'
import { useNavigate } from 'react-router'

export const SearchUser = () => {
    const [quizzes, setQuizzes] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate()
  
    useEffect(() => {
      getUserQuizNames()
    }, []);

    const getUserQuizNames = () => {
        axios
        .get("https://inquizitive-api.onrender.com/names/user")
        .then((response) => {
            setQuizzes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching quizzes:", error);
        });
    }
  
    const selectUserQuiz = (quizIndex) => {
      const selectedQuiz = quizzes[quizIndex];
      axios.get("https://inquizitive-api.onrender.com/quiz/user", {
        params: {
            id: quizzes[quizIndex].id
        },
    })
        .then(response => {
            dispatch(setQuestions(response.data.questions));
            navigate("/setup");
        })
        .catch(error => {
            console.log(error)
        })
        };

    const userQuizItems = quizzes.map((quiz, index) => {
        const className = index % 2 === 0 ? 'quizEven' : 'quizOdd';
        return (
            <div onClick={() => selectUserQuiz(index)} className={className} key={quiz._id}>
                <label>{quiz.name}</label>
            </div>
        )});

    return (
        <Row>
            <Col span={5}/>
            <Col className='searchCont' span={14}>
                <div className='searchTopRow'>
                    <label className='sectionName'>User Quizzes</label>
                    <button onClick={() => navigate('/searchOfficial')} className='searchButton'>Official Quizzes</button>
                </div>
                <>
                    {quizzes.length > 0 ? 
                        <div className='quizList'>
                            {userQuizItems}
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
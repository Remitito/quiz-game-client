import {Row, Col} from 'antd'
import '../assets/stylesheets/search.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setQuestions} from '../slices/setupSlice'
import {setCurrentScreen} from '../slices/gameSlice'
import { LoadingContainer, LoadingSpinner } from '../assets/styledComponents/Loading'
import { useNavigate } from 'react-router'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'


export const SearchUser = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [retryCount, setRetryCount] = useState(0)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [pageNum, setPageNum] = useState(1)
    const pages = (Math.ceil(quizzes.length / 8))
    useEffect(() => {
        setTimeout(() => {
            getUserQuizNames()
        }, 2000)
    }, []);

    useEffect(() => {
        const retryTimer = setTimeout(() => {
            if (quizzes.length === 0) {
              getUserQuizNames()
            }
          }, 2000);
          return () => clearTimeout(retryTimer)
    }, [quizzes.length, retryCount])

    const nextPage = () => {
        if(pageNum + 1 <= pages) {
            setPageNum(pageNum + 1)
        }
    }

    const lastPage = () => {
        if(pageNum - 1 > 0) {
            setPageNum(pageNum - 1)
        }
    }

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
      console.log(quizzes[quizIndex].id)
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

        const startIndex = (pageNum - 1) * 8;
        const endIndex = pageNum * 8;
        
        const userQuizItems = quizzes.slice(startIndex, endIndex).map((quiz, index) => {
            const className = index % 2 === 0 ? 'quizEven' : 'quizOdd';
            return (
                <div onClick={() => selectUserQuiz(index)} className={className} key={quiz._id}>
                <label>{quiz.name}</label>
            </div>
            );
        });

    return (
        <Row>
            <Col span={2}/>
            <Col className='searchCont' span={20}>
            {quizzes.length > 0 ? 
            <>
            <div className='searchTopRow'>
                    <div className='pageCont'>Page {pageNum} / {pages}
                        <div className='arrowsCont'>
                            <BsFillArrowLeftCircleFill onClick={() => lastPage()}
                                className='pageArrows'/>
                            <BsFillArrowRightCircleFill onClick={() => nextPage()}
                                className='pageArrows'/>
                        </div>
                    </div>
                    <div className='sectionName'>User Quizzes</div>
                    <div className='searchButtonCont'>
                        <button className='searchButton' onClick={() => navigate('/searchOfficial')}>
                            Official Quizzes
                        </button>
                    </div>
                </div>
                        <div className='quizList'>
                            {userQuizItems}
                        </div>
                        </>
                    :
                        <LoadingContainer className='loadingCont'>
                            <label className='loadingLabel'>Loading</label>
                            <LoadingSpinner/>
                        </LoadingContainer>
                    }
            </Col>
            <Col span={2}/>
        </Row>
    )
}
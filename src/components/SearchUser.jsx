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
import {RiExchangeFill} from "react-icons/ri"
import {SearchOutlined} from '@ant-design/icons'

export const SearchUser = () => {
    const [originalList, setOriginalList] = useState([])
    const [quizzes, setQuizzes] = useState([]);
    const [warning, setWarning] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [pageNum, setPageNum] = useState(1)
    const pages = (Math.ceil(quizzes.length / 9))
    useEffect(() => {
        setTimeout(() => {
            getUserQuizNames()
        }, 2000)
    }, []);

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

    const handleSearch = (searchTerm) => {
        if(searchTerm.length === 0) {
            setQuizzes(originalList)
        }
        else {
            let output = []
            originalList.forEach((quiz) => {
                let quizName = quiz.name.split(' ')
                quizName.forEach((word) => {
                    console.log(word.toLowerCase())
                    console.log(searchTerm.toLowerCase())
                    if(word.toLowerCase().includes(searchTerm.toLowerCase())) {
                        output.push(quiz)
                    }
                })
            })
            if(output.length > 0) {
                setQuizzes([...new Set(output)])
                setWarning("")
            }
            else {
                setWarning("There are no quizzes on this topic sorry!")
            }
        }
    }

    const getUserQuizNames = () => {
        axios
        .get("https://inquizitive-api.onrender.com/names/user")
        .then((response) => {
            setOriginalList(response.data)
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

        const startIndex = (pageNum - 1) * 9;
        const endIndex = pageNum * 9;
        
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
                    <div className='sectionName'>
                        User Quizzes
                    </div>
                    <div className='searchButtonCont'>
                    <button className='searchButton' onClick={() => navigate('/searchOfficial')}>
                        <RiExchangeFill className='changeLogo'/>
                        <label>Official Quizzes</label>
                        </button>
                    </div>
                </div>
                <div className='searchSecondRow'>
                    <div className='searchBar'>
                        <input className='searchInput'
                        placeholder='Enter a quiz name'
                        onChange={(e) => handleSearch(e.target.value)}
                        />
                        <SearchOutlined className='searchLogo'/>
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
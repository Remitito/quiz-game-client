import {Row, Col} from 'antd'
import '../assets/stylesheets/search.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux'
import {setQuestions} from '../slices/setupSlice'
import { LoadingContainer, LoadingSpinner } from '../assets/styledComponents/Loading'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import {RiExchangeFill} from "react-icons/ri"
import {SearchOutlined} from '@ant-design/icons'


export const SearchOfficial = () => {
    const originalList = [
        "Country_Names", "First_and_Second_Conditional", "Past_Participles", 
        "Past_Simple_vs_Past_Continuous", "Present_Perfect", "Just_Yet_Already", "Mixed_Future_Tenses",
        "Past_Continuous", "Present_Simple_Passive", "Reported_Speech", "Zero_Conditional",
        "Future_Continuous", "Future_Passive", "Future_Perfect", "Irregular_Verbs", "Adverbs", 
        "Past_Perfect_Continuous", "Present_Perfect_Continuous", "Relative_Clauses"
    ]
    const [quizzes, setQuizzes] = useState([
        "Country_Names", "First_and_Second_Conditional", "Past_Participles", 
        "Past_Simple_vs_Past_Continuous", "Present_Perfect", "Just_Yet_Already", "Mixed_Future_Tenses",
        "Past_Continuous", "Present_Simple_Passive", "Reported_Speech", "Zero_Conditional",
        "Future_Continuous", "Future_Passive", "Future_Perfect", "Irregular_Verbs", "Adverbs", 
        "Past_Perfect_Continuous", "Present_Perfect_Continuous", "Relative_Clauses"
    ]);
    const [searchResults, setSearchResults] = useState([])
    const [warning, setWarning] = useState("")
    const [pageNum, setPageNum] = useState(1)
    const pages = (Math.ceil(quizzes.length / 9))
    const dispatch = useDispatch();
    const navigate = useNavigate()

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
                let quizName = quiz.split('_')
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

    const selectOfficialQuiz = (quizIndex) => {
        const selectedQuiz = quizzes[quizIndex];
        
        import(`../assets/quizzes/${selectedQuiz}.json` /* @vite-ignore */)
          .then((module) => {
            const questions = module.default.questions;
            dispatch(setQuestions(questions));
            navigate('/setup');
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };

      const startIndex = (pageNum - 1) * 9;
      const endIndex = pageNum * 9;
      
      const officialQuizItems = quizzes.slice(startIndex, endIndex).map((quiz, index) => {
          const className = index % 2 === 0 ? 'quizEven' : 'quizOdd';
          return (
              <div onClick={() => selectOfficialQuiz(startIndex + index)} className={className} key={startIndex + index}>
                  <label>{quiz.replaceAll('_', ' ').split('.')[0]}</label>
              </div>
          );
      });
      
    return (
        <Row>
            <Col span={2}/>
            <Col className='searchCont' span={20}>
                <div className='searchTopRow'>
                    <div className='pageCont'>Page {pageNum} / {pages}
                        <div className='arrowsCont'>
                            <BsFillArrowLeftCircleFill onClick={() => lastPage()}
                                className='pageArrows'/>
                            <BsFillArrowRightCircleFill onClick={() => nextPage()}
                                className='pageArrows'/>
                        </div>
                    </div>
                    <div className='sectionName'>Official Quizzes</div>
                    <div className='searchButtonCont'>
                        <button className='searchButton' onClick={() => navigate('/searchUser')}>
                        <RiExchangeFill className='changeLogo'/>
                        <label>User Quizzes</label>
                        </button>
                    </div>
                </div>
                <div className='searchSecondRow'>
                    <div className='searchBar'>
                        <input className='searchInput'
                        placeholder='Enter a grammar topic'
                        onChange={(e) => handleSearch(e.target.value)}
                        />
                        <SearchOutlined className='searchLogo'/>
                    </div>
                </div>
                <>
                    {warning.length === 0 ? 
                        <div className='quizList'>
                            {officialQuizItems}
                        </div>
                    :
                        <label className='warningLabel'>{warning}</label>
                    }
                </>  
            </Col>
            <Col span={2}/>
        </Row>
    )
}
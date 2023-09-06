import '../assets/stylesheets/create.css'
import { useState } from 'react'
import axios from 'axios'
import { CopyOutlined } from '@ant-design/icons'
import { IoLogoGameControllerA } from "react-icons/io";
import { useNavigate } from 'react-router';
import { setQuestions } from '../slices/setupSlice';
import { useDispatch } from 'react-redux';

export const Create = () => {
    const [quizName, setQuizName] = useState('')
    const [quizId, setQuizId] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [questions, setQuestionsLocal] = useState('')
    const [questionArray, setQuestionArray] = useState([])
    const [copyText, setCopyText] = useState('Copy URL')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const errorCheck = () => {
        if(quizName.length < 4) {
            setErrorMsg("Choose a title of at least 4 characters")
            return false
        }
        if(quizName.length > 35) {
            setErrorMsg("Choose a title no longer than 35 characters")
            return false
        }
        const splitByLine = questions.split('\n').filter((line) => line.trim() !== '');
        if(splitByLine.length < 5) {
            setErrorMsg("Please add at least 5 questions")
            return false
        }
        if(splitByLine.length > 30) {
            setErrorMsg("No more than 30 questions")
            return false
        }
        for(let i = 0; i < splitByLine.length; i++) {
            if(!splitByLine[i].includes('---')) {
                setErrorMsg("Make sure all questions and answers are separated by '---'")
                return false
            }
        }
        return true
    }

    const makeQuestions = () => {
          const splitByLine = questions.split('\n').filter((line) => line.trim() !== '');
          const questionsArray = [];
          while (splitByLine.length > 0) {
            const current = splitByLine.pop().split('---');
            const prompt = current[0];
            const answer = current[1];
            questionsArray.push({ prompt: prompt, answer: answer, type: 'normal' });
          }
          setQuestionArray(questionsArray);
          return questionsArray;
      };
    
    const copyToClipboard = (id) => {
        const quizUrl = `https://inquizitive-api.onrender.com/play/${id}`
        navigator.clipboard.writeText(quizUrl)
      .then(() => {
        setCopyText("URL Copied!");
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
      });
    }

    const playNow = () => {
        dispatch(setQuestions(questionArray))
        navigate('/setup')
    }

    const createQuiz = () => {
        if(errorCheck()) {
            const questions = makeQuestions()
            axios
            .post('https://inquizitive-api.onrender.com/uploadQuiz', { title: quizName, questions: questions })
            .then(response => {
              setQuizId(response.data.quizId)
            })
            .catch(error => {
              console.log(error);
            });
        }
    } 

    const updateName = (val) => {
        setQuizName(val)
        setErrorMsg('')
    } 

    return (
        <div className='createCont'>
            <>
            {quizId.length === 0 ?
                <>
                    <h1 className='createTitle'>Create a Quiz</h1>
                    <div className='sectionRow'>
                        <label className='sectionName'>Title:</label>
                        <input value={quizName} onChange={(e) => updateName(e.target.value)} className='singleLineInput'/>
                    </div>
                    <div className='questionSection'>
                        {errorMsg.length === 0 ?
                            <div className='exampleCont'>
                                <label style={{marginBottom: "10px"}}>Enter 1 question per line in this format:</label>
                                <label className='exampleInput'>
                                    {'What is 1 + 1? --- 2'}
                                </label>
                                <label className='exampleInput'>
                                    {'Name a European city --- Paris'}
                                </label>
                            </div>
                            :
                            <div className='exampleCont'>
                                <label className='errorMsg'>{errorMsg}</label>
                            </div>
                        }
                        <textarea value={questions} onChange={(e) => setQuestionsLocal(e.target.value)} placeholder='Question/prompt --- Answer' 
                        className='questionInput'/>
                    </div>
                    <button onClick={() => createQuiz()} className='createButton'>Create</button>
                </>
                :
                <>
                    <h1 className='createTitle'>Quiz Created!</h1>
                    <div className='playCont' 
                    onClick={() => playNow()}>
                        Play Now
                        <IoLogoGameControllerA/>
                    </div>
                </>}
            </>
        </div>
    )
}

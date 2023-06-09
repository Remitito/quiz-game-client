import '../assets/stylesheets/create.css'
import { useState } from 'react'
import axios from 'axios'

export const Create = () => {
    const [quizName, setQuizName] = useState('')
    const [quizId, setQuizId] = useState('')
    const [questions, setQuestions] = useState('')

    const makeQuestions = () => {
        const splitByLine = questions.split('\n')
        const questionsArray = []
        while (splitByLine.length > 0) { 
            const current = splitByLine.pop().split('---')
            const prompt = current[0]
            const answer = current[1]
            questionsArray.push({prompt: prompt, answer: answer, type: "normal"})
        }
        return questionsArray
    }
    
    const createQuiz = () => {
        const questions = makeQuestions()
        axios
        .post('https://inquizitive-api.onrender.com/uploadQuiz', { title: quizName, questions: questions })
        .then(response => {
          console.log(response.data);
          setQuizId(response.data.quizId)
        })
        .catch(error => {
          console.log(error);
        });
    } 

    return (
        <div className='createCont'>
            <>
            {quizId.length === 0 ?
                <>
                    <h1 className='createTitle'>Create a Quiz</h1>
                    <div className='sectionRow'>
                        <label className='sectionName'>Title:</label>
                        <input value={quizName} onChange={(e) => setQuizName(e.target.value)} className='singleLineInput'></input>
                    </div>
                    <div className='questionSection'>
                        <label style={{marginBottom: "10px"}}>Enter 1 question per line in this format:</label>
                        <label className='exampleInput'>
                            {'What is 1 + 1? --- 2'}
                        </label>
                        <label className='exampleInput'>
                            {'Name a European city --- Paris'}
                        </label>
                        <textarea value={questions} onChange={(e) => setQuestions(e.target.value)} placeholder='Question/prompt --- Answer' 
                        className='questionInput'/>
                    </div>
                    <button onClick={() => createQuiz()} className='createButton'>Create</button>
                </>
                :
                <>
                    <h1 className='createTitle'>Quiz Created!</h1>
                    {quizId}
                </>}
            </>
        </div>
    )
}

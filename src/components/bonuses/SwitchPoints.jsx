import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import { setTeamScore } from "../../slices/gameSlice";

export const SwitchScores = ({finishTurn, numOfTeams, teamColors}) => {
    const dispatch = useDispatch()
    const teamScores = useSelector((state) => state.game.teamScores)
    const [choiceOne, setChoiceOne] = useState(1)
    const [choiceTwo, setChoiceTwo] = useState(2)
    const [statusMessage, setStatusMessage] = useState(`Swap Team ${choiceOne}'s points with Team ${choiceTwo}'s points?`)
    const [errorMessage, setErrorMessage] = useState("")

    let teams = []
    for(let i = 1; i <= numOfTeams; i++) {
        teams.push(i)
    }

    const handleChange = (choiceFunction, team) => {
        choiceFunction(team)
        setErrorMessage("")
        if(choiceFunction === setChoiceOne) { // doing it this way ensures the label is up to date
            setStatusMessage(`Swap Team ${team}'s points with Team ${choiceTwo}'s points?`)
        }
        else {
            setStatusMessage(`Swap Team ${choiceOne}'s points with Team ${team}'s points?`)
        }
    }

    const switchScores = () => {
        if(validateChoice()) {
            let firstTeamNewScore = teamScores[choiceTwo - 1]
            let secondTeamNewScore = teamScores[choiceOne - 1]
            dispatch(setTeamScore({team: choiceOne - 1, amount: firstTeamNewScore}))
            dispatch(setTeamScore({team: choiceTwo - 1, amount: secondTeamNewScore}))
            finishTurn()
        }
        else {
            setErrorMessage("You cannot select the same team twice!")
        }
    }

    const validateChoice = () => {
        if(choiceOne == choiceTwo) {
            return false
        }
        return true
    }

    return (
        <div className="bonusSubCont">
            <label className='bonusTitle'>Switch Scores</label>
            <>
                    {errorMessage.length == 0 ?
                        <label className='statusMessage'>{statusMessage}</label>
                        :
                        <label className='errorMessage'>{errorMessage}</label>
                    }
                </>
            <div className="teamSelectCont">
                <select placeholder="Select the first team" className="teamSelect" height
                value={choiceOne} onChange={(selection) => handleChange(setChoiceOne, selection.target.value)}
                style={{backgroundColor: teamColors[choiceOne - 1]}}>
                    <option value={1}>Team 1</option>
                    <option value={2}>Team 2</option>
                    <option style={{display: numOfTeams < 3 ? "none" : ""}} value={3}>Team 3</option>
                    <option style={{display: numOfTeams < 4 ? "none" : ""}} value={4}>Team 4</option>
                </select>
                <HiSwitchHorizontal className="bonusIcon"/>
                <select placeholder="Select the second team" className="teamSelect" 
                value={choiceTwo} onChange={(selection) => handleChange(setChoiceTwo, selection.target.value)}
                 style={{backgroundColor: teamColors[choiceTwo - 1]}}>
                    <option value={1}>Team 1</option>
                    <option value={2}>Team 2</option>
                    <option style={{display: numOfTeams < 3 ? "none" : ""}} value={3}>Team 3</option>
                    <option style={{display: numOfTeams < 4 ? "none" : ""}} value={4}>Team 4</option>
                </select>
                </div>
                    <button className="okayButton" onClick={() => switchScores()}>Switch</button>
        </div>
    )
}
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";

export const SwitchScores = ({finishTurn, numOfTeams, teamColors, setTeamScore}) => {
    const dispatch = useDispatch()
    const teamOneScore = useSelector((state) => state.game.teamOneScore)
    const teamTwoScore = useSelector((state) => state.game.teamTwoScore)
    const teamThreeScore = useSelector((state) => state.game.teamThreeScore)
    const teamFourScore = useSelector((state) => state.game.teamFourScore)
    const teamScores = [teamOneScore, teamTwoScore, teamThreeScore, teamFourScore]
    const [choiceOne, setChoiceOne] = useState(1)
    const [choiceTwo, setChoiceTwo] = useState(2)
    const [statusMessage, setStatusMessage] = useState(`Swap Team ${choiceOne}'s points with Team ${choiceTwo}'s points?`)

    let teams = []
    for(let i = 1; i <= numOfTeams; i++) {
        teams.push(i)
    }

    const switchScores = () => {
        if(validateChoice()) {
            let firstTeamNewScore = teamScores[choiceTwo - 1]
            let secondTeamNewScore = teamScores[choiceOne - 1]
            console.log(firstTeamNewScore)
            setTeamScore([choiceOne - 1], firstTeamNewScore)
            setTeamScore([choiceTwo - 1], secondTeamNewScore)
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
            <div className="teamSelectCont">
                <select placeholder="Select the first team" className="teamSelect" height
                value={choiceOne} onChange={(selection) => setChoiceOne(selection.target.value)}
                style={{backgroundColor: teamColors[choiceOne - 1]}}>
                    <option value={1}>Team 1</option>
                    <option value={2}>Team 2</option>
                    <option value={3}>Team 3</option>
                    <option value={4}>Team 4</option>
                </select>
                <HiSwitchHorizontal className="bonusIcon"/>
                <select placeholder="Select the second team" className="teamSelect" 
                value={choiceTwo} onChange={(selection) => setChoiceTwo(select.target.value)}
                style={{backgroundColor: teamColors[choiceTwo - 1]}}>
                    <option value={1}>Team 1</option>
                    <option value={2}>Team 2</option>
                    <option value={3}>Team 3</option>
                    <option value={4}>Team 4</option>
                </select>
                </div>
                <label className='statusMessage'>{statusMessage}</label>
                <button className="okayButton" onClick={() => switchScores()}>Do it!</button>
        </div>
    )
}
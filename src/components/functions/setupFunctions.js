const shuffleSquares = (squares) => {
    for (var i = squares.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = squares[i];
        squares[i] = squares[j];
        squares[j] = temp;
    }
    return squares
}

// combine choose Bonuses / question into one function

const assignSquareType = (squares, bonusSquares) => {
    let squareTypes = []
    let overallCounter = 0
    let bonuses = []
    // get random indexes to refer to different bonuses/questions
    let questions = chooseInstances(12)
    if(bonusSquares) {bonuses = chooseInstances(7)}
    
    // backup in case bonuses/questions need to be used again e..g on a big grid
    const questionsBackup = questions
    const bonusesBackup = bonuses

    // assign square types e.g. bonus with an index for a certain bonus
    while (squareTypes.length < squares) {
        if(bonusSquares) {
            if(bonuses.length === 1) {
                squareTypes.push(["bonus", bonuses[0]]) // push final bonus then repopulate bonus array
                bonusesBackup.forEach((bonus) => {
                    bonuses.push(bonus)
                })
            }
            else {
                squareTypes.push(["bonus", bonuses.pop()])    
            }
        }
        if(questions.length > 0)
            squareTypes.push(["question", questions.pop()])
        // if bonuses not selected but there aren't enough questions
        if(questions.length === 0 && !bonusSquares) {
            squareTypes.push(["empty", ""])
        }
    }
    return squareTypes
}

export const assignSquareValues = (squares, bonusSquares) => {
    let squareValues = assignSquareType(squares, bonusSquares)
    return shuffleSquares(squareValues)
}

// decides which # bonus/question it loads
const chooseInstances = (maximum) => {
    let indexArray = []
    while (indexArray.length < maximum) {
        let result = Math.floor(Math.random()*maximum)+1
        if(!indexArray.includes(result)) {indexArray.push(result)}
    }
    return indexArray;
}

const shuffleSquares = (squares) => {
    for (var i = squares.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = squares[i];
        squares[i] = squares[j];
        squares[j] = temp;
    }
    return squares
}

// combine choose Bonuses / question / specials into one function

const assignSquareType = (squares, bonusSquares, specialQuestions) => {
    let squareTypes = []
    let overallCounter = 0
    let bonuses = []
    let specials = []
    let questions = chooseQuestions()
    if(bonusSquares) {bonuses = chooseBonuses()}
    if(specialQuestions) {specials = chooseSpecials()}

    while (squareTypes.length < squares) {
        if(bonusSquares) {
            squareTypes.push(["bonus", bonuses.pop()])
        }
        if(specialQuestions) {
            squareTypes.push(["special", specials.pop()])
        }
        squareTypes.push(["question", questions.pop()])
    }
    return squareTypes
}

export const assignSquareValues = (squares, bonusSquares, specialQuestions) => {
    let squareValues = assignSquareType(squares, bonusSquares, specialQuestions)
    // assignSquareInstance(squareValues)
    return shuffleSquares(squareValues)
}


// decides which bonuses to use by outputting indexes to be used in an array of  
const chooseBonuses = () => {
    let bonusIndexes = []
    while (bonusIndexes.length < 7) {
        let result = Math.floor(Math.random()*7)+1
        if(!bonusIndexes.includes(result)) {bonusIndexes.push(result)}
    }
    return bonusIndexes;
} 

const chooseQuestions = () => {
    let questionIndexes = []
    while (questionIndexes.length < 7) {
        let result = Math.floor(Math.random()*7)+1
        if(!questionIndexes.includes(result)){
            questionIndexes.push(result)
        }
    return questionIndexes
    }
}

const chooseSpecials = () => {
    let specialIndexes = []
    while (specialIndexes.length < 7) {
        let result = Math.floor(Math.random()*7)+1
        if(!specialIndexes.includes(result)) {
            specialIndexes.push(result)
        }
    }
    return specialIndexes
}


// decides which bonuses to use by outputting indexes to be used in an array of  
export const chooseBonuses = (bonusCounter) => {
    let bonusIndexes = []
    while (bonusIndexes.length < bonusCounter) {
        let result = Math.floor(Math.random()*bonusCounter)+1
        if(!bonusIndexes.includes(result)) {bonusIndexes.push(result)}
    }
    return bonusIndexes;
} 

export const chooseQuestions = (questionCounter) => {
    let questionIndexes = []
    while (questionIndexes.length < questionCounter) {
        let result = Math.floor(Math.random()*questionCounter)+1
        if(!questionIndexes.includes(result)){
            questionIndexes.push(result)
        }
    return questionIndexes
    }
}

export const chooseSpecials = (specialCounter) => {
    let specialIndexes = []
    while (specialIndexes.length < specialCounter) {
        let result = Math.floor(Math.random()*specialCounter)+1
        if(!specialIndexes.includes(result)) {
            specialIndexes.push(result)
        }
    }
}

export const shuffleSquares = (squares) => {
    for (var i = squares.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = squares[i];
        squares[i] = squares[j];
        squares[j] = temp;
    }
    return squares
}
import styled from 'styled-components'

export const Circle = styled.div `
    border: 5px solid #1d1d2c;
    border-radius: 50%;
    font-size: 1.5rem;
    margin: auto;
    padding: 10px;
    text-align: center;
`


export const CircleCont = styled.div `
    display: flex;
    flex-direction: row;
    width: 80%;
`

export const GridSquare = styled.div `
    background-color: ${props => props.selected ? "#EBA63F" : ""};
    border: 5px solid #1d1d2c;
    border-radius: 1rem;
    font-size: ${props => props.font};
    margin: auto;
    margin-bottom: ${props => props.size ===  40 ? "40px" : "15px"};
    margin-top: ${props => props.size ===  40 ? "5px" : "15px"};
    padding: ${props => props.size ===  40 ? "5px" : "10px"};
    text-align: center;
    :hover {
        background-color: #EBA63F;
    }
    width: 10%;
    @media screen and (max-width: 1839px) {
        font-size: 4;
        width: 15%;
    }
    @media screen and (max-width: 1200px) {
        font-size: 2rem;
        height: 50px;
    }
    @media only screen and (max-width: 767px){
        font-size: 1.3rem;
        height: 25px;
    }
`

export const GridSquareCont = styled.div `
    display: flex;
    flex-direction: row;
    `

export const SetupSquare = styled.div `
    background-color: ${props => props.selected ? "#EBA63F" : ""};
    border: 2px solid #1d1d2c;
    border-radius: 1rem;
    font-size: 3.5rem;
    margin: auto;
    padding: 10px;
    :hover {
        background-color: #EBA63F;
    }

    @media only screen and (max-width: 767px){
        font-size: 2.5rem;
        height: 70px;
    }
`

export const SetupSquareCont = styled.div `
    display: flex;
    flex-direction: row;
    margin-top: 5px;
`



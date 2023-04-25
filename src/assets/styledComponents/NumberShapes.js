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

export const Square = styled.div `
    background-color: ${props => props.selected ? "#EBA63F" : ""};
    border: 2px solid #1d1d2c;
    border-radius: 1rem;
    font-size: 2rem;
    margin: auto;
    padding: 10px;
    :hover {
        background-color: #EBA63F;
    }
`

export const SquareCont = styled.div `
    display: flex;
    flex-direction: row;
    margin-top: 5px;
`



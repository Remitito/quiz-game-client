import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {decrease, increase} from './slices/testSlice'
import store from './store/store'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const counter = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <button onClick={() => dispatch(increase())}>Hello</button>
      <button onClick={() => console.log(store.getState())}>SHow store</button>
    </div>
  )
}

export default App

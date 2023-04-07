import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {decrease, increase} from './slices/testSlice'
import {Navbar} from './components/Navbar.jsx'
import store from './store/store'
import './App.css'

import {Layout} from 'antd'
const {Header, Content} = Layout


function App() {
  const [count, setCount] = useState(0)
  const counter = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <Layout>
      <Header className='navbarWrapper'>
        <Navbar/>
      </Header>
      <Content>
        {/* <button onClick={() => dispatch(increase())}>Hello</button>
        <button onClick={() => console.log(store.getState())}>SHow store</button> */}
      </Content>
    </Layout>
  )
}

export default App

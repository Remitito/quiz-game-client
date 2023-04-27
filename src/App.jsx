import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import store from './store/store'
import {Navbar} from './components/Navbar.jsx'
import {Game} from './components/Game.jsx'
import './App.css'

import {Layout} from 'antd'
const {Header, Content} = Layout


function App() {
  return (
    <Layout>
      <Header className='navbarWrapper'>
        <Navbar/>
      </Header>
      <Content className='contentWrapper'>
        <Game/>
      </Content>
    </Layout>
  )
}

export default App

import store from './store/store'
import {Navbar} from './components/Navbar.jsx'
import './App.css'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { Setup } from './components/Setup.jsx'
import { Grid } from './components/Grid.jsx';
import { SearchOfficial } from './components/SearchOfficial.jsx';
import { SearchUser } from './components/SearchUser.jsx';
import { Create } from './components/Create.jsx';
import { Finish } from './components/Finish.jsx';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Play } from './components/Play';
import './App.css'

function App() {
  return (
        <BrowserRouter>
          <Navbar/>
        <div className='contentWrapper'>
          <Routes>
            <Route exact path="/" element={<SearchOfficial />} />
            <Route path="/play/:id" element={<Play />} />
            <Route path="/setup" element={<Setup/>} />
            <Route path="/finish" element={<Finish/>} />
            <Route path="/searchOfficial" element={<SearchOfficial />} />
            <Route path="/searchUser" element={<SearchUser/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/grid" element={<Grid/>} />
          </Routes>
        </div>
        </BrowserRouter>
  )
}

export default App

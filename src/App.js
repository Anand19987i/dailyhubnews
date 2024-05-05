import './App.css';
import React, { Component } from 'react';
import News from './components/News';
import Nav from './components/Nav';
import {
  BrowserRouter as Router,
  Routes,
  Route,
 } from 'react-router-dom';
// import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        {/* <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          /> */}
          <Nav />
          <Routes>
            <Route path="/home" element={<News key="general" country="in" category="general" />} />
            <Route path="/business" element={<News key="business" country="in" category="business" />} />
            <Route path="/entertainment" element={<News key="entertainment" country="in" category="entertainment" />} />
            <Route path="/general" element={<News key="general" country="in" category="general" />} />
            <Route path="/health" element={<News key="health" country="in" category="health" />} />
            <Route path="/sports" element={<News key="sports" country="in" category="sports" />} />
            <Route path="/science" element={<News key="science" country="in" category="science" />} />
            <Route path="/technology" element={<News key="technology" country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

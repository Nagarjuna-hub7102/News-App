
import './App.css';
import Navbar from './components/Navbar';

import React, { useState } from 'react'
import News from './components/News';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize=10;
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress,setProgress] = useState(0)
  

  const setprogress = (progress) => {
    setProgress(progress);
  }
  
    
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
       
      />
          <Navbar />
          <Routes>
            <Route path='/' element={<News setProgress = {setprogress} apiKey={apiKey} key='general' pageSize={pageSize} country='us' category='general' />}></Route>
            <Route path='/business' element={<News setProgress = {setprogress} apiKey={apiKey}  key='business' pageSize={pageSize} country='us' category='business' />}></Route>
            <Route path='/entertainment' element={<News setProgress = {setprogress} apiKey={apiKey}  key='entertainment' pageSize={pageSize} country='us' category='entertainment' />}></Route>
            <Route path='/health' element={<News setProgress = {setprogress} apiKey={apiKey} key='health' pageSize={pageSize} country='us' category='health' />}></Route>
            <Route path='/science' element={<News setProgress = {setprogress} apiKey={apiKey} key='science' pageSize={pageSize} country='us' category='science' />}></Route>
            <Route path='/sports' element={<News setProgress = {setprogress} apiKey={apiKey} key='sports' pageSize={pageSize} country='us' category='sports' />}></Route>
            <Route path='/technology' element={<News setProgress = {setprogress} apiKey={apiKey} key='technology' pageSize={pageSize} country='us' category='technology' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  
}

export default App

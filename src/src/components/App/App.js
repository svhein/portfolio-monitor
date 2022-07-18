
import React , { useState, useEffect } from 'react';
import './App.css';
import TickerList from '../TickerList/TickerList.js'
import Totalvalue from '../Totalvalue/Totalvalue.js'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ChangeToday from '../ChangeToday/ChangeToday'
import Currencies from '../Currencies/Currencies';
import Infobar from '../Infobar/Infobar';
import Trade from '../TradeForms/Trade'
import ActiveTrades from '../ActiveTrades/ActiveTrades';
import Login from '../Login/Login';
import auth from '../../firebase-config';


function App(props) {

  const [user, setUser] = useState(null);
  

  // const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const getUser = localStorage.getItem('user')
    setUser(JSON.parse(getUser))
  }, [])

  useEffect(() => {

  })

  

  return (
    <div className='grid'>

      <TickerList className='tickerList'/>

      <div className="top-right">
        <div className='top-right-container'>
          <Infobar />
          <Trade />
          <Login user={user} setUser={setUser}/>
        </div>
      </div>

      <div className="chart">
        <ActiveTrades></ActiveTrades>
      </div>
    </div>
  );
  }
export default App;

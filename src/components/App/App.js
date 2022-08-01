
import React , { useState, useEffect } from 'react';
import './App.css';
import TickerList from '../TickerList/TickerList.js'
import Totalvalue from '../Totalvalue/Totalvalue.js'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Currencies from '../Currencies/Currencies';
import Infobar from '../Infobar/Infobar';
import Trade from '../TradeForms/Trade'
import ActiveTrades from '../ActiveTrades/ActiveTrades';
import Login from '../Login/Login';
import PieChart from '../PieChart/PieChart';
import { useSelector } from 'react-redux'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { auth, database } from "../../utils/firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, update } from "firebase/database";


function App(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storeData = useSelector((store) => store.tickers)

  // storeInitialized returns boolean based on whether redux store
  // has got data from realtime db
  const storeInitialized = useSelector((store) => store.IsInitialized)

  //start sending data to db when user is logged in
  useEffect(() => {
    if (storeInitialized){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
          const uid = user.uid;
          // const updates = {};
          // updates[`users/${uid}/portfolios/main`] = storeData;
          const reference =  ref((database), `users/${uid}/portfolios/main`)
     
          const sendDataToDb = () => {
            set(reference, storeData);
          }
          sendDataToDb();
        } else {
          setIsLoggedIn(false)
        }
      })
    }
    
  },[storeInitialized, storeData])

  return (
    <div className='grid'>

      <TickerList className='tickerList'/>

      <div className="top-right">
        <div className='top-right-container'>
          <Infobar />
          <Trade />
          <Login />
        </div>
      </div>
    
      <div className="bottom-left">
        <div className='bottom-left-container'>
          <ActiveTrades></ActiveTrades>
          <PieChart />
        </div>
      </div>
    </div>
  );
  }
export default App;

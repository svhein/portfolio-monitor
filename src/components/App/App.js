
import React , { useState, useEffect } from 'react';
import './App.css';
import TickerList from '../TickerList/TickerList.js'
import Totalvalue from '../Totalvalue/Totalvalue.js'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Currencies from '../Currencies/Currencies';
import Infobar from '../Infobar/Infobar';
import Trade from '../TradeForms/Trade'
import ActiveTrades from '../ActiveTrades/ActiveTrades';
import {Login, Logout} from '../Login/Login';
import PieChart from '../PieChart/PieChart';
import { useSelector, useDispatch } from 'react-redux'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { auth, database } from "../../utils/firebase-config.js";
import { onAuthStateChanged} from "firebase/auth";
import {ref, set, child, get} from "firebase/database";
import { UserContext } from '../../utils/userContext';
import {TopGainersPercent, BottomGainersPercent, TopGainersPortfolio, BottomGainersPortfolio} from '../Gainers/Gainers';
import Marquee from '../Marquee/Marquee'


function App(props) {

  const [user, setUser] = useState(null);

  const storeData = useSelector((store) => store.tickers)
  const storeInitialized = useSelector((store) => store.IsInitialized)
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, function(user){
      if (user){
        setUser(user)
        // console.log('user uid', auth.currentUser.uid)
        get(child(ref(database), 'users/' + user.uid)).then((snapshot) => {
          if(snapshot.exists()){
            // if user exists, read data from db and update redux
            get(child(ref(database), 'users/' + user.uid + '/portfolios/main'))
                .then(snapshot => {
                    console.log(snapshot.val())

                    let portfolio = snapshot.val();

                    console.log('portfolio from db')
                    console.log(portfolio)

                    // create list of ticker symbols in db
                    let tickerList = []
                    for (let i = 0; i < portfolio.length; i++){
                        tickerList.push(portfolio[i].id)
                    }
                    
                    console.log('setting tickers to store... (Login.js)')
                    console.log(tickerList)
                    dispatch({ type: 'SET_TICKERS', payload: portfolio })
                })
        }
        })
      } else {
        console.log('user not logged in')
        fetch('https://portfolioserver-rqvj6ywtea-lz.a.run.app//portfolio/default')
          .then(result => result.json())
          // .then(result => console.log(result))
          .then(result => dispatch({type: 'SET_TICKERS', payload: result}))
      }
    })
  },[])

  function logOutClick(){
    auth.signOut()
      .then(() => {
        console.log('Succesfully logged out')
        setUser(null);
      })
      .catch((err) => {
        console.log("Logout failed: " + err)
      })
  }

  return (
    <div className = "background">
      <UserContext.Provider value={user}>
        <div className = 'centerContainer'>
          <TickerList className='tickerList'/>
          <Marquee />
          <div className = 'infoRow'>
            <Infobar />
            <TopGainersPercent />
            <BottomGainersPercent />
          </div>
          <div className='infoRow'>
            <TopGainersPortfolio />
            <BottomGainersPortfolio />
          </div>
          <div className='loginRow'>
            {user ? <Logout className = 'logout' logOutClick={logOutClick}/> : <Login />}
          </div>
        </div>
      </UserContext.Provider>
    </div>
  );
}
export default App;

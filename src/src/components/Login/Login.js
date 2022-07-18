import React from 'react'
import './Login.css'
import {auth, googleProvider, database} from "../../firebase-config.js"
import {signInWithPopup} from 'firebase/auth'
import {ref, set, child, get} from "firebase/database";
import { useDispatch, useSelector } from 'react-redux'

function Login(props) {

    const dispatch = useDispatch();

    function logInWithGoogle(){
        
        const result = signInWithPopup(auth, googleProvider).then((result) => {

            const user = result.user;
            console.log(user);
        
            // check if user exists
            get(child(ref(database), 'users/' + user.uid)).then((snapshot) => {
                if(snapshot.exists()){
                    // if user exists, read data from db and update redux
                    get(child(ref(database), 'users/' + user.uid + '/portfolios/main'))
                        .then(snapshot => {
                            console.log(snapshot.val())

                            let portfolio = snapshot.val();

                            // create list of ticker symbols in db
                            let tickerList = []
                            for (let i = 0; i < portfolio.length; i++){
                                tickerList.push(portfolio[i].tickerSymbol)
                            }

                            console.log(tickerList)
                            dispatch({ type: 'SET_TICKERS', payload: tickerList })

                        })
                } else {

                    // add new user to db
                    set(ref(database, 'users/' + result.user.uid), {
                        name: result.user.displayName
                    })
                    set(ref(database, `users/${result.user.uid}/portfolios/main`), {
                        0: {"tickerSymbol": "NOKIA.HE", "amount": 1000},
                        1: {"tickerSymbol": "AAPL", "amount": 500}
                    })
                }
                })   
        });
           
    }

    return (
        <>
            <button className="login_button" onClick={logInWithGoogle}>Google Sign In</button>
            {props.user ? <p style={{color: 'white'}}>{props.user.displayName}</p> : null};
        </>
  )
}

export default Login

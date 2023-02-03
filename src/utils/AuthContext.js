import React, { useState, useEffect, useContext } from 'react';
import { auth, googleProvider, database } from './firebase-config';
import { useDispatch, useSelector } from 'react-redux'
import {ref, set, child, get} from "firebase/database";
import {signInWithPopup, signOut} from 'firebase/auth'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children}){

    const [user, setUser] = useState(null);

    
    function GoogleLoginButton(props) {

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
                    } else {
    
                        // add new user to db
                        set(ref(database, 'users/' + result.user.uid), {
                            name: result.user.displayName
                        })
    
                        // set default portfolio
                        set(ref(database, `users/${result.user.uid}/portfolios/main`), {
                            0: {"tickerSymbol": "NOKIA.HE", "amount": 1, 'changePercent': 0, 'currency': 'EUR', 'price': 5}
                        })
                    }
                    })   
            });
               
        }
    
        return (
            <>
                <button className="login_button" onClick={logInWithGoogle}>Google Sign In</button>
                {/* {props.user ? <p style={{color: 'white'}}>{props.user.displayName}</p> : null}; */}
            </>
      )
    }
    
    function LogoutButton(props){
        // const user = useContext(UserContext);
        const dispatch = useDispatch();
        
        async function signUserOut(){
        signOut(auth)   
            .then(props.logOutClick)
            .then(dispatch({type: 'USER_LOGOUT'}))
            .then(() => console.log('Logout succesful'))
            .catch(e => console.log('Error on logout', e))
        console.log(user)
        }
    
        return (
                <p className = 'logout'>
                    Logged in as {user.displayName}{'  '} <button className = 'logout_button' onClick={async() => signUserOut()}>Sign Out</button>
                </p> 
        )
    }

    function logout(){
        return auth.logout();
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setUser(user); // user || null;
            console.log('user set to ' + user);
        })

        return unsub;
    }, []);
    
    const value = {
        user,
        GoogleLoginButton,
        LogoutButton

    }

    return ( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

import React, { useState, useEffect, useContext } from 'react';
import { auth, googleProvider, database } from './firebase-config';
import { useDispatch, useSelector } from 'react-redux'
import {ref, set, child, get} from "firebase/database";
import {signInWithPopup,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children}){

    const [user, setUser] = useState(null);
    const navigate = useNavigate();


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
                                navigate("/")
                            })
                    } else {
                        // add new user to db
                        fetch('https://portfolioserver-rqvj6ywtea-lz.a.run.app//portfolio/default') // fetch default portfolio
                            .then(respond => respond.json())
                            .then(respond => {
                                // add new user to db
                                set(ref(database, 'users/' + result.uid), {
                                    name: (result.user.displayName || result.user.email)
                                })
                                // set default portfolio
                                set(ref(database, `users/${result.user.uid}/portfolios/main`), respond)
                                console.log('default portfolio set:')
                                console.log(respond)
                                navigate("/")
                           })
                    }
                    })   
            });
               
        }
    
        return (
            <>
                <button className="googleButton" onClick={logInWithGoogle}>Login with Google</button>
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
                    Logged in as {user.displayName || user.email}{'  '} <button className = 'logout_button' onClick={async() => signUserOut()}>Sign Out</button>
                </p> 
        )
    }
    
    function signUp(email, password){
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                JSON.stringify(result.user);
                console.log(result.user.email);
                fetch('https://portfolioserver-rqvj6ywtea-lz.a.run.app//portfolio/default') // fetch default portfolio
                    .then(respond => respond.json())
                    .then(respond => {
                        // add new user to db
                        set(ref(database, 'users/' + result.uid), {
                            name: (result.user.displayName || result.user.email)
                        })
                        // set default portfolio
                        set(ref(database, `users/${result.user.uid}/portfolios/main`), respond)
                        console.log('default portfolio set:')
                        console.log(respond)
                        navigate("/")
                    })
            })
            .catch(error => {
                switch (error.code){
                    case 'auth/email-already-in-use':
                      console.log(`Email address ${email} already in use.`);
                      break;
                    case 'auth/invalid-email':
                      console.log(`Email address ${email} is invalid.`);
                      break;
                    case 'auth/operation-not-allowed':
                      console.log(`Error during sign up.`);
                      console.log(error.code)
                      break;
                    case 'auth/weak-password':
                      console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
                      break;
                    default:
                      console.log(error.message);
                      break;
                  }
            })
    }

    function Login(email, password){
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage)
            });
    }

    function logout(){
        return auth.logout();
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setUser(user); // user || null;
            JSON.stringify(user)
            console.log('user set to ' + (user.displayName || user.email || null));
        })

        return unsub;
    }, []);
    
    const value = {
        user,
        GoogleLoginButton,
        LogoutButton,
        signUp,
        Login

    }

    return ( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

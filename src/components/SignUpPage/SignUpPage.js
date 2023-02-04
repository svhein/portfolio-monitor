import React, { useState } from 'react';
import './SignUpPage.css'
import { useAuth } from '../../utils/AuthContext'; 
import { useNavigate } from 'react-router-dom'

function SignUpPage(){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const { signUp } = useAuth();
    const navigate = useNavigate();

    function handleSignUpButtonClick(event){
        event.preventDefault();
        console.log('handler fired')
        if (password === confirmPassword){
            signUp(email, password);
        }
        else{
            console.log("Passwords doesnt match")
        }
    }

    return(
        <div className = 'SignUpPage'>
            <div className = 'formWrapper'>
                <div className='arrowDiv' onClick={() => navigate("/login")}>
                    <span>&#171;</span>
                </div>
            <h1>Sign Up</h1>
                <form onSubmit={handleSignUpButtonClick}>
                    <div className='signUpRow'>
                        <p>Email Address</p>
                        <input 
                            type="text"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='signUpRow'>
                        <p>Password</p>
                        <input 
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className='signUpRow'>
                        <p>Confirm Password</p>
                        <input 
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>
                    <div style={{textAlign: "center"}} >
                        <input className="signUpButton" type="submit" value="Create Account" ></input>
                    </div>
                </form>
        
            </div>
           
        </div>
        );

}

export default SignUpPage;
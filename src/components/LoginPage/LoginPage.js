import React, { useState } from 'react';
import "./LoginPage.css"
import { useAuth } from '../../utils/AuthContext'; 
import { useNavigate } from 'react-router-dom'

function LoginPage(props){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { Login, GoogleLoginButton } = useAuth();
    const navigate = useNavigate();

    function handleLogin(event){
        event.preventDefault();
        console.log('handler fired')
        Login(email, password);
    }

    return(
        <div className = 'loginPage'>
            <div className = 'formWrapper'>
                <div className='arrowDiv' onClick={() => navigate("/")}>
                    <span>&#171;</span>
                </div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className='loginRow'>
                        <p>Email Address</p>
                        <input 
                            type="text"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='loginRow'>
                        <p>Password</p>
                        <input 
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div style={{textAlign: "center"}}>
                        <input className="loginButton" type="submit" value="Login" ></input>
                    </div>
                </form>
                <div>
                    <div style={{textAlign: "center", marginTop: 30}}>
                        <h3>or</h3>
                    </div>
                    <div>
                        <button className="toSignUpButton" onClick={() => navigate("/signup")}>Sign Up</button>
                        {GoogleLoginButton()}
                    </div>
                </div>
        
            </div>
           
        </div>
        );
}

export default LoginPage;
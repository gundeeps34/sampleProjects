import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const divStyle= {
        margin: "0",
        fontFamily: " -apple-system, BlinkMacSystemFont,'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue','sans-serif'",
      }

  return (
    <div className="App" style={divStyle}>
      <header className="App-header">
        <div className="login-container">
          {/* <img
            src={logo}  
            alt="YouTube Logo"
            className="youtube-logo"
          /> */}
          <p className='title'>Sign in </p>
          <p className='title1'>to continue recipe finder</p>
          <input className='youtube-input' type="text" placeholder="Email or phone" />
          <p className='forgot1'>Forgot email?</p>
          {/* <input className='youtube-input' type="password" placeholder="Password" /> */}
          <p className='title1'>Not your computer? Use Guest mode to sign in privately. <p className='forgot'>Learn more</p></p>
          
          <div className='holder'>
          <p className='forgot'>Create account</p>
          <button className="login-button" onClick={() => navigate("/home")}>Next</button>
          </div>
      
        </div>
      </header>
    </div>
  );
}

export default LoginPage;
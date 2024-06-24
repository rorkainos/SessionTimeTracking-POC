import React from 'react';
import { Link } from 'react-router-dom';
import '../css/about.css';
import useSessionTimer, { SessionStateConfiguration } from '../utils/SessionTimer';

const About: React.FC = () => {

  const sessionStateInterceptor: SessionStateConfiguration = {
    onIdle: () => {
      console.log("POC to show interceptor logic functionality available for idle, active and prompt");
    }
  };
  
  const {timeTillPrompt, remainingTime, open, state, activate} = useSessionTimer(sessionStateInterceptor);
  
  return (
    <div>
      <h1>About State Page</h1>
      <p>Current State: {state}</p>
      {timeTillPrompt > 0 && (
        <p>{timeTillPrompt} second until prompt</p>
      )}
      <div className='modal' style={{ display: open ? 'flex' : 'none' }}>
      <h3>Are you still here?</h3>
      <p>Logging out in {remainingTime} seconds</p>
      <button onClick={activate}>I'm still here</button>
    </div>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default About;

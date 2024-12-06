import React from 'react';
import '../styles/StartScreen.css';


const StartScreen = ({ onStart }) => {
  return (
      <div className="start-screen">
          <h1 className="start-title">ZomSurv</h1>
          <button className="start-button" onClick={onStart}>
              Survive?!
          </button>
      </div>
  );
};

export default StartScreen;


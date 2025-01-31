import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "../styles.css";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">¡Listo!</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

export default function CuentaAtras({setVerCuentaAtras, setVerPartida}) {

 
  return (
    <div className="App">
      <h1 className="tw-mt-3">Preparando preguntas...</h1>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={3}
          colors={["#004777", "#F7B801", "#A30000", "#0000FF"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => {
            setVerCuentaAtras(false);
            setVerPartida(true);
            return { shouldRepeat: false, delay: 1 }; 
            
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>      
    </div>
  );
}
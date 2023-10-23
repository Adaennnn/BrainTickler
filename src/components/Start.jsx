import React from "react";

function Start({ startConfiguringQuiz }) {
  return (
    <div className="start-container">
      <h1 className="start-title">Quizzical</h1>
      <p className="start-description">You're ready to lose?</p>
      {/* Button that starts quiz configuration */}
      <button className="start-btn" onClick={startConfiguringQuiz}>Start</button>
    </div>
  );
}

export default Start;

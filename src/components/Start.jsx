import React from "react";

function Start({startQuiz}) {
    return (
        <div className="start-container">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-description">You're ready to lose?</p>
            <button className="start-btn" onClick={startQuiz}>Start quiz</button>
        </div>
    );
}

export default Start
import React from "react";

function Start({startQuiz}) {
    return (
        // Wrapper container for the start screen
        <div className="start-container">
            <h1 className="start-title">Quizzical</h1>
            <p className="start-description">You're ready to lose?</p>
            {/* Button that starts the quiz. Calls the startQuiz function passed down as a prop */}
            <button className="start-btn" onClick={startQuiz}>Start quiz</button>
        </div>
    );
}

export default Start
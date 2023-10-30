import React from "react";
import Question from "./Question";
import { useCorrectAnswers } from "../hooks/useCorrectAnswers";
import { buildUndefinedKeysObject } from "../utilities/utility";

const Quiz = ({ 
  quizQuestions, 
  quizCorrectAnswers, 
  quizConfig, 
  setQuizStarted 
}) => {
  
  // Prefix for form field names related to user answers
  const userAnswerKeyPrefix = "userAnswerOfQuestion";
  
  // Destructure the number of questions from quiz configuration
  const { numOfQuestions } = quizConfig;
  
  // Initialize state for storing user's answers to quiz questions
  const [quizUserAnswers, setQuizUserAnswers] = React.useState(
    buildUndefinedKeysObject(numOfQuestions, userAnswerKeyPrefix)
  );
  
  // Initialize state for tracking if the answers have been submitted
  const [answersSubmited, setAnswersSubmited] = React.useState(false);
  
  // Custom hook to determine the number of correct answers
  const correctUserAnswers = useCorrectAnswers(quizUserAnswers, quizCorrectAnswers, answersSubmited);

  // Memoize calculation to check if all questions have been answered
  const allAnswersGiven = React.useMemo(
    () => Object.values(quizUserAnswers).every(answer => answer !== undefined), 
    [quizUserAnswers]
  );

  // Handle changes to quiz answer selections
  const handleChange = (event) => {
    const { value, name } = event.target;
    // Functional update to ensure we're using the latest state
    setQuizUserAnswers(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle quiz form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Only submit if all questions have been answered
    if (allAnswersGiven) {
      setAnswersSubmited(true);
    }
  };

  const restartGame = () => {
    setQuizStarted(false)
  }

  return (
    <form onSubmit={handleSubmit} className="quiz-container">
      <Question 
        quizQuestions={quizQuestions}
        quizCorrectAnswers={quizCorrectAnswers}
        quizUserAnswers={quizUserAnswers}
        userAnswerKeyPrefix={userAnswerKeyPrefix}
        answersSubmited={answersSubmited}
        handleChange={handleChange}
      />
      
      {/* Display game-end screen if answers have been submitted, otherwise show the submit button */}
      {answersSubmited ? (
        <div className="end-game-container">
          <p className="user-score-description">
            You scored {correctUserAnswers.length}/{numOfQuestions} correct answers
          </p>
          <button className="play-again-btn" onClick={restartGame}>Play again</button>
        </div>
      ) : (
        <button 
          className="check-answers-btn"
          disabled={!allAnswersGiven}
          data-tooltip={allAnswersGiven ? "" : "Please answer all questions before submitting."}
        >
          Check answers
        </button>
      )}
    </form>
  );
}

export default Quiz;

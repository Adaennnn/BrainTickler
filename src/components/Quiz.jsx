import React from "react";
import Question from "./Question";
import { useCorrectAnswers } from "../hooks/useCorrectAnswers";
import { buildUndefinedKeysObject } from "../utilities/utility";
// TODO Fix the issue where the submit answer button is still disabled after all answers have been provided (when there are 10 qquestions)
function Quiz({ quizQuestions, quizCorrectAnswers, quizConfig }) {

  // Initialize state variables and other base variables
  const userAnswerKeyBase = "userAnswerOfQuestion";
  const { numOfQuestions } = quizConfig;
  
  const [quizUserAnswers, setQuizUserAnswers] = React.useState(
    buildUndefinedKeysObject(numOfQuestions, userAnswerKeyBase)
  );

  // Use a custom hook to manage user's correct answers
  const correctUserAnswers = useCorrectAnswers(quizUserAnswers, quizCorrectAnswers);

  // useMemo to optimize calculation of whether all answers are given
  const allAnswersGiven = React.useMemo(
    () => Object.values(quizUserAnswers).every(answer => answer !== undefined), 
    [quizUserAnswers, numOfQuestions]
  );

  const [answersSubmited, setAnswersSubmited] = React.useState(false);

  // Event handler for input change (i.e., user selecting an answer)
  function handleChange(event) {
    const { value, name } = event.target;
    setQuizUserAnswers(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  // Event handler for form submission
  function handleSubmit(event) {
    event.preventDefault();
    if (allAnswersGiven) {
      setAnswersSubmited(true);  // If all answers given, set flag to true
    }
  }

  return (
    <form onSubmit={handleSubmit} className="quiz-container">
      <Question 
        quizQuestions={quizQuestions}
        quizCorrectAnswers={quizCorrectAnswers}
        quizUserAnswers={quizUserAnswers}
        userAnswerKeyBase={userAnswerKeyBase}
        answersSubmited={answersSubmited}
        handleChange={handleChange}
      />
      
      {/* Conditional rendering based on whether answers have been submitted */}
      {answersSubmited ? (
        <div className="end-game-container">
          <p className="user-score-description">
            You scored {correctUserAnswers.length}/{numOfQuestions} correct answers
          </p>
          <button className="play-again-btn">Play again</button>
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

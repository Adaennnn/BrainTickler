import React from "react";

function Question({
  quizQuestions,
  quizCorrectAnswers,
  quizUserAnswers,
  userAnswerKeyPrefix,
  answersSubmited,
  handleChange,
}) {
  // Generate quiz UI by mapping over the list of quiz questions.
  const quizElements = quizQuestions.map((quizItem, index) => {
    // Construct the unique key for user's answer to each question.
    const currentQuestionAnswerKey = `${userAnswerKeyPrefix}${index + 1}`;
    const { answers, question } = quizItem;
    // Return a fieldset for each question.
    return (
      <fieldset key={index} className="quiz-item-container">
        {/* Safely inject HTML for the question */}
        <legend className="question" dangerouslySetInnerHTML={{ __html: question }}></legend>
        
        {/* Iterate through each answer to generate the options */}
        {answers.map((answer, i) => {
          // Initialize default answerClass
          let answerClass = "None";

          // Check if the user's answer matches this answer option
          const userInput = quizUserAnswers[currentQuestionAnswerKey] === answer;
          // Check if this answer option is the correct one
          const correctInput = answer === quizCorrectAnswers[index];

          // Determine the appropriate class for the answer
          if (answersSubmited) {
            if (userInput && correctInput) answerClass = "correct-answer";
            else if (userInput) answerClass = "incorrect-answer";
            else if (correctInput) answerClass = "correct-answer";
          } else if (userInput) {
            answerClass = "user-answer";
          }

          // Generate the input and label elements for this answer
          return (
            <div key={i} className="answer-container">
              <input
                className="answer-input"
                type="radio"
                id={`question${index + 1}-answer${i + 1}`}
                name={currentQuestionAnswerKey}
                value={answer}
                checked={quizUserAnswers[currentQuestionAnswerKey] === answer}
                onChange={handleChange}
              />
              {/* Label is styled based on answerClass */}
              <label
                htmlFor={`question${index + 1}-answer${i + 1}`}
                className={answerClass}
                dangerouslySetInnerHTML={{ __html: answer }}
              ></label>
            </div>
          );
        })}
      </fieldset>
    );
  });

  return quizElements;
}

export default Question;

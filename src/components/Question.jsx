import React from "react";

const Question = ({
  quizQuestions,
  quizCorrectAnswers,
  quizUserAnswers,
  userAnswerKeyPrefix,
  answersSubmited,
  handleChange,
}) => {
  
  // Function to determine the appropriate styling class for an answer
  const determineAnswerClass = (userInput, correctInput) => {
    if (answersSubmited) {
      if (userInput && correctInput) return "correct-answer";
      if (userInput) return "incorrect-answer";
      if (correctInput) return "correct-answer";
    } else if (userInput) {
      return "user-answer";
    }
    return "None";
  };

  // Generate quiz UI by mapping over the list of quiz questions
  const quizElements = quizQuestions.map((quizItem, index) => {
    const currentQuestionAnswerKey = `${userAnswerKeyPrefix}${index + 1}`;
    const { answers, question } = quizItem;

    return (
      <fieldset key={index} className="quiz-item-container">
        <legend className="question" dangerouslySetInnerHTML={{ __html: question }}></legend>
        {answers.map((answer, i) => {
          const userInput = quizUserAnswers[currentQuestionAnswerKey] === answer;
          const correctInput = answer === quizCorrectAnswers[index];
          const answerClass = determineAnswerClass(userInput, correctInput);

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
};

export default Question;


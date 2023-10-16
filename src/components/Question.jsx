import React from "react";

function Question({quizQuestions, quizCorrectAnswers, quizUserAnswers, userAnswerKeyBase, answersSubmited, handleChange}) {

    const quizElements = quizQuestions.map((quizItem, index) => {
        const currentQuestionAnswerKey = `${userAnswerKeyBase}${index + 1}`
        const {answers, question} = quizItem
        return (
            <fieldset key={index} className="quiz-item-container">
                <legend className="question" dangerouslySetInnerHTML={{__html: question}}></legend>
                {answers.map((answer, i) => {
                    let answerClass
                    const userInput = quizUserAnswers[currentQuestionAnswerKey] === answer
                    const correctInput = answer === quizCorrectAnswers[index]
                    if (!answersSubmited && userInput) {
                        answerClass = "user-answer"
                    } else if (answersSubmited && userInput) {
                        if (correctInput) {
                            answerClass = "correct-answer"
                        } else {
                            answerClass = "incorrect-answer"
                        }
                    } else if (answersSubmited && !userInput && correctInput) {
                        answerClass = "correct-answer"
                    } else {
                        answerClass = "None"
                    }
                    return (
                        <div key={i} className="answer-container">
                        <input 
                            className="answer-input"
                            type="radio"
                            id={`question${index + 1}-answer${i + 1}`}
                            name={currentQuestionAnswerKey}
                            value={answer}
                            checked={quizUserAnswers[currentQuestionAnswerKey] === answer}
                            onChange={(event) => handleChange(event)}
                        />    
                        <label htmlFor={`question${index + 1}-answer${i + 1}`} className={answerClass} dangerouslySetInnerHTML={{__html: answer}} ></label> 
                    </div>
                    )
                    }
                )}
            </fieldset>
        )
    })

    return (
        quizElements
    )
}

export default Question
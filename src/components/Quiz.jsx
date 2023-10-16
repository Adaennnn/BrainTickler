import React from "react"
import Question from "./Question";
import useCorrectAnswers from "../hooks/useCorrectAnswers";
import { buildUndefinedKeysObject } from "../utilities/utility"

function Quiz({quizQuestions, quizCorrectAnswers, quizConfig}) {
    //TODO Refactor this component so that it handles less logic and more rendering, the rest of the logic should be handled in Question component
    const userAnswerKeyBase = "userAnswerOfQuestion";
    const {numOfQuestions} = quizConfig
    const [quizUserAnswers, setQuizUserAnswers] = React.useState(buildUndefinedKeysObject(numOfQuestions, userAnswerKeyBase))
    // We use a custom hook to manage the logic of counting user's correct answers, making the component code cleaner.
    const correctUserAnswers = useCorrectAnswers(quizUserAnswers, quizCorrectAnswers)
    // useMemo is used to optimize the calculation of whether all answers are given, it only recalculates when quizUserAnswers or numQuestions changes.
    const allAnswersGiven = React.useMemo(() => 
    Object.keys(quizUserAnswers).length === numOfQuestions, 
    [quizUserAnswers, numOfQuestions]
    );
    const [answersSubmited, setAnswersSubmited] = React.useState(false)

    function handleChange(event) {
        const {value, name} = event.target
        setQuizUserAnswers(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (allAnswersGiven) {
            setAnswersSubmited(true)
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

            {
                answersSubmited

                ?

                <div className="end-game-container">
                    <p className="user-score-description">You scored {correctUserAnswers.length}/5 correct answers</p>
                    <button className="play-again-btn">Play again</button>
                </div>

                :
                
                <button className="check-answers-btn" style={{cursor: allAnswersGiven ? "pointer" : "not-allowed"}}>Check answers</button>
            }
        </form>
    );
}

export default Quiz
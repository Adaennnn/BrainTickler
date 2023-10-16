import React from "react";

function useCorrectAnswers(quizUserAnswers, quizCorrectAnswers) {
    const [correctUserAnswers, setCorrectUserAnswers] = React.useState([])
    React.useEffect(() => {
        let tempCorrectUserAnswers = []
        for (const quizItem in quizUserAnswers) {
            const currentAnswer = quizUserAnswers[quizItem]
            const correctUserAnswer = quizCorrectAnswers.find(answer => answer === currentAnswer)
            correctUserAnswer && tempCorrectUserAnswers.push(correctUserAnswer)
        }
    setCorrectUserAnswers(tempCorrectUserAnswers);
    }, [quizUserAnswers, quizCorrectAnswers])
    return correctUserAnswers
}

export default useCorrectAnswers
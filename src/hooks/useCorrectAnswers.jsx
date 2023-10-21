import React from "react";

export const useCorrectAnswers = (quizUserAnswers, quizCorrectAnswers) => {
    // State to hold correct answers that the user provided
    const [correctUserAnswers, setCorrectUserAnswers] = React.useState([])

    // useEffect to update the state whenever quizUserAnswers or quizCorrectAnswers change
    React.useEffect(() => {
        // Temporary array to hold correct answers
        let tempCorrectUserAnswers = []

        // Loop through the user's answers
        for (const quizItem in quizUserAnswers) {
            // Fetch the current answer given by the user
            const currentAnswer = quizUserAnswers[quizItem]

            // Check if the user's answer is correct
            const correctUserAnswer = quizCorrectAnswers.find(answer => answer === currentAnswer)

            // If correct, add it to the temporary array
            correctUserAnswer && tempCorrectUserAnswers.push(correctUserAnswer)
        }

        // Update the state with the correct answers
        setCorrectUserAnswers(tempCorrectUserAnswers);
    }, [quizUserAnswers, quizCorrectAnswers])

    // Return the array of correct answers
    return correctUserAnswers
}

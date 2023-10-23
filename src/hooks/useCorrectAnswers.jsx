import React from "react";

export const useCorrectAnswers = (quizUserAnswers, quizCorrectAnswers) => {
    // State to hold user-provided correct answers
    const [correctUserAnswers, setCorrectUserAnswers] = React.useState([]);

    // Update state based on quizUserAnswers and quizCorrectAnswers
    React.useEffect(() => {
        let tempCorrectUserAnswers = []; // Temporary array to hold correct answers

        // Loop through user's answers
        for (const quizItem in quizUserAnswers) {
            const currentAnswer = quizUserAnswers[quizItem]; // Current user answer

            // Find matching correct answer
            const correctUserAnswer = quizCorrectAnswers.find(answer => answer === currentAnswer);

            // If found, add to temporary array
            if (correctUserAnswer) {
                tempCorrectUserAnswers.push(correctUserAnswer);
            }
        }

        // Update state with array of correct answers
        setCorrectUserAnswers(tempCorrectUserAnswers);
    }, [quizUserAnswers, quizCorrectAnswers]);

    return correctUserAnswers; // Return array of correct answers
};

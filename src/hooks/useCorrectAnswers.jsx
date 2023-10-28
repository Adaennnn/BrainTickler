import React from "react";

// Custom hook to determine correct answers provided by the user in a quiz.
export const useCorrectAnswers = (quizUserAnswers, quizCorrectAnswers, answersSubmited) => {
    // State to hold user-provided correct answers
    const [correctUserAnswers, setCorrectUserAnswers] = React.useState([]);

    // Update state based on quizUserAnswers and quizCorrectAnswers
    React.useEffect(() => {
        // Temporary array to hold correct answers
        let tempCorrectUserAnswers = [];

        // Convert user answers object to an array for easier comparison
        const quizUserAnswersArray = Object.values(quizUserAnswers);

        // Loop through each correct answer to see if the user got it right
        for (let i = 0; i < quizCorrectAnswers.length; i++) {
            const currentCorrectAnswer = quizCorrectAnswers[i];
            const currentUserAnswer = quizUserAnswersArray[i];

            if (currentCorrectAnswer === currentUserAnswer) {
                tempCorrectUserAnswers.push(currentUserAnswer);
            }
        }

        // Update the state with correct answers
        setCorrectUserAnswers(tempCorrectUserAnswers);
    }, [answersSubmited]);

    // Return array of correct answers
    return correctUserAnswers;
};

import React from "react";

// Custom hook to determine correct answers provided by the user in a quiz.
export const useCorrectAnswers = (
  quizUserAnswers, 
  quizCorrectAnswers, 
  answersSubmited
  ) => {
    const [correctUserAnswers, setCorrectUserAnswers] = React.useState([]);

    React.useEffect(() => {
        // If the lengths aren't the same, they can't be equal
        if (quizCorrectAnswers.length !== Object.keys(quizUserAnswers).length) {
            setCorrectUserAnswers([]);
            return;
        }

        // Convert user answers object to an array
        const quizUserAnswersArray = Object.values(quizUserAnswers);

        // Find and collect correct answers
        const tempCorrectUserAnswers = quizCorrectAnswers.filter((correctAnswer, index) => {
            return correctAnswer === quizUserAnswersArray[index];
        });

        setCorrectUserAnswers(tempCorrectUserAnswers);
    }, [answersSubmited]);

    return correctUserAnswers;
};

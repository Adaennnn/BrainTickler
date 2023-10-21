import React from "react";
import { sanitize, shuffle } from "../utilities/utility";

// Custom hook to fetch and process quiz data based on given quiz configuration.
export const useFetchQuiz = (quizConfig) => {
    // State to store the processed quiz questions.
    const [quizQuestions, setQuizQuestions] = React.useState([]);
    // State to store the correct answers of the quiz.
    const [quizCorrectAnswers, setQuizCorrectAnswers] = React.useState([]);

    // Generates API URL based on the provided quiz configuration.
    const generateApiUrl = (config) => {
        const { numOfQuestions, category, difficulty, type } = config;
        return `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;
    };

    // Process the fetched quiz data, sanitize it, and store it in states.
    const processQuizData = (data) => {
        const sanitizedQuizQuestions = sanitize(data);
        const correctAnswers = sanitizedQuizQuestions.map(quiz => quiz.correct_answer);
        const processedQuizQuestions = sanitizedQuizQuestions.map(quiz => {
            const { correct_answer, incorrect_answers } = quiz;
            return {
                question: quiz.question,
                answers: shuffle([...incorrect_answers, correct_answer])
            };
        });
        setQuizQuestions(processedQuizQuestions);
        setQuizCorrectAnswers(correctAnswers);
    };

    // useEffect to fetch data once the quizConfig changes.
    React.useEffect(() => {
        const apiUrl = generateApiUrl(quizConfig);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => processQuizData(data.results));
    }, [quizConfig]);

    // Return the processed quiz questions and their correct answers.
    return [quizQuestions, quizCorrectAnswers];
};

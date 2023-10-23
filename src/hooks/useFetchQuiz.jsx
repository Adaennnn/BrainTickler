import React from "react";
import { sanitize, shuffle } from "../utilities/utility";

export const useFetchQuiz = (quizConfig) => {
    // State Variables
    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [quizCorrectAnswers, setQuizCorrectAnswers] = React.useState([]);

    // Generate API URL based on quizConfig
    const generateApiUrl = (config) => {
        const { numOfQuestions, category, difficulty, type } = config;
        return `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;
    };

    // Process and Store Fetched Quiz Data
    const processQuizData = (data) => {
        const sanitizedQuizQuestions = sanitize(data);
        const correctAnswers = sanitizedQuizQuestions.map(quiz => quiz.correct_answer);

        // Shuffle and prepare quiz questions
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

    // Fetch and Process Data on quizConfig change
    React.useEffect(() => {
        const apiUrl = generateApiUrl(quizConfig);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => processQuizData(data.results));
    }, [quizConfig]);

    return [quizQuestions, quizCorrectAnswers];
};

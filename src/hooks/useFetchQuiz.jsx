import React from "react";
import { sanitize, shuffle } from "../utilities/utility";

function useFetchQuiz(quizConfig, shouldFetch, setHasInsufficientQuestions, setConfiguringQuiz, setQuizStarted) {
    // State Variables
    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [quizCorrectAnswers, setQuizCorrectAnswers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // Generate API URL based on quizConfig
    function generateApiUrl(config) {
        const { numOfQuestions, category, difficulty, type } = config;
        return `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;
    };

    // Process and Store Fetched Quiz Data
    function processQuizData(data) {
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
        if (!shouldFetch) return;
        setIsLoading(true);
        const apiUrl = generateApiUrl(quizConfig);
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.response_code === 1) {
                    setQuizStarted(false);
                    setHasInsufficientQuestions(true);
                    setIsLoading(false);
                    setConfiguringQuiz(true);
                    throw new Error("Oops! We couldn't find enough questions for your selected Configuration.");
                }
                setHasInsufficientQuestions(false);
                processQuizData(data.results);
                setIsLoading(false);
                setError(null);  // Reset any existing errors
            })
            .catch(error => {
                setError(error.message);  // Set error message
                setIsLoading(false);
            });
    }, [quizConfig, shouldFetch, setHasInsufficientQuestions, setConfiguringQuiz, setQuizStarted]);

    return [quizQuestions, quizCorrectAnswers, isLoading, error];
};

export default useFetchQuiz;

import React from "react";
import { sanitize, shuffle } from "../utilities/utility";

export const useFetchQuiz = (
  quizConfig, 
  shouldFetch, 
  setHasInsufficientQuestions, 
  setConfiguringQuiz, 
  setQuizStarted
  ) => {

  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [quizCorrectAnswers, setQuizCorrectAnswers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Generate API URL based on quizConfig
  const generateApiUrl = (config) => {
    const { numOfQuestions, category, difficulty, type } = config;
    return `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;
  };

  // Process and Store Fetched Quiz Data
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

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(generateApiUrl(quizConfig));
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (data.response_code === 1) {
          setQuizStarted(false);
          setHasInsufficientQuestions(true);
          setIsLoading(false);
          setConfiguringQuiz(true);
          throw new Error("Oops! We couldn't find enough questions for your selected Configuration.");
        }

        // Reset any existing errors and process the fetched data
        setError(null);
        setHasInsufficientQuestions(false);
        processQuizData(data.results);
        setIsLoading(false);

      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (shouldFetch) {
      fetchData();
    }
  }, [quizConfig, shouldFetch, setHasInsufficientQuestions, setConfiguringQuiz, setQuizStarted]);

  return [quizQuestions, quizCorrectAnswers, isLoading, error];
};

import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import DOMPurify from "dompurify";
import { shuffle, sanitize } from "./utilities/utility";

function App() {
    // Initialize state variables
    const [quizQuestions, setQuizQuestions] = React.useState([])
    const [quizCorrectAnswers, setQuizCorrectAnswers] = React.useState([])
    const [quizStarted, setQuizStarted] = React.useState(false)
    
    // Initialize quiz configuration with default values
    const [quizConfig, setQuizConfig] = React.useState({
        numOfQuestions: 5,
        category: 11,
        difficulty: "medium",
        type: "multiple"
    })

    // Create API URL based on the quiz configuration
    const quizApiUrl = React.useMemo(() => (
        `https://opentdb.com/api.php?amount=${quizConfig.numOfQuestions}&category=${quizConfig.category}&difficulty=${quizConfig.difficulty}&type=${quizConfig.type}`
    ), [quizConfig])

    // Fetch quiz questions using the API URL
    React.useEffect(() => {
        fetch(quizApiUrl)
            .then(response => response.json())
            .then(data => {
                const fetchedQuizQuestions = data.results
                const sanitizedQuizQuestions = sanitize(fetchedQuizQuestions)
                // Extract correct answers
                const correctAnswers = sanitizedQuizQuestions.map(quiz => {
                    const {correct_answer} = quiz
                    return correct_answer
                })
                // Process quiz questions to include shuffled answers
                const processedQuizQuestions = sanitizedQuizQuestions.map(quiz => {
                    const {correct_answer, incorrect_answers, question} = quiz
                    return {
                        question: question,
                        answers: shuffle([...incorrect_answers, correct_answer])
                    }
                })
                setQuizQuestions(processedQuizQuestions)
                setQuizCorrectAnswers(correctAnswers)
            });
    }, [quizApiUrl]);

    // Function to toggle quiz start state
    function startQuiz() {
        setQuizStarted(prevStarted => !prevStarted)
    }

    return (
        <div>
            {
                // Conditional rendering based on quiz start status
                !quizStarted

                ?

                <Start 
                    startQuiz={startQuiz}
                />

                :

                <Quiz
                    quizQuestions={quizQuestions} 
                    quizCorrectAnswers={quizCorrectAnswers}
                    quizConfig={quizConfig}
                />
            }
        </div>
    );
}

export default App
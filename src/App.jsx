import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Configuration from "./components/Configuration";
import { useFetchQuiz } from "./hooks/useFetchQuiz";

function App() {
    // State to store quiz configuration.
    const [quizConfig, setQuizConfig] = React.useState({
        numOfQuestions: 5,
        category: 11,
        difficulty: "medium",
        type: "multiple"
    });

    // Use the custom hook to get the processed quiz questions and correct answers based on quizConfig.
    const [quizQuestions, quizCorrectAnswers] = useFetchQuiz(quizConfig);

    // State to track if the quiz is being configured or not.
    const [configuringQuiz, setConfiguringQuiz] = React.useState(false);
    // State to track if the quiz has started.
    const [quizStarted, setQuizStarted] = React.useState(false);
    // Function to toggle the quiz start state.
    const startConfiguringQuiz = () => {
        setConfiguringQuiz(true);
    }

    return (
        <div>
            {
                // TODO 1 - Create the initial start screen that should render a "Start configuration" button
                // TODO 2 - Create the configuration screen that should render a form with the following fields: number of questions, category, difficulty, type
                // TODO 3 - Once the configuration is submitted, fetch the quiz questions and correct answers using the useFetchQuiz hook
                // TODO 4 - Render the quiz screen that should render the quiz questions and answers
                // TODO 5 - Once the quiz is submitted, render the end screen that should render the score and a "Play again" button
                // Conditional rendering based on whether the quiz is being configured, the quiz has started, or both.
                !configuringQuiz && !quizStarted ?
                <Start 
                    startConfiguringQuiz={startConfiguringQuiz}
                /> :
                !quizStarted ?
                <Configuration
                    quizConfig={quizConfig}
                    setQuizConfig={setQuizConfig}
                    setConfiguringQuiz={setConfiguringQuiz}
                    setQuizStarted={setQuizStarted}
                /> :
                <Quiz 
                    quizQuestions={quizQuestions} 
                    quizCorrectAnswers={quizCorrectAnswers} 
                    quizConfig={quizConfig}
                />
            }
        </div>
    );
}

export default App;

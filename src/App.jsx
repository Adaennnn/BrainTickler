import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
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

    // State to track if the quiz has started.
    const [quizStarted, setQuizStarted] = React.useState(false);
    // Function to toggle the quiz start state.
    const startQuiz = () => setQuizStarted(prevStarted => !prevStarted);

    return (
        <div>
            {
                // Conditional rendering: Display Start component if quiz hasn't started, otherwise display the Quiz component.
                !quizStarted
                ? <Start startQuiz={startQuiz} />
                : <Quiz quizQuestions={quizQuestions} quizCorrectAnswers={quizCorrectAnswers} quizConfig={quizConfig} />
            }
        </div>
    );
}

export default App;

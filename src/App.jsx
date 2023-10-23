import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Configuration from "./components/Configuration";
import { useFetchQuiz } from "./hooks/useFetchQuiz";

function App() {
  // State for quiz configuration
  const [quizConfig, setQuizConfig] = React.useState({
    numOfQuestions: 5,
    category: 11,
    difficulty: "medium",
    type: "multiple"
  });

  // Custom hook to fetch quiz questions based on quiz configuration
  const [quizQuestions, quizCorrectAnswers] = useFetchQuiz(quizConfig);

  // State for controlling quiz flow
  const [configuringQuiz, setConfiguringQuiz] = React.useState(false);
  const [quizStarted, setQuizStarted] = React.useState(false);

  // Function to start quiz configuration
  function startConfiguringQuiz() {
    setConfiguringQuiz(true);
  }

  return (
    <div>
      {
        // Conditional rendering based on quiz state
        !configuringQuiz && !quizStarted ? (
          <Start startConfiguringQuiz={startConfiguringQuiz} />
        ) : !quizStarted ? (
          <Configuration
            quizConfig={quizConfig}
            setQuizConfig={setQuizConfig}
            setConfiguringQuiz={setConfiguringQuiz}
            setQuizStarted={setQuizStarted}
          />
        ) : (
          <Quiz
            quizQuestions={quizQuestions}
            quizCorrectAnswers={quizCorrectAnswers}
            quizConfig={quizConfig}
          />
        )
      }
    </div>
  );
}

export default App;

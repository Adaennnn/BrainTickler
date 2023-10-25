import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Configuration from "./components/Configuration";
import useFetchQuiz from "./hooks/useFetchQuiz";

function App() {
  // State for quiz configuration
  const [quizConfig, setQuizConfig] = React.useState({
    numOfQuestions: 5,
    category: 11,
    difficulty: "medium",
    type: "multiple"
  });

  // State for controlling quiz flow
  const [configuringQuiz, setConfiguringQuiz] = React.useState(false);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [shouldFetch, setShouldFetch] = React.useState(false)
  const [hasInsufficientQuestions, setHasInsufficientQuestions] = React.useState(false);

  // Custom hook to fetch quiz questions based on quiz configuration
  const [quizQuestions, quizCorrectAnswers, isLoading, error] = useFetchQuiz(quizConfig, shouldFetch, setHasInsufficientQuestions, setConfiguringQuiz, setQuizStarted);

  console.log(error)

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
            setShouldFetch={setShouldFetch}
            error={error}
            setHasInsufficientQuestions={setHasInsufficientQuestions}
          />
        ) : isLoading ? (
          <div className="placeholder-container">
            <p className="placeholder-description">Summoning the questions from the trivia realms...</p>
          </div>
        ) :
        (
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

import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Configuration from "./components/Configuration";
import useFetchQuiz from "./hooks/useFetchQuiz";

const App = () => {
  // State for quiz configuration
  const [quizConfig, setQuizConfig] = React.useState({
    numOfQuestions: 5,
    category: 11,
    difficulty: "medium",
    type: "multiple"
  });

  // State variables to control quiz flow
  const [configuringQuiz, setConfiguringQuiz] = React.useState(false);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [shouldFetch, setShouldFetch] = React.useState(false);
  const [hasInsufficientQuestions, setHasInsufficientQuestions] = React.useState(false);

  // Custom hook to fetch quiz questions based on configuration
  const [quizQuestions, quizCorrectAnswers, isLoading, error] = useFetchQuiz(
    quizConfig,
    shouldFetch,
    setHasInsufficientQuestions,
    setConfiguringQuiz,
    setQuizStarted
  );

  // Function to start the quiz configuration process
  const startConfiguringQuiz = () => {
    setConfiguringQuiz(true);
  };

  // Function to handle conditional rendering logic
  const renderComponent = () => {
    // Show the Start component if the quiz is neither being configured nor started
    if (!configuringQuiz && !quizStarted) {
      return <Start startConfiguringQuiz={startConfiguringQuiz} />;
    }
    // Show the Configuration component if the quiz is being configured but not started
    if (!quizStarted) {
      return (
        <Configuration
          quizConfig={quizConfig}
          setQuizConfig={setQuizConfig}
          setConfiguringQuiz={setConfiguringQuiz}
          setQuizStarted={setQuizStarted}
          setShouldFetch={setShouldFetch}
          error={error}
          setHasInsufficientQuestions={setHasInsufficientQuestions}
        />
      );
    }
    // Show a loading state if the quiz questions are being fetched
    if (isLoading) {
      return (
        <div className="placeholder-container">
          <p className="placeholder-description">Summoning the questions from the trivia realms...</p>
        </div>
      );
    }
    // Show the Quiz component if the quiz has started
    return (
      <Quiz
        quizQuestions={quizQuestions}
        quizCorrectAnswers={quizCorrectAnswers}
        quizConfig={quizConfig}
      />
    );
  };

  return (
    <div>
      {renderComponent()}
    </div>
  );
};

export default App;

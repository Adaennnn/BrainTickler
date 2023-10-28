import React from "react";
import Select from "./Select";

// Main Configuration component
const Configuration = ({
  quizConfig, 
  setQuizConfig, 
  setQuizStarted, 
  setConfiguringQuiz,
  setShouldFetch,
  error,
  setHasInsufficientQuestions
}) => {
  
  // Initialize local state with quiz configuration from props
  const [localQuizConfig, setLocalQuizConfig] = React.useState(quizConfig);

  // Declaring variables holding all options
  const categoryOptions = [
    { value: '9', label: 'General Knowledge' },
    { value: '10', label: 'Entertainment: Books' },
    { value: '11', label: 'Entertainment: Film' },
    { value: '12', label: 'Entertainment: Music' },
    { value: '13', label: 'Entertainment: Musicals & Theatres' },
    { value: '14', label: 'Entertainment: Television' },
    { value: '15', label: 'Entertainment: Video Games' },
    { value: '16', label: 'Entertainment: Board Games' },
    { value: '17', label: 'Science & Nature' },
    { value: '18', label: 'Science: Computers' },
    { value: '19', label: 'Science: Mathematics' },
    { value: '20', label: 'Mythology' },
    { value: '21', label: 'Sports' },
    { value: '22', label: 'Geography' },
    { value: '23', label: 'History' },
    { value: '24', label: 'Politics' },
    { value: '25', label: 'Art' },
    { value: '26', label: 'Celebrities' },
    { value: '27', label: 'Animals' },
    { value: '28', label: 'Vehicles' },
    { value: '29', label: 'Entertainment: Comics' },
    { value: '30', label: 'Science: Gadgets' },
    { value: '31', label: 'Entertainment: Japanese Anime & Manga' },
    { value: '32', label: 'Entertainment: Cartoon & Animations' }
  ];
  
  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ]

  const typeOptions = [
    { value: 'multiple', label: 'Multiple Choice' },
    { value: 'boolean', label: 'True / False' },
  ]

  // Handle changes in form fields
  const handleChange = (event) => {
    const { value, name } = event.target;
    setLocalQuizConfig(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setQuizConfig(localQuizConfig);
    setShouldFetch(true);
    setHasInsufficientQuestions(false);
    setConfiguringQuiz(false);
    setQuizStarted(true);
  }
  
  return (
    <div className="configuration-container">
      <h1>Configuration</h1>
      {/* Display error message if any */}
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Select
          label="Category"
          id="category"
          name="category"
          value={localQuizConfig.category}
          onChange={handleChange}
          options={categoryOptions}
        />
        <Select
          label="Difficulty"
          id="difficulty"
          name="difficulty"
          value={localQuizConfig.difficulty}
          onChange={handleChange}
          options={difficultyOptions}
        />
        <Select
          label="Type"
          id="type"
          name="type"
          value={localQuizConfig.type}
          onChange={handleChange}
          options={typeOptions}
        />
        <button className="start-quiz-btn">Start Quiz</button>
      </form>
    </div>
  );
}

export default Configuration;

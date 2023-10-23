import React from "react";

function Configuration({
  quizConfig, 
  setQuizConfig, 
  setQuizStarted, 
  setConfiguringQuiz
}) {
  
  // Local state for form data
  const [localQuizConfig, setLocalQuizConfig] = React.useState(quizConfig);

  // Function to handle form changes
  function handleChange(event) {
    const { value, name } = event.target;
    setLocalQuizConfig(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    setQuizConfig(localQuizConfig);
    setConfiguringQuiz(false);
    setQuizStarted(true);
  }

  return (
    <div className="configuration-container">
      <h1>Configuration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category:</label>
        <select 
          name="category"
          id="category"
          value={localQuizConfig.category}
          onChange={handleChange}
        >
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals & Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime & Manga</option>
          <option value="32">Entertainment: Cartoon & Animations</option>
        </select>
        
        <label htmlFor="difficulty">Difficulty:</label>
        <select 
          name="difficulty"
          id="difficulty"
          value={localQuizConfig.difficulty}
          onChange={handleChange}
        >
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        
        <label htmlFor="type">Type:</label>
        <select 
          name="type"
          id="type"
          value={localQuizConfig.type}
          onChange={handleChange}
        >
          <option value="any">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
        
        <button>Start Quiz</button>
      </form>
    </div>
  );
}

export default Configuration;

import React from "react"

function Configuration({quizConfig, setQuizConfig, setQuizStarted, setConfiguringQuiz}) {
    const [localQuizConfig, setLocalQuizConfig] = React.useState(quizConfig)
    function handleChange(event) {
        const {value, name} = event.target
        setLocalQuizConfig(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        setQuizConfig(localQuizConfig)
        setConfiguringQuiz(false)
        setQuizStarted(true)
    }
    return (
        <div className="configuration-container">
            <h1>Configuration</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="numOfQuestions">Number of questions:</label>
                <input 
                    type="number" 
                    name="numOfQuestions" 
                    id="numOfQuestions" 
                    value={localQuizConfig.numOfQuestions} 
                    onChange={handleChange}
                />
                <label htmlFor="category">Category:</label>
                <select 
                    name="category" 
                    id="category" 
                    value={localQuizConfig.category} 
                    onChange={handleChange}>
                    <option value="11">Film</option>
                    <option value="12">Music</option>
                    <option value="13">Musicals &amp; Theatres</option>
                    <option value="14">Television</option>
                </select>
                <label htmlFor="difficulty">Difficulty:</label>
                <select 
                    name="difficulty" 
                    id="difficulty" 
                    value={localQuizConfig.difficulty} 
                    onChange={handleChange}>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label htmlFor="type">Type:</label>
                <select 
                    name="type" 
                    id="type" 
                    value={localQuizConfig.type} 
                    onChange={handleChange}>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
                <button>Start Quiz</button>
            </form>
        </div>
    )
}

export default Configuration
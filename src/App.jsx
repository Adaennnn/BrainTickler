import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import DOMPurify from "dompurify";
import { shuffle, sanitize } from "./utilities/utility";

function App() {
    const [quizQuestions, setQuizQuestions] = React.useState([])
    const [quizCorrectAnswers, setQuizCorrectAnswers] = React.useState([])
    const [quizStarted, setQuizStarted] = React.useState(false)
    //* I've set it as an object, because I might add a feature later that will allow user input to configure what kind of quiz he/she would like
    const [quizConfig, setQuizConfig] = React.useState({
        numOfQuestions: 5,
        category: 11,
        difficulty: "medium",
        type: "multiple"
    })
    const quizApiUrl = React.useMemo(() => (
        `https://opentdb.com/api.php?amount=${quizConfig.numOfQuestions}&category=${quizConfig.category}&difficulty=${quizConfig.difficulty}&type=${quizConfig.type}`
    ), [quizConfig])

    React.useEffect(() => {
        fetch(quizApiUrl)
            .then(response => response.json())
            .then(data => {
                const fetchedQuizQuestions = data.results
                const sanitizedQuizQuestions = sanitize(fetchedQuizQuestions)
                const correctAnswers = sanitizedQuizQuestions.map(quiz => {
                    const {correct_answer} = quiz
                    return correct_answer
                })
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

    function startQuiz() {
        setQuizStarted(prevStarted => !prevStarted)
    }

    return (
        <div>
            {
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
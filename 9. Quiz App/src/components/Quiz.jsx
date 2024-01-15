import { useState } from 'react';
import { QUESTIONS } from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';

export const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;

  if (isQuizCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const handleSelectAnswer = (answer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
  };

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => {
                    handleSelectAnswer(answer);
                  }}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

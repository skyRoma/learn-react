import { useState } from 'react';
import { QUESTIONS } from '../questions';

export const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const handleSelectAnswer = (answer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
  };

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => {
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

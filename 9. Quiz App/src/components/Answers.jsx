import { useRef } from 'react';

export const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
  const shuffledAnswersRef = useRef();

  if (!shuffledAnswersRef.current) {
    shuffledAnswersRef.current = [...answers].sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswersRef.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = '';

        if (isSelected) {
          cssClass = 'selected';
        }
        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => {
                onSelect(answer);
              }}
              className={cssClass}
              disabled={!!answerState}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

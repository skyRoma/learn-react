import { QuestionTimer } from './QuestionTimer';
import { Answers } from './Answers';
import { useState } from 'react';
import { QUESTIONS } from '../questions';

export const Question = ({ index, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: null,
    isCorrect: null,
  });

  let time = 7000;

  if (answer.selectedAnswer) {
    time = 1000;
  }

  if (answer.isCorrect !== null) {
    time = 2000;
  }

  const handleSelectAnswer = (answer) => {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[index].answers[0],
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer
        key={time}
        time={time}
        onTimeout={!answer.selectedAnswer ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

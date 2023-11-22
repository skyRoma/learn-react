import { Header } from './components/Header';
import { UserInput } from './components/UserInput';
import { Results } from './components/Results';
import { useState } from 'react';

export const App = () => {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const inputIsValid = userInput.duration > 0;

  const handleChange = (input, newValue) => {
    setUserInput((userInput) => ({ ...userInput, [input]: +newValue }));
  };

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater then zero.</p>
      )}
      {inputIsValid && <Results userInput={userInput} />}
    </>
  );
};

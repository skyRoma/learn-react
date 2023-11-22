import { calculateInvestmentResults, formatter } from '../util/investment';

export const Results = ({ userInput }) => {
  const resultsData = calculateInvestmentResults(userInput);
  const initialInvestment =
    resultsData[0].valueEndOfYear -
    resultsData[0].interest -
    resultsData[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {resultsData.map(
          ({ year, valueEndOfYear, interest, annualInvestment }) => {
            const totalInterest =
              valueEndOfYear - annualInvestment * year - initialInvestment;
            const totalAmountInvested = valueEndOfYear - totalInterest;

            return (
              <tr key={year}>
                <td>{year}</td>
                <td>{formatter.format(valueEndOfYear)}</td>
                <td>{formatter.format(interest)}</td>
                <td>{formatter.format(totalInterest)}</td>
                <td>{formatter.format(totalAmountInvested)}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

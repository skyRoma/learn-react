import './Expenses.css';
import { useState } from 'react';
import { ExpenseData } from '../../types';
import { Card } from '../UI/Card';
import { ExpensesFilter } from './ExpenseFilter/ExpensesFilter';
import { ExpensesList } from './ExpensesList/ExpensesList';
import { Chart } from '../Chart/Chart';

interface ExpenseProps {
  expenses: ExpenseData[];
}

export const Expenses = ({ expenses }: ExpenseProps) => {
  const [selectedYear, setSelectedYear] = useState('2020');

  const changeFilterHandler = (year: string) => {
    setSelectedYear(year);
  };

  const filteredExpenses = expenses.filter(
    (expense) => expense.date.getFullYear().toString() === selectedYear
  );

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={selectedYear}
        onChangeFilter={changeFilterHandler}
      />
      <Chart items={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
};

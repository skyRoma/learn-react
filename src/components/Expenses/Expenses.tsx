import { useState } from 'react';
import { ExpenseData } from '../../types';
import { Card } from '../UI/Card';
import { ExpensesFilter } from './ExpenseFilter/ExpensesFilter';
import { ExpenseItem } from './ExpenseItem';
import './Expenses.css';

interface ExpenseProps {
  expenses: ExpenseData[];
}

export const Expenses = ({ expenses }: ExpenseProps) => {
  const [selectedYear, setSelectedYear] = useState('2020');

  const changeFilterHandler = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={selectedYear}
        onChangeFilter={changeFilterHandler}
      />
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      />
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
      />
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}
      />
      <ExpenseItem
        title={expenses[3].title}
        amount={expenses[3].amount}
        date={expenses[3].date}
      />
    </Card>
  );
};

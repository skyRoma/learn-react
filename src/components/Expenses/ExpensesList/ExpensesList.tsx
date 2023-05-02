import './ExpensesList.css';
import { ExpenseData } from '../../../types';
import { ExpenseItem } from '../ExpenseItem';

interface ExpensesListProps {
  items: ExpenseData[];
}

export const ExpensesList = ({ items }: ExpensesListProps) => {
  if (items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses</h2>;
  }

  return (
    <ul className="expenses-list">
      {items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
  );
};

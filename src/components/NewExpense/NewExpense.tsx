import { ExpenseData, NewExpenseData } from '../../types';
import { ExpenseForm } from './ExpenseForm';
import './NewExpense.css';

interface NewExpenseProps {
  onAddExpense: (data: ExpenseData) => void;
}

export const NewExpense = ({ onAddExpense }: NewExpenseProps) => {
  const saveExpenseHandler = (enteredExpenseData: NewExpenseData) => {
    const expenseData = { ...enteredExpenseData, id: Math.random().toString() };
    onAddExpense(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpense={saveExpenseHandler} />
    </div>
  );
};

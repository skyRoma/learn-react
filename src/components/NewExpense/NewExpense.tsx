import { useState } from 'react';
import { ExpenseData, NewExpenseData } from '../../types';
import { ExpenseForm } from './ExpenseForm';
import './NewExpense.css';

interface NewExpenseProps {
  onAddExpense: (data: ExpenseData) => void;
}

export const NewExpense = ({ onAddExpense }: NewExpenseProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const saveExpenseHandler = (enteredExpenseData: NewExpenseData) => {
    const expenseData = { ...enteredExpenseData, id: Math.random().toString() };
    onAddExpense(expenseData);
    toggleEditMode();
  };

  const toggleEditMode = () => {
    setIsEditMode((mode) => !mode);
  };

  return (
    <div className="new-expense">
      {!isEditMode && <button onClick={toggleEditMode}>Add New Expense</button>}
      {isEditMode && (
        <ExpenseForm
          onCancel={toggleEditMode}
          onSaveExpense={saveExpenseHandler}
        />
      )}
    </div>
  );
};

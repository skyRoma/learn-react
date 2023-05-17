import { Card } from '../UI/Card';
import { ExpenseDate } from './ExpenseDate';
import './ExpenseItem.css';
import { ExpenseData } from '../../types';

export const ExpenseItem = ({
  title,
  amount,
  date,
}: Omit<ExpenseData, 'id'>) => {
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={date} />
        <div className="expense-item__description">
          <h2>{title}</h2>
          <div className="expense-item__price">${amount}</div>
        </div>
      </Card>
    </li>
  );
};

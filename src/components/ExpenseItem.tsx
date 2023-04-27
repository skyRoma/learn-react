import { Card } from './Card';
import { ExpenseDate } from './ExpenseDate';
import './ExpenseItem.css';

export interface ExpenseItemProps {
  id?: string;
  title: string;
  amount: number;
  date: Date;
}

export const ExpenseItem = (props: ExpenseItemProps) => {
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </Card>
  );
};

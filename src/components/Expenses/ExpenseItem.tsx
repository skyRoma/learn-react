import { useState } from 'react';
import { Card } from '../UI/Card';
import { ExpenseDate } from './ExpenseDate';
import './ExpenseItem.css';
import { ExpenseData } from '../../types';

export const ExpenseItem = (props: Omit<ExpenseData, 'id'>) => {
  const [title, setTitle] = useState(props.title);

  console.log(title);

  const clickHandler = () => {
    setTitle('test');
    console.log(title);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
};

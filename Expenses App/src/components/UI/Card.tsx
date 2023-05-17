import { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  className: string;
  children: ReactNode;
}

export const Card = (props: CardProps) => {
  const classes = `card ${props.className}`;

  return <div className={classes}>{props.children}</div>;
};

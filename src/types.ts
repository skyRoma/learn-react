export interface NewExpenseData {
  title: string;
  amount: number;
  date: Date;
}

export interface ExpenseData extends NewExpenseData {
  id: string;
}

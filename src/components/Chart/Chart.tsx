import './Chart.css';
import { ExpenseData } from '../../types';
import { ChartBar } from './ChartBar';

interface ChartProps {
  items: ExpenseData[];
}

export const Chart = ({ items }: ChartProps) => {
  const dataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ];

  items.forEach((item) => {
    const expenseMonth = item.date.getMonth();

    dataPoints[expenseMonth].value += item.amount;
  });

  const totalMax = Math.max(...dataPoints.map((point) => point.value));

  return (
    <div className="chart">
      {dataPoints.map(({ value, label }) => (
        <ChartBar key={label} value={value} maxValue={totalMax} label={label} />
      ))}
    </div>
  );
};

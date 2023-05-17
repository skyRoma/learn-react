import './ChartBar.css';

interface ChartProps {
  value: number;
  maxValue: number;
  label: string;
}

export const ChartBar = ({ value, maxValue, label }: ChartProps) => {
  let barFillHeight = '0%';

  if (maxValue > 0) {
    barFillHeight = Math.round((value / maxValue) * 100) + '%';
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="chart-label">{label}</div>
    </div>
  );
};

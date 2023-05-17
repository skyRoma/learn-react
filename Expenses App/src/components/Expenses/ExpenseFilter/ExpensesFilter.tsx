import './ExpensesFilter.css';

interface ExpensesFilterProps {
  selected: string;
  onChangeFilter: (year: string) => void;
}

export const ExpensesFilter = ({
  selected,
  onChangeFilter,
}: ExpensesFilterProps) => {
  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeFilter(event.target.value);
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={selected} onChange={changeHandler}>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

- If the new state is computed using the previous state, it's better to pass a function to setState. The function will receive the previous value, and return an updated value:

  ```js
  setCount((prevCount) => prevCount + 1);
  ```

- Don't forget about 2-way binding (`selected` prop in this case):

  ```js
  export const ExpensesFilter = ({ selected, onChangeFilter }: Props) => {
    const changeHandler = (event) => {
      onChangeFilter(event.target.value);
    };

    return (
      <select value={selected} onChange={changeHandler}>
        ...
      </select>
    );
  };
  ```

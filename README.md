- If the new state is computed using the previous state, it's better to pass a function to setState. The function will receive the previous value, and return an updated value:

  ```js
  setCount((prevCount) => prevCount + 1);
  ```

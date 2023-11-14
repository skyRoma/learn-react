- React = declarative UI programming. You define the target UI state - not the steps to get there;

- import images only using `import` statement for better optimization:

  ```js
  import logo from './assets/logo.png';

  export function Header() {
    // NOT src="src/assets/logo.png"
    return <img src={logo} />;
  }
  ```

- These two are equivalent:

  ```js
  function App1() {
    return <Greeting firstName="Ben" lastName="Hector" />;
  }

  function App2() {
    const props = { firstName: 'Ben', lastName: 'Hector' };

    return <Greeting {...props} />;
  }
  ```

- JavaScript statements like function definitions, if-statements etc. can't bet used as part of your JSX code / between curly braces in JSX code.

- By default, all CSS rules are scoped globally for the entire React application. This means that using the same className for 2 components will cause a collision.

  ```js
  import './componentA.css';

  export const ComponentA = () => {
    return <div className="container">Component A</div>;
  };
  ```

  [More info](https://www.upbeatcode.com/react/css-scoping-in-react-everything-you-need-to-know/)

- `props.children` - this is all the content that is between the opening and closing tags of this component;

- `onClick={handleClick}` - naming convention for event handlers.

- Another naming convention for props (`on...`):

  ```js
  export const TabButton = ({ onSelect }) => {
    return <button onClick={onSelect}>TEXT</button>;
  };
  ```

- There are no built-in attributes for custom components. Therefore, even `id` and `className` are considered `props` and should be used inside the component as `props`.

  ```js
  <CustomSection id="section" className="section">
  ```

- A common way to forward down multiple props (e.g. `id`, `className`) for wrapper elements:

  ```js
  export function Section({ title, children, ...props }) {
    return (
      <section {...props}>
        <h2>{title}</h2>
        {children}
      </section>
    );
  }
  ```

- It's possible to set component type dynamically:

  ```js
  export function Tabs({ buttons, CustomComponent }) {
    // variable should start with uppercase letter
    const ButtonsContainer = 'div';
    // Or it can be custom component:
    const ButtonsContainer = CustomComponent;

    return <ButtonsContainer>{buttons}</ButtonsContainer>;
  }
  ```

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

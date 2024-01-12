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

- All files stored in the `public` folder are publicly available (`localhost:5173/some-image.jpg`) and will be served alongside with the `index.html` file, so they can be referenced globally in `index.html`, `index.css` or in the any component:

  ```html
  <img src="game-logo.png" />
  ```

- If the new state is computed using the previous state, it's better to pass a function to setState. The function will receive the previous value, and return an updated value:

  ```js
  setCount((prevCount) => prevCount + 1);
  ```

  [Detailed explanation how state update works](https://react.dev/learn/queueing-a-series-of-state-updates)

- `event.target.value` from the input field is always of type `String`;

- `import ./Header.css` - vanilla CSS styles are not scoped to components;
- `import classes from './Header.module.css'` - css module styles are scoped;

- Styled Components `props` should be named with `$` prefix to not clash build-in props:

  ```js
  <StyledInput $invalid="{emailNotValid}" />
  ```

- Don't forget about 2-way binding (`selected` prop in this case):

  ```js
  export const ExpensesFilter = ({ selected, onChangeFilter }: Props) => {
    const handleChange = (event) => {
      onChangeFilter(event.target.value);
    };

    return (
      <select value={selected} onChange={handleChange}>
        ...
      </select>
    );
  };
  ```

- Strict Mode enables the following development-only behaviors:

  - Components will re-render an extra time to find bugs caused by impure rendering.
  - Components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.
  - Components will be checked for usage of deprecated APIs.

  ```js
  <StrictMode>
    <App />
  </StrictMode>
  ```

- Refs

  - without:

  ```jsx
  export default function Player() {
    const [name, setName] = useState(null);
    const [enteredName, setEnteredName] = useState(null);

    const handleChange = (event) => {
      setName(event.target.value);
    };

    const handleClick = () => {
      setEnteredName(name);
      setName('');
    };

    return (
      <section id="player">
        <h2>Welcome {enteredName || 'unknown entity'}</h2>
        <p>
          <input type="text" onChange={handleChange} value={name} />
          <button onClick={handleClick}>Set Name</button>
        </p>
      </section>
    );
  }
  ```

  - with:

  ```jsx
  export default function Player() {
    const inputRef = useRef();

    const [playerName, setPlayerName] = useState('');

    const handleClick = () => {
      setPlayerName(inputRef.current.value);
      inputRef.current.value = '';
    };

    return (
      <section id="player">
        <h2>Welcome {playerName || 'unknown entity'}</h2>
        <p>
          <input type="text" ref={inputRef} />
          <button onClick={handleClick}>Set Name</button>
        </p>
      </section>
    );
  }
  ```

- `inputRef.current` is undefined during the first render, since `inputRef` is not connected to `input` yet;

- `Refs` can be used like instance fields in classes, i.e. if we want to store some value between component renders but not to update the UI when this value is changed (unlike `state`);

- Use `forwardRef` to pass the `ref` from one component to another;
- Use `useImperativeHandle` together with `forwardRef` to expose the child's public API to the parent component;

- `Prop Drilling` - Passing shared data through multiple component layers;

- The default value set when creating the context is only used if a component that was not wrapped by the `Provider` component tries to access the context value and for better autocompletion:

  ```js
  export const CartContext = createContext({ items: [] });
  ```

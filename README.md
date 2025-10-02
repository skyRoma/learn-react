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

- New state value will be available only after the component is re-executed again:

  ```js
  const [selectedTopic, setSelectedTopic] = React.useState("Text");

  function handleSelectedTopic(newTopic) {
    setSelectedTopic(newTopic);
    // still logs tje old value
    console.log(selectedTopic);
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

- callback inside `useEffect(cb, [deps])` is executed only after the component function is executed/rendered. And this `cb` is executed only once if the 2nd argument is an empty array `[]`. Without 2nd argument it will be executed after every component render cycle;

- not every side effect needs `useEffect`. We need it only to prevent infinite loops or we have code that can only run after the component function is executed at least once;

- Cleanup function in `useEffect` runs every time before a new call of `useEffect` callback function and after the component is removed from the DOM;

- If the `useEffect` dependency is a function created inside a component then it could lead to an infinite loop, since every render creates a new instance of that function `new function(){} !== new function(){}`;

- To fix the issue above there is a `useCallback(cb, [deps])` hook that lets you cache a function definition between re-renders. If the `useCallback` dependencies change react will recreate (`NOT CALL!!!`) a function;

-It's safe to omit the state updating functions (`setState`) from the `useEffect` or `useCallback` dependency list. React guarantees that this won't change on re-renders;

- The `key` prop can be used for any component (not only for lists). And if `key` is changed then the component is fully recreated (like removed from and added to the DOM). Example from 9th project:

  ```js
  <QuestionTimer
    key={QUESTIONS[activeQuestionIndex].id}
    time={3_000}
    onTimeout={handleSkipAnswer}
  />
  ```

- `const Component = memo(componentFn)` lets us skip re-rendering a component when its props are unchanged. <br>
  Use carefully:

  - us high up in the component tree as possible;
  - checking props also costs performance;
  - don't use where props will change frequently.

- `useMemo` lets us to memoize functions inside a component. Should also be used carefully:

  ```js
  const isPrime = useMemo(() => isPrimeHeavyFunction(count), [count]);
  ```

- React tracks `state` by component type and position of that component in the tree, that's why the `key` prop is needed;

- If `initialCount` prop will be changed in the parent component, internal `counter` state will not bew reinitialized:

  ```js
  const Counter = ({ initialCount }) => {
    // executed only on the initial render
    const [counter, setCounter] = useState(initialCount);

    return <div>{counter}</div>;
  };
  ```

  To fix this we could use `useEffect`, but it will be not optimal. The better way is to fully reset component using `key` prop:

  ```js
  <Counter key={count} initialCount={count} />
  ```

- Multiple state updates that are triggered from the same function do not cause multiple re-renders. Instead, they batched together by React and only 1 render is performed;

- For error boundary components we have to use `Class`-based components since the class has `componentDidCatch` lifecycle method which can catch errors from the child components;

- If the `state` inside the `custom hook` is updated then the component that is using this state is also executed again like with regular component state;

- Why `Redux` library and not just built-in `Context`?

  - In large enterprise apps it can be hard to read and maintain a lot of Contexts (or a 1 large universal Context);
  - Performance. Context is great for low-frequency updates. Redux for high-frequency updates;
  - redux devtools is also a very good plus in favor of redux;

- We can use side-effects with Redux inside the component itself, without involving the Redux in it, or inside the action creator;

- Routes that begin with `/` are absolute;

- We can preload data for the route component using `loader`:

  ```js
  {
    index: true; // path: ''
    element: <EventsPage />,
    loader: async () => {
      const response = await fetch('http://localhost:8080/events');
      const resData = await response.json();
      return resData.events;
    }
  }
  ```

- We can submit data to the backend in the route component using `action`:

  ```js
  {
    index: true; // path: ''
    element: <EventDetailPage />,
    action: deleteEventAction,
  }
  ```

- For `loaders` and `actions` with a long delay we can provide feedback to he user about the progress using `useNavigation().state` or returning `defer(...)` inside the loader;

- `useFetcher` is used to trigger the action from the not current route;

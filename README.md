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

- Default props:

  ```js
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }

  Welcome.defaultProps = {
    name: 'Galactic Traveler',
  };
  ```

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
  const [selectedTopic, setSelectedTopic] = React.useState('Text');

  function handleSelectedTopic(newTopic) {
    setSelectedTopic(newTopic);
    // still logs tje old value
    console.log(selectedTopic);
  }
  ```

- It's possible to set component type dynamically:

  ```js
  export function Tabs({ buttons, customComponent }) {
    // variable should start with uppercase letter
    const ButtonsContainer = 'div';
    // Or it can be custom component:
    const ButtonsContainer = customComponent;

    return <ButtonsContainer>{buttons}</ButtonsContainer>;
  }
  ```

  or

  ```js
  // menu is the default prop, if nothing will be passed in
  export function Tabs({ buttons, CustomComponent = 'menu' }) {
    return <CustomComponent>{buttons}</CustomComponent>;
  }
  ```

  ```js
  export const Wrapper = () => (
    // for built-in elements
    <Tabs
      CustomComponent="div"
      buttons={
        <>
          <button></button>
          <button></button>
        </>
      }
    />

    // for custom elements
    <Tabs
      CustomComponent={AnotherCustomComponent}
      buttons={
          <>
            <button></button>
            <button></button>
          </>
        }
    />
  )
  ```

- All files stored in the `public` folder are publicly available (`localhost:5173/some-image.jpg`) and will be served alongside with the `index.html` file, so they can be referenced globally in `index.html`, `index.css` or in the any component:

  ```html
  <img src="game-logo.png" />
  ```

- You should use the public/ folder for any images that should not be handled by the build process and that should be generally available. Good candidates are images used directly in the `index.html file or favicons`.
  On the other hand, images that are used `inside of components` should typically be stored in the `src/` folder (e.g., in src/assets/).

- If the new state is computed using the previous state, it's better to pass a function to setState. The function will receive the previous value, and return an updated value:

  ```js
  setCount((prevCount) => prevCount + 1);
  ```

  because:

  ```js
  const [isEditing, setIsEditing] = useState(false);

  setIsEditing(!isEditing); // -> schedules a state update to true based on current value
  setIsEditing(!isEditing); // -> schedules a state update to true based on current value
  ```

  [Detailed explanation how state update works](https://react.dev/learn/queueing-a-series-of-state-updates)

- `event.target.value` from the input field is always of type `String`;
- Be careful with lifting state up, it can lead to the unnecessary re-render of the parent element. Sometimes it's better to create a new state;
- `useState(props.initialValue)` uses the initialValue only on the first render.
  If the prop changes later, React will not reset the state — you need `useEffect` to sync it.

- `import ./Header.css` - vanilla CSS styles are not scoped to components;
- `import classes from './Header.module.css'` - css module styles are scoped;

  ```html
  <p className={classes.paragraph}>text</p>
  ```

  `paragraph` key in classes object is a generated unique string;

- Inline styles:

  ```html
  <p style={
    { color: 'red', textAlign: 'left'}
  }>text</p>
  ```

- Dynamic classes:

  ```html
  <p className={!isValid ? 'invalid' : ''}>text</p>
  ```

- example of styled component:

  ```js
  const StyledHeader = styled.header`
    display: flex;
    color: ${({ $invalid }) => ($invalid ? '#f87171' : '#6b7280')};

    &:hover {
      background-color: #f0920e;
    }

    img {
      width: 11rem;
    }

    @media (min-width: 768px) {
      margin-bottom: 4rem;

      h1 {
        font-size: 2.25rem;
      }
    }
  `;
  ```

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

- Refs. Controlled (with state) vs Uncontrolled (with refs) components.

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

- The ref attribute is natively supported by all built-in HTML elements, such as `<div>, <span>, <input>`, etc.. React assigns the corresponding DOM node to the `.current` property of the ref object.

- `inputRef.current` is undefined during the first render, since `inputRef` is not connected to `input` yet;

- `Refs` can be used like instance fields in classes, i.e. if we want to store some value between component renders but not to update the UI when this value is changed (unlike `state`); When the ref changes, component doesn't re-execute.

- `DEPRECATED! From v19 you can pass ref as normal prop` ~~Use `forwardRef` to pass the `ref` from one component to another;~~
- Use `useImperativeHandle` to expose the child's public API to the parent component;

- `createPortal(children, domNode, key?)` allows you to render children into a different DOM node (like `document.body`) while keeping them in the same React component hierarchy for context and event flow.

- `Prop Drilling` - Passing shared data through multiple component layers;

- Using Component Composition with the `children` prop allows a parent component to directly render the final component that needs a specific prop, passing it as a child to intermediate wrapper components, thereby avoiding prop drilling.

  ```js
  function App() {
    const user = { name: 'Alice' };

    return (
      <Toolbar>
        {/* Pass the ProfileButton as a child to Toolbar */}
        <ProfileButton user={user} />
      </Toolbar>
    );
  }
  ```

- The default value set when creating the context is only used if a component that was not wrapped by the `Provider` component tries to access the context value and for better autocompletion:

  ```js
  export const CartContext = createContext({ items: [] });
  ```

- The `use()` is a hook-like function that enables components to synchronously read the value of Promises or Context directly within the render method. It simplifies asynchronous logic by allowing components to access resolved data without the boilerplate of `useState` and `useEffect`, leveraging `Suspense` to automatically handle loading states and `Error Boundaries` for declarative error handling. This approach results in cleaner, more readable code and, unlike traditional Hooks, allows for conditional (`if()`) access to Context or data.

- callback inside `useEffect(cb, [deps])` is executed only after the component function is executed/rendered. And this `cb` is executed only once if the 2nd argument is an empty array `[]`. Without 2nd argument it will be executed after every component render cycle;

- not every side effect needs `useEffect`. We need it only to prevent infinite loops or we have code that can only run after the component function is executed at least once (e.g. for `ref.current` usage);

- Cleanup function in `useEffect` runs every time before a new call of `useEffect` callback function (but not before the initial call) and after the component is removed from the DOM;

- If the `useEffect` dependency is a function created inside a component then it could lead to an infinite loop, since every render creates a new instance of that function `new function(){} !== new function(){}`;

- To fix the issue above there is a `useCallback(cb, [deps])` hook that lets you cache a function definition between re-renders. If the `useCallback` dependencies change react will recreate (`NOT CALL!!!`) a function;

- Always work with `async` functions within the scope of the useEffect parameter function – never pass an async function directly to `useEffect`:

  ```js
  // Mock async function
  const asyncFunc = async () => {
    return Promise.resolve('Updated state');
  };

  useEffect(() => {
    const callAsyncFunc = async () => {
      let val = await asyncFunc();
      setState(val);
    };

    callAsyncFunc();
  }, []);
  ```

  not:

  ```js
  useEffect(() => {
    let val = await asyncFunc();
    setState(val);
  }, []);
  ```

- It's safe to omit the state updating functions (`setState`) from the `useEffect` or `useCallback` dependency list. React guarantees that this won't change on re-renders;

- Retry mechanism:

  ```js
  function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [retries, setRetries] = useState(0);

    useEffect(() => {
      if (retries < 3) {
        // Limit the number of retries to 3
        fetch(
          'https://api-regional.codesignalcontent.com/posting-application-2/posts/'
        )
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => setData(data))
          .catch((error) => {
            setError(error);
            setRetries(retries + 1); // Increment the number of retries if an error occurs
          });
      }
    }, [retries]); // Rerun the effect if retries number changed

    return (
      <div className="App">
        {error ? (
          <p>{error.message}</p>
        ) : data ? (
          <p>Data fetched successfully!</p>
        ) : (
          'Loading...'
        )}
      </div>
    );
  }
  ```

- Great pattern to work with axios:

  ```js
  const instance = axios.create({
    baseURL: 'https://api-regional.codesignalcontent.com/posting-application-2',
  });

  useEffect(() => {
    async function fetchData() {
      const response = await instance.get('/posts/');
      setPosts(response.data);
    }
    fetchData();
  }, []);
  ```

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

- Multiple state updates that are triggered from the same function do not cause multiple re-renders. Instead, they `batched` together by React and only 1 render is performed;

- For error boundary components we have to use `Class`-based components since the class has `componentDidCatch` lifecycle method which can catch errors from the child components;

- ErrorBoundary component.

  ```js
  import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

  function ComponentWithError() {
    throw new Error('Unexpected error occurred in the component.'); // This component throws an error
  }

  function LoginPage() {
    return (
      <ReactErrorBoundary fallback={<h2>Oops...something went wrong.</h2>}>
        // Using ReactErrorBoundary to wrap our component
        <ComponentWithError />
      </ReactErrorBoundary>
    );
  }
  ```

  Note: React's Error Boundaries do not catch errors thrown inside event handlers (e.g., within an onClick function).

- Resetting error:

  ```js
  import { ErrorBoundary } from 'react-error-boundary';

  function ComponentWithError() {
    throw new Error('Oops! Something went wrong.');
  }

  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  function MyApp() {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ComponentWithError />
      </ErrorBoundary>
    );
  }
  ```

- Custom hook:

  ```js
  const useFetchWeather = (url, lat, lng) => {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch(`${url}?lat=${lat}&lng=${lng}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data.weather);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });

      // No cleanup function needed as nothing to cancel/cleanup here
    }, [url, lat, lng]);

    return { weather, isLoading, error };
  };
  ```

- If the `state` inside the `custom hook` is updated then the component that is using this state is also executed again like with regular component state;

- Why `Redux` library and not just built-in `Context`?

  - In large enterprise apps it can be hard to read and maintain a lot of Contexts (or a 1 large universal Context);
  - Performance. Context is great for low-frequency updates. Redux for high-frequency updates;
  - redux devtools is also a very good plus in favor of redux;

- We can use side-effects with Redux inside the component itself, without involving the Redux in it, or inside the action creator;

- Routing v6:

  ```js
  import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from 'react-router-dom';

  function App() {
    const user = getUserDetails();

    return (
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <NavLink to="/profile" activeClassName="active" style={({ isActive }) => ({color: isActive ? 'orange' : 'blue' })}>Profile</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <!-- Route protection -->
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          >
            <Route index element={<ProfileOverview />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    );
  }

  function Profile() {
    return (
      <div>
        <h2>User Profile</h2>
        <nav>
          <Link to="details">Details</Link>
          <Link to="settings">Settings</Link>
        </nav>
        <Outlet />
      </div>
    );
  }
  ```

- Navigating `Navigate`

  ```js
  import { Navigate } from 'react-router-dom';

  function ProfileSettings() {
    const [updated, setUpdated] = useState(false);

    function updateSettings() {
      setUpdated(true);
    }

    // If settings are updated, navigate to ProfileDetails
    return updated ? <Navigate to="../details" /> : <SettingsComponent />;
  }
  ```

- Dynamic routes

  ```js
  export default function App() {
    return (
      <BrowserRouter>
        <h1>Welcome to Intergalactic Travel!</h1>
        <nav>
          <Link to="/planet/Mars/11">Visit Mars</Link>
        </nav>
        <Routes>
          <Route path="/planet/:name/:code" element={<Planet />} />
        </Routes>
      </BrowserRouter>
    );
  }

  export function Planet() {
    let { name, code } = useParams();
    return (
      <h2>
        Welcome to {name}! The red {code}planet awaits you.
      </h2>
    );
  }
  ```

- Navigate programmatically:

  ```js
  import { useNavigate } from 'react-router-dom';
  import { useLocation } from 'react-router-dom';

  const BackButton = () => {
    let navigate = useNavigate();

    let handleClick = () => {
      navigate(-1); // Takes you back one step in your route history.
    };

    return <button onClick={handleClick}>Go Back</button>;
  };

  function UpdateButton() {
    let navigate = useNavigate();

    let handleClick = () => {
      navigate('/login', { state: { from: 'update' } }); // Adds state when navigating
    };

    return <button onClick={handleClick}>Update post</button>;
  }

  function Login() {
    let location = useLocation();
    let from = location.state?.from; // Accesses the state passed during navigation
  }
  ```

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

- `@tanstack/react-query`:

  ```js
  const { data, isPending, isError, error } = useQuery({
    queryFn: fetchEvents,
    queryKey: ['events'],
    staleTime: 5000, // how long data is considered fresh
    // gcTime: 1000 * 60  // how long unused data stays in cache
  });
  ```

- Pattern to work with form submission:

  ```js
  const handleSubmit = (event) => {
    const formData = new FormData(event.target);

    const email = formData.get('email');
    // checkboxes with the same name will be grouped into an array
    const acquisitionChannels = formData.getAll('acquisition');

    const data = Object.fromEntries(formData.entries());
    data.acquisition = acquisitionChannels;
  };
  ```

- Good way to handle forms - Form Actions. `useActionState` + `useOptimistic` + `useFormStatus` hooks. See 21 and 22 examples;

- Lazy loading:

  ```js
  const AboutPage = lazy(() => import('./pages/About'));

  {
    path: ':id',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <AboutPage />
      </Suspense>
    ),
    loader: (meta) => import('./pages/Post').then((module) => module.loader(meta)),
  }
  ```

- React Server Components:
  - never executed on the client
  - can fetch data
  - rendered on the server and result is sent to the client
  - can include client components
  - can be async
- Client Components:
  - rendered on the server and client
  - client-side features can be used (react hooks)
  - can include RSC only via `children`
  - can't be async
  - can include Server form action and promises (via `use` hook)

- The Route can be protected by loader:

  ```js
  export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
      return redirect('/auth');
    }

    return null;
  }

  const router = createBrowserRouter([
    {
      path: 'edit',
      element: <EditEventPage />,
      loader: checkAuthLoader,
    },
  ]);
  ```

- When a form `action` successfully completes (for instance, by performing a logout and then sending the user to a new page), React Router automatically triggers a "revalidation" of the data `loaders` on that new page. This is done to ensure the UI immediately reflects the most current server state;

- In NextJs routing is configured through paths in the `app` folder and reserved page names - page and layout (e.g. `app/about/page.js` = `my-site.com/about`);
  Some other important reserved filenames:
  - layout.js => Create a new layout that wraps sibling and nested pages
  - not-found.js => Fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts)
  - error.js => Fallback page for other errors (thrown by sibling pages or nested pages or layouts)
  - loading.js => Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data
  - route.js => Allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format)

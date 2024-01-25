import { useRef, useState } from 'react';

export const Login = () => {
  const [isEmailValid, setIsEmailValid] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const emailIsValid = enteredEmail.includes('@');

    if (!emailIsValid) {
      setIsEmailValid(false);

      return;
    }

    setIsEmailValid(true);

    console.log('handleSubmit', enteredEmail, enteredPassword);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailRef} />
          <div className="control-error">
            {!isEmailValid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
          />
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
};

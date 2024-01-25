import { Input } from './Input';
import { hasMinLength, isEmail } from '../util/validation';
import { useInput } from '../hooks/useInput';

export const Login = () => {
  const {
    value: email,
    isValid: isEmailValid,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useInput('', isEmail);

  const {
    value: password,
    isValid: isPasswordValid,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useInput('', (value) => hasMinLength(value, 6));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isEmailValid || !isPasswordValid) {
      console.log('Invalid form');
      return;
    }

    console.log('Submitting');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={email}
          error={!isEmailValid && 'Please enter a valid email address.'}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={password}
          error={!isPasswordValid && 'Please enter a valid password.'}
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
        />
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

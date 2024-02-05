import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

export const NewsletterSignup = () => {
  const { Form, data, state } = useFetcher();

  useEffect(() => {
    if (state === 'idle' && data?.message) {
      alert(data.message);
    }
  }, [data, state]);

  return (
    <Form method="post" action="newsletter" className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </Form>
  );
};

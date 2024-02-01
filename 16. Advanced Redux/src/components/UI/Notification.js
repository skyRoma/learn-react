import classes from './Notification.module.css';

export const Notification = ({ status, title, message }) => {
  const cssClasses = `${classes.notification} ${classes[status]}`;

  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

import { Suspense } from 'react';
import classes from './EventsList.module.css';
import { useLoaderData, Link, Await } from 'react-router-dom';

export const EventsList = () => {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => {
          console.log(loadedEvents);

          return (
            <div className={classes.events}>
              <h1>All Events</h1>
              <ul className={classes.list}>
                {loadedEvents.map((event) => (
                  <li key={event.id} className={classes.item}>
                    <Link to={event.id}>
                      <img src={event.image} alt={event.title} />
                      <div className={classes.content}>
                        <h2>{event.title}</h2>
                        <time>{event.date}</time>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

import { EventsList } from '../components/EventsList';
import { defer, json } from 'react-router-dom';

export const EventsPage = () => {
  return <EventsList />;
};

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json('Failed to load events', { status: 500 });
  }

  const resData = await response.json();

  return resData.events;
};

export const eventsLoader = () => {
  return defer({
    events: loadEvents(),
  });
};

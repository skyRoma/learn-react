import { EventsList } from '../components/EventsList';
import { json } from 'react-router-dom';

export const EventsPage = () => {
  return <EventsList />;
};

export const loader = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json('Failed to load events', { status: 500 });
  }

  return response;
};

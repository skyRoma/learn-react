import { json, useRouteLoaderData } from 'react-router-dom';
import { EventItem } from '../components/EventItem';

export const EventDetailPage = () => {
  const { event } = useRouteLoaderData('event-detail');

  return <EventItem event={event} />;
};

export const eventsDetailLoader = async ({ params }) => {
  const response = await fetch(
    `http://localhost:8080/events/${params.eventId}`
  );

  if (!response.ok) {
    throw json('Could not fetch details', { status: 500 });
  }

  return response;
};

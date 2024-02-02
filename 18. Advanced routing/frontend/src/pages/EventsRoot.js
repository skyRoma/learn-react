import { EventsNavigation } from '../components/EventsNavigation';
import { Outlet } from 'react-router-dom';

export const EventsRootLayout = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
};

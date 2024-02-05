import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './pages/Root';
import { HomePage } from './pages/Home';
import { EventsPage, eventsLoader } from './pages/Events';
import {
  EventDetailPage,
  deleteEventAction,
  eventsDetailLoader,
} from './pages/EventDetail';
import { NewEventPage } from './pages/NewEvent';
import { EditEventPage } from './pages/EditEvent';
import { EventsRootLayout } from './pages/EventsRoot';
import { ErrorPage } from './pages/Error';
import { upsertEventAction } from './components/EventForm';
import { NewsletterPage, newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, // index: true means that this route will be used when the path is empty, like: path: ''
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail', // id is used to identify the correct route loader
            loader: eventsDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: upsertEventAction,
              },
            ],
          },
          { path: 'new', element: <NewEventPage />, action: upsertEventAction },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './pages/Root';
import { HomePage } from './pages/Home';
import { EventsPage, eventsLoader } from './pages/Events';
import { EventDetailPage, eventsDetailLoader } from './pages/EventDetail';
import { NewEventPage } from './pages/NewEvent';
import { EditEventPage } from './pages/EditEvent';
import { EventsRootLayout } from './pages/EventsRoot';
import { ErrorPage } from './pages/Error';

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
              },
              { path: 'edit', element: <EditEventPage /> },
            ],
          },
          { path: 'new', element: <NewEventPage /> },
        ],
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

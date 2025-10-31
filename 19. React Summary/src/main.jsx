import React from 'react'
import ReactDOM from 'react-dom/client'
import { Posts, postsLoader } from './routes/Posts'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { action, NewPost } from './routes/NewPost/NewPost'
import { RootLayout } from './routes/RootLayout'
import { PostDetails, postDetailsLoader } from './routes/PostDetails/PostDetails'
import { Tasks } from './routes/Tasks/Tasks'
import { Search } from './routes/Search/Search'
import { Windowing } from './routes/Windowing/Windowing'
import { Custom } from './routes/VirtualizedList/VirtualizedList'
import DaD from './routes/DaD/Dad'
import { MultiStepForm } from './routes/Validation/MultiStepForm'
import { WorkerComponent } from './routes/Worker/Worker'
import MovieBrowser from './routes/SystemDesign/Task1'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postsLoader,
        children: [
          {
            path: 'create-post',
            element: <NewPost />,
            action: action
          },
          {
            path: ':id',
            element: <PostDetails />,
            loader: postDetailsLoader
          },
        ],
      },
      {
        path: '/tasks',
        element: <Tasks />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/windowing',
        element: <Windowing />,
      },
      {
        path: '/windowing-custom',
        element: <Custom />,
      },
      {
        path: '/dad',
        element: <DaD />,
      },
      {
        path: '/validation',
        element: <MultiStepForm />,
      },
      {
        path: '/worker',
        element: <WorkerComponent />,
      },
      {
        path: '/design',
        element: <MovieBrowser />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode >
)

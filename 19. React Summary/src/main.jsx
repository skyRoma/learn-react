import React from 'react'
import ReactDOM from 'react-dom/client'
import { Posts, postsLoader } from './routes/Posts'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { action, NewPost } from './routes/NewPost/NewPost'
import { RootLayout } from './routes/RootLayout'
import { PostDetails, postDetailsLoader } from './routes/PostDetails/PostDetails'

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />;
  </React.StrictMode >
)

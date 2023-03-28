import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import BookDescription from '../../components/BL/BookDescription/BookDescription';

import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
      children: [
        {
          path: '/:id',
          element: <BookDescription />,
        },
      ],
      errorElement: (
        <NotFoundPage />
      ),
    },
  ],
);

const AppRouter = () => (
  <RouterProvider router={router} />
);

export default AppRouter;

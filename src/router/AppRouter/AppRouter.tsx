import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import BookDescription from '../../components/BL/BookDescription/BookDescription';
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import bookDescriptionLoader from '../loaders/bookDescriptionLoader';

export type bookDescriptionPathName = '/:id';
const basename = process.env.NODE_ENV === 'production' ? 'future-react-app' : '';

const router = createBrowserRouter(
  [
    {
      path: '/',
      loader: async () => redirect('/books'),
      errorElement: (
        <NotFoundPage />
      ),
    },
    {
      path: '/books',
      element: <HomePage />,
      children: [
        {
          path: ':id',
          element: <BookDescription />,
          loader: bookDescriptionLoader,
        },
      ],
    },
  ],
  { basename },
);

const AppRouter = () => (
  <RouterProvider router={router} />
);

export default AppRouter;

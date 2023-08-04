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
import RouteError from '../../components/UI/RouteError/RouteError';

export type bookDescriptionPathName = '/:id';
const basename = process.env.NODE_ENV === 'production' ? '/future-react-app' : '';

export const routes = [
  {
    path: '/',
    loader: async () => redirect('/books'),
    errorElement: <NotFoundPage />,
  },
  {
    path: '/books',
    element: <HomePage />,
    children: [
      {
        path: ':id',
        element: <BookDescription />,
        errorElement: <RouteError />,
        loader: bookDescriptionLoader,
      },
    ],
  },
];

const router = createBrowserRouter(
  routes,
  { basename },
);

const AppRouter = () => (
  <RouterProvider router={router} />
);

export default AppRouter;

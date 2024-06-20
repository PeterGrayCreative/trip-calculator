import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <>'list all trips'</>,
  },
  {
    path: '/:tripId',
    element: <>'view trip detail'</>,
  },
  {
    path: '/students',
    element: <>'list all students'</>,
  },
  {
    path: ':tripId/add-student',
    element: <>'add student to trip'</>,
  },
  {
    path: ':tripId/add-expense',
    element: <>'add expense to trip'</>,
  },
  {
    path: '/add-student',
    element: <>'add student'</>,
  },
]);

export const App = () => {
  return (
    <main className="h-full overflow-y-auto center flex">
      <RouterProvider router={router} />
    </main>
  );
};

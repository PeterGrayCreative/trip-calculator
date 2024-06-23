import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import logo from './logo.svg';
import { Header } from './Components/Header';
import { TripTable } from './Components/TripTable';
import { AddTripForm } from './Components/forms/AddTripForm';

const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: '/',
        element: <TripTable />,
      },
      {
        path: 'add-trip',
        element: <AddTripForm />,
      },
      {
        path: 'students',
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
    ],
  },
]);

export const App = () => {
  return (
    <div className="flex items-center justify-center">
      <main className="h-full overflow-y-auto center flex my-10 max-w-4xl w-3/4 justify-center space-between space-y-4 flex-col">
        <RouterProvider router={router} />
      </main>
    </div>
  );
};

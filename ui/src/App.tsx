import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
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

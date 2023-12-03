// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './GamePrice/pages/homepage';
import Listcard from './GamePrice/pages/listcard';
import MasterDetail from './GamePrice/pages/masterdetail';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/Listcard/*',
      element: <Listcard />,
    },
    {
      path: '/Listcard/:id',
      element: <MasterDetail />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
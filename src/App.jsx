import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Pages
import LoginPage from './pages/auth/Login';
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import Product from './pages/products/SingleProduct';
import ErrorPage from './pages/error-page';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "app",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "products/:productID",
        element: <Product />,
        errorElement: <ErrorPage />,
      },
    ]
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}

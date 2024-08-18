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
import CategoriesPage from './pages/categories';
import ArticlesPage from './pages/articles';
import UsersPage from './pages/users';
import AddNewCategory from './pages/categories/AddNewCategory';
import AddNewProduct from './pages/products/AddNewProduct'
import AddNewArticle from './pages/articles/AddNewArticle';
import AddNewUser from './pages/users/AddNewUser'
import SingleCategory from './pages/categories/SingleCategory';
import SingleArticle from './pages/articles/SingleArticle';
import SingleUser from './pages/users/SingleUser';

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

      },
      {
        path: "categories",
        element: <CategoriesPage />,

      },
      {
        path: '/app/categories/addNewCategory',
        element: <AddNewCategory />
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: '/app/products/addNewProduct',
        element: <AddNewProduct />
      },
      {
        path: "articles",
        element: <ArticlesPage />,

      },
      {
        path: '/app/articles/addNewArticle',
        element: <AddNewArticle />
      },
      {
        path: "users",
        element: <UsersPage />,

      },
      {
        path: '/app/users/addNewUser',
        element: <AddNewUser />
      },
      {
        path: "products/:productID",
        element: <Product />,
      },
      {
        path: 'categories/:categoryID',
        element: <SingleCategory />
      },
      {
        path: 'articles/:articleID',
        element: <SingleArticle />
      },
      {
        path: 'users/:userID',
        element: <SingleUser />
      }
    ]
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}

import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootPage from '../pages/rootPage/rootPage'
import ErrorPage from '../pages/errorPage/errorPage'
import MainPage from '../pages/mainPage/mainPage'
import ProductPage from '../pages/productPage/productPage'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <MainPage />
            },
            {
                path: "/:id/product",
                element: <ProductPage />
            }


        ]
    }
])
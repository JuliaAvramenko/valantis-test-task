import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootPage from '../pages/rootPage/rootPage'
import ErrorPage from '../pages/errorPage/errorPage'
import MainPage from '../pages/mainPage/mainPage'



export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/valantis-test-task',
                element: <MainPage />
            }
        ]
    }
])
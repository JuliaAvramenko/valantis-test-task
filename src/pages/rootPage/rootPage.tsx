import React from 'react'
import { Outlet } from 'react-router-dom'

const RootPage = () => {
    return (
        <>
            {/* <Header /> */}
            <main>
                <Outlet />
            </main>

        </>
    )
}

export default RootPage
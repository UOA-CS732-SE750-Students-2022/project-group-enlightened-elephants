import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

export default function PageLayout() {
    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    )
}

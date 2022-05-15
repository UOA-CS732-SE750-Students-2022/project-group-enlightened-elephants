import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

export default function PageLayout() {
    return (
        <div style={{ minWidth: '1000px' }}>
            <Nav />
            <Outlet />
        </div>
    )
}

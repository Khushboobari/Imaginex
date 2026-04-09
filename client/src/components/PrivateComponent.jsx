import React from 'react'
import useAuthStatus from '../hooks/useAuthStatus'
import Loader from './Loader'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {

    const { isAuthenticated, checkingStatus } = useAuthStatus()

    if (checkingStatus) {
        return (
            <Loader />
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />


}

export default PrivateComponent

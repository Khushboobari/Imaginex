import React from 'react'
import useAdminStatus from '../../hooks/useAdminStatus'
import Loader from '../Loader'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateAdminComponent = () => {

    const { isAdmin, checkingStatus } = useAdminStatus()

    if (checkingStatus) {
        return (
            <Loader />
        )
    }

    return isAdmin ? <Outlet /> : <Navigate to={"/"} />


}

export default PrivateAdminComponent

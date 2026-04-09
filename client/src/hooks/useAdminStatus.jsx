import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useAdminStatus = () => {

    const { user } = useSelector(state => state.auth)

    const [checkingStatus, setCheckingStatus] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)


    useEffect(() => {

        user?.isAdmin ? setIsAdmin(true) : setIsAdmin(false)
        setCheckingStatus(false)

    }, [user])

    return { checkingStatus, isAdmin }

}


export default useAdminStatus
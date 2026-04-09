import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useAuthStatus = () => {

    const { user } = useSelector(state => state.auth)

    const [checkingStatus, setCheckingStatus] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    useEffect(() => {

        user ? setIsAuthenticated(true) : setIsAuthenticated(false)
        setCheckingStatus(false)

    }, [user])

    return { checkingStatus, isAuthenticated }

}


export default useAuthStatus
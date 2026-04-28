import { useMemo } from "react"
import { useSelector } from "react-redux"

const useAuthStatus = () => {

    const { user } = useSelector(state => state.auth)

    const isAuthenticated = useMemo(() => !!user, [user])
    const checkingStatus = false

    return { checkingStatus, isAuthenticated }

}


export default useAuthStatus
import { useMemo } from "react"
import { useSelector } from "react-redux"

const useAdminStatus = () => {

    const { user } = useSelector(state => state.auth)

    const isAdmin = useMemo(() => !!user?.isAdmin, [user])
    const checkingStatus = false

    return { checkingStatus, isAdmin }

}


export default useAdminStatus
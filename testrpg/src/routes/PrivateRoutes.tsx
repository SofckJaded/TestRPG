import { Outlet, Navigate } from "react-router-dom"
import { selectIsAuth } from "../reduxToolkit/slices/user/userSlice"
import { useSelector } from "react-redux"

const PrivateRoutes = () => {
    const isAuth = useSelector(selectIsAuth)

    return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes

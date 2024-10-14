import Home from "./components/Home/Home"
import Game from "./components/Game/Game"
import Login from "./pages/auth/Index"
import "./assets/css/main.scss"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ReactNotifications } from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import PrivateRoutes from "./routes/PrivateRoutes"
import { useDispatch } from "react-redux"
import React, { useEffect } from "react"
import { fetchAuthSet } from "./reduxToolkit/slices/user/userSlice"

const App = () => {
    const dispatch = useDispatch()
    const jwt = window.localStorage.getItem("token")

    useEffect(() => {
        if (jwt) {
            dispatch(fetchAuthSet())
        }
    }, [dispatch, jwt])

    return (
        <Router>
            <ReactNotifications />
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/stats" element={<Game />}></Route>
                    <Route path="/inventory" element={<Game />}></Route>
                    <Route path="/skills" element={<Game />}></Route>
                    <Route path="/combat" element={<Game />}></Route>
                    <Route path="/map" element={<Game />}></Route>
                    <Route path="/store" element={<Game />}></Route>
                    <Route path="/admin" element={<Game />}></Route>
                </Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </Router>
    )
}

export default App

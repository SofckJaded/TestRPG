import React from "react"
import Button from "@mui/material/Button"
import Logo from "./logo"
import "../../assets/css/main.scss"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="home">
            <Logo />
            <div className="animate__animated animate__fadeInLeft">
                <Button variant="contained" onClick={() => navigate("/stats", { replace: true })}>
                    Play Now
                </Button>
            </div>
        </div>
    )
}

export default Home
